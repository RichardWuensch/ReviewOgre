export default class Participant {
  #id;
  #firstName;
  #lastName;
  #email;
  #group;
  #topic;
  #languageLevel;

  #reviewerCount;
  #authorCount;
  #notaryCount;
  #moderatorCount;
  #activeInSlots;
  #fairness;

  constructor (id, firstName, lastName, email, group, topic, languageLevel) {
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#email = email;
    this.setGroup(group); // to trigger string parser
    this.#topic = topic; // to know on which topic the Participant worked (A-/B-Review)
    this.#languageLevel = languageLevel; // should this part of the constructor or will the user always set this attribute later?

    this.#reviewerCount = 0;
    this.#authorCount = 0;
    this.#notaryCount = 0;
    this.#moderatorCount = 0;
    this.#activeInSlots = [];

    this.#fairness = {
      totalCountHigherThanAvg: false,
      onlyOneRole: false
    };
  }

  setId (id) {
    this.#id = id;
  }

  getId () {
    return this.#id;
  }

  getFirstName () {
    return this.#firstName;
  }

  setFirstName (firstName) {
    this.#firstName = firstName;
  }

  getLastName () {
    return this.#lastName;
  }

  setLastName (lastName) {
    this.#lastName = lastName;
  }

  getFullName () {
    return this.#firstName + ' ' + this.#lastName;
  }

  getEmail () {
    return this.#email;
  }

  setEmail (email) {
    this.#email = email;
  }

  getGroup () {
    return this.#group;
  }

  setGroup (group) {
    this.#group = String(group); // always strings to be consistent
  }

  getTopic () {
    return this.#topic;
  }

  setTopic (topic) {
    this.#topic = topic;
  }

  getLanguageLevel () {
    return this.#languageLevel;
  }

  setLanguageLevel (languageLevel) {
    this.#languageLevel = languageLevel;
  }

  getReviewerCount () {
    return this.#reviewerCount;
  }

  resetReviewerCount () {
    this.#reviewerCount = 0;
  }

  increaseReviewerCount () {
    this.#reviewerCount++;
  }

  getAuthorCount () {
    return this.#authorCount;
  }

  resetAuthorCount () {
    this.#authorCount = 0;
  }

  increaseAuthorCount () {
    this.#authorCount++;
  }

  getNotaryCount () {
    return this.#notaryCount;
  }

  resetNotaryCount () {
    this.#notaryCount = 0;
  }

  increaseNotaryCount () {
    this.#notaryCount++;
  }

  getModeratorCount () {
    return this.#moderatorCount;
  }

  resetModeratorCount () {
    this.#moderatorCount = 0;
  }

  increaseModeratorCount () {
    this.#moderatorCount++;
  }

  addSlotToActiveList (slot) {
    this.#activeInSlots.push(slot);
  }

  getActiveSlots () {
    return this.#activeInSlots;
  }

  getFairness () {
    return this.#fairness;
  }

  calculateFairness (meanParticipantTotalCount) {
    const totalCount = this.#activeInSlots.length;

    if (totalCount > meanParticipantTotalCount) {
      this.#fairness.totalCountHigherThanAvg = true;
    }

    if (this.#reviewerCount === totalCount ||
      this.#notaryCount === totalCount ||
      this.#authorCount === totalCount ||
      this.#moderatorCount === totalCount ||
      this.#reviewerCount === totalCount) {
      this.#fairness.onlyOneRole = true;
    }
  }

  /**
  * clears the activeInSlot list before the algorithm is restarted
  */
  resetActiveInSlot () {
    this.#activeInSlots = [];
  }

  /**
  * check if this participant is currently bussy in a slot
  * @param {Slot} slot - to check if the slot is in the activeInSlots list of the participant
  * @returns {boolean} - true if bussy, false if not
  */
  isActiveInSlot (slot) {
    for (const activeInSlot of this.#activeInSlots) {
      if (slot.getStartTime().getTime() === activeInSlot.getStartTime().getTime()) return true;
    }
    return false;
  }

  /**
  * set the counter of this participant to 0
  */
  resetStatistics () {
    this.resetReviewerCount();
    this.resetAuthorCount();
    this.resetModeratorCount();
    this.resetNotaryCount();
    this.resetActiveInSlot();
  }
}
