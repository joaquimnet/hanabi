class QueueProcessor {
  constructor(processorFunction) {
    this._queue = [];
    this._process = processorFunction.bind(this);
  }

  enqueue(payload) {
    this._queue.push(payload);
  }

  processQueue() {
    const payload = this._queue.shift();
    if (!payload) {
      return;
    }
    try {
      const returnValue = this._process(payload);
      if (returnValue instanceof Promise) {
        returnValue
          .then(() => this.processQueue())
          .catch((err) => this.logError(payload, err));
      } else {
        this.processQueue();
      }
    } catch (err) {
      this.logError(payload, err);
      this.processQueue();
    }
  }

  logError(payload, err) {
    console.log(`Error on ${this.name ?? 'processing queue'}:`);
    console.log('payload: ', payload);
    console.log(err);
  }
}

module.exports = QueueProcessor;
