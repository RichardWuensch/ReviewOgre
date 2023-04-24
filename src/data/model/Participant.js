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

  constructor (firstName, lastName, email, group, topic, languageLevel) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#email = email;
    this.#group = group;
    this.#topic = topic; // to know on which topic the Participant worked (A-/B-Review)
    this.#languageLevel = languageLevel; // should this part of the constructor or will the user always set this attribute later?

    this.#reviewerCount = 0;
    this.#authorCount = 0;
    this.#notaryCount = 0;
    this.#moderatorCount = 0;
    this.#activeInSlots = [];
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
    this.#group = group;
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

  resetActiveInSlot () {
    this.#activeInSlots = [];
  }

  isActiveInSlot (slot) {
    for (const activeInSlot of this.#activeInSlots) {
      if (
        slot.getDate() === activeInSlot.getDate() &&
        slot.getEndTime() === activeInSlot.getEndTime() &&
        slot.getStartTime() === activeInSlot.getStartTime()
      ) { return true; }
    }
    return false;
  }

  resetStatistics () {
    this.resetReviewerCount();
    this.resetAuthorCount();
    this.resetModeratorCount();
    this.resetNotaryCount();
    this.resetActiveInSlot();
  }
}
