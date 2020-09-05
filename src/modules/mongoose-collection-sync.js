const { EventEmitter } = require('events');

const merge = require('lodash.merge');
const Collection = require('@discordjs/collection');

module.exports = class MongooseCollectionSync extends EventEmitter {
  constructor(model, options) {
    super({ captureRejections: true });
    this.cache = new Collection();
    this.model = model;

    // load everything because why not~ Ouo
    if (!options?.fullLoad) return;
    this.model
      .find({})
      .exec()
      .then((documents) => {
        this.emit(
          'debug',
          `Mongo Sync: [${model.name}] -> Loaded ${documents.length}`,
        );
        documents.forEach((doc) => this.cache.set(doc._id, doc));
      });
  }

  async update(key, value = {}) {
    let currentDoc = this.cache.get(key);
    if (currentDoc) {
      for (const k of Object.keys(value)) {
        currentDoc[k] = value[k];
      }
    } else {
      const doc = await this.model.findById(key).exec();
      if (doc) {
        currentDoc = doc;
        for (const k of Object.keys(value)) {
          currentDoc[k] = value[k];
        }
        this.emit('fetch', currentDoc);
      } else {
        currentDoc = new this.model({ _id: key });
        for (const k of Object.keys(value)) {
          currentDoc[k] = value[k];
        }
      }
    }

    await currentDoc.save();
    this.cache.set(key, currentDoc);
    this.emit('save', currentDoc);
    return currentDoc;
  }

  async get(key, ignoreCache = false) {
    // is it in the local storage? nice.
    if (this.cache.has(key) && !ignoreCache) {
      return this.cache.get(key);
    }

    // can we find it on the database? hmm
    const doc = await this.model.findOne({ _id: key }).exec();
    if (doc) {
      this.cache.set(key, doc);
      this.emit('fetch', doc);
      return doc;
    }

    // well, we don't have it
  }

  async ensured(key, value = {}) {
    const doc = await this.get(key);
    return doc ? merge(value, doc) : this.update(key, value);
  }

  /**
   * Returns true if a document was deleted from the database.
   */
  async delete(key) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    const result = await this.model.deleteOne({ _id: key }).exec();
    this.emit('delete', key);
    return !!(result.ok && result.deletedCount);
  }

  async refresh(key) {
    return this.get(key, true);
  }

  get size() {
    return this.cache.size;
  }
};
