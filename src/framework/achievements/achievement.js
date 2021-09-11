// An Achievement is an individual achievement. e.g: Receive 100 flowers.
// It will belong to a group to minimize the number of evaluate() functions
// triggered for bot events.
// For example, if a flower is sent, only achievements in the FLOWER_GIVE and
// FLOWER_RECEIVE group have their evaluation functions called.

/**
 * @param {string} name The achievement's ID.
 * @param {AchievementGroup} group The achievement's group.
 * @param {(profile: object, progressAmount: number) => Promise<boolean>} evaluate Function to evaluate wether the achievement should be awarded.
 * @param {() => Promise<string[]>} evaluateCron Function to evaluate wether the achievement should be awarded when ran through a cronjob (bulk).
 */

class Achievement {
  /**
   * Hanabi Achievement.
   * @param {object} opts Achievement options
   */
  constructor({
    flag,
    description,
    displayName,
    group,
    evaluate = () => false,
    evaluateCron = async () => [],
  }) {
    // The flag must be alphanumeric. e.g: FLOWER_100
    if (!/^[a-z0-9_]+$/i.test(flag)) {
      throw new Error(
        `${flag} is not a valid achievement flag. Please remove the special spaces and characters.`,
      );
    }
    // The _id.
    this.flag = flag;
    this.description = description;
    this.displayName = displayName;
    // Group this achievement belongs to.
    this.group = group;
    // Must return a promise that resolves to either true or false.
    this.evaluate = evaluate;
    // Must return a promise that resolves to a list of user ids.
    this.evaluateCron = evaluateCron;
  }
}

// Achievements groups will keep related achievements grouped. (give 10/50/100 flowers)
class AchievementGroup {
  constructor(flag, displayName) {
    // The flag must be alphanumeric. e.g: FLOWER_RECEIVE
    if (!/^[a-z0-9_]+$/i.test(flag)) {
      throw new Error(
        `${flag} is not a valid achievement group flag. Please remove the special spaces and characters.`,
      );
    }
    this.flag = flag;
    this.displayName = displayName;
  }
}

module.exports = {
  Achievement,
  AchievementGroup,
};
