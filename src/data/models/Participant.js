import ParticipantFairness from './ParticipantFairness';

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
  #activeInSlotsAsReviewer = new Map();
  #fairness;

  constructor (jsonParticipant, id, firstName, lastName, email, group, topic, languageLevel) {
    if (jsonParticipant) {
      this.#id = jsonParticipant.participantId;
      this.#firstName = jsonParticipant.firstName;
      this.#lastName = jsonParticipant.lastName;
      this.#email = jsonParticipant.email;
      this.setGroup(jsonParticipant.group);
      this.#topic = jsonParticipant.topic;
      this.#languageLevel = jsonParticipant.languageLevel;
      this.#reviewerCount = jsonParticipant.reviewerCount ?? 0;
      this.#authorCount = jsonParticipant.authorCount ?? 0;
      this.#notaryCount = jsonParticipant.notaryCount ?? 0;
      this.#moderatorCount = jsonParticipant.moderatorCount ?? 0;
    } else {
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
    }

    this.#activeInSlots = [];
    this.#fairness = this.calculateFairness();
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

  decreaseReviewerCount () {
    this.#reviewerCount--;
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

  decreaseAuthorCount () {
    this.#authorCount--;
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

  decreaseNotaryCount () {
    this.#notaryCount--;
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

  decreaseModeratorCount () {
    this.#moderatorCount--;
  }

  addSlotToActiveList (slot) {
    this.#activeInSlots.push(slot);
  }

  deleteSlotFromActiveList (slotToDelete) {
    this.#activeInSlots = this.#activeInSlots.filter(s => s.getId() !== slotToDelete.getId());
  }

  getActiveSlots () {
    return this.#activeInSlots;
  }

  getTotalCount () {
    return this.getActiveSlotsWithoutBrakes().length;
  }

  getActiveSlotsWithoutBrakes () {
    return this.#activeInSlots.filter(s => s.getBreakSlotForUser() === false);
  }

  addSlotToActiveInSlotsAsReviewer (reviewName, slot) {
    this.#activeInSlotsAsReviewer.set(slot, reviewName);
  }

  deleteSlotFromActiveInSlotsAsReviewer (slotToDelete) {
    this.#activeInSlotsAsReviewer.delete(Array.from(this.#activeInSlotsAsReviewer.keys()).find(s => s.getId() === slotToDelete.getId()));
  }

  getActiveInSlotsAsReviewer () {
    return this.#activeInSlotsAsReviewer;
  }

  getFairness () {
    return this.#fairness;
  }

  calculateFairness (meanParticipantTotalCount = 0, meanParticipantReviewerCount = 0) {
    this.#fairness = ParticipantFairness.calculateFairness(this, meanParticipantTotalCount, meanParticipantReviewerCount);
  }

  /**
  * clears the activeInSlot list before the algorithm is restarted
  */
  resetActiveInSlot () {
    this.#activeInSlots = [];
  }

  /**
  * check if this participant is currently busy in a slot
  * @param {Slot} slot - to check if the slot is in the activeInSlots list of the participant
  * @returns {boolean} - true if busy, false if not
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
