import Slot from './Slot';

export default class Review {
  #groupName;

  #author = {};
  #moderator = {};
  #notary = {};
  #reviewers = [];

  #possibleParticipants = [];

  constructor (roomSlot, author) {
    this.setAuthor(roomSlot, author);
    this.#groupName = author.getGroup();
  }

  getGroupName () {
    return this.#groupName;
  }

  setGroupName (groupName) {
    this.#groupName = groupName;
  }

  getAuthor () {
    return this.#author;
  }

  setAuthor (roomSlot, author) {
    this.#author = author;
    this.#author.increaseAuthorCount();
    this.#author.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlot));
    this.#deleteParticipantFromPossibleParticipants(this.#author);
  }

  getModerator () {
    return this.#moderator;
  }

  setModerator (roomSlot, moderator) {
    this.#moderator = moderator;
    this.#moderator.increaseModeratorCount();
    this.#moderator.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlot));
    this.#deleteParticipantFromPossibleParticipants(this.#moderator);
  }

  getNotary () {
    return this.#notary;
  }

  setNotary (roomSlot, notary, authorIsNotary) {
    this.#notary = notary;
    this.#notary.increaseNotaryCount();
    if (authorIsNotary === false) {
      this.#notary.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlot));
      this.#deleteParticipantFromPossibleParticipants(this.#notary);
    } else {
      // do nothing, this is done because of the double role
    }
  }

  getReviewer () {
    return this.#reviewers;
  }

  setReviewer (reviewers) {
    this.#reviewers = reviewers;
  }

  addReviewer (roomSlot, participant) {
    participant.increaseReviewerCount();
    participant.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlot));
    this.#reviewers.push(participant);
    this.#deleteParticipantFromPossibleParticipants(participant);
  }

  getPossibleParticipants () {
    return this.#possibleParticipants;
  }

  #setPossibleParticipants (possibleParticipants) {
    this.#possibleParticipants = possibleParticipants;
  }

  /**
  * delete a participant from the possibleParticipant list after he is assigned to a role in this review
  * @param {Participant} participants - the participant to be deleted
  */
  #deleteParticipantFromPossibleParticipants (participant) {
    this.#possibleParticipants.splice(
      this.#possibleParticipants.indexOf(participant), 1
    );
  }

  /**
  * search all possible participants for this review
  * @param {Slot} roomSlot - to get the slot and check if the participants is currently active in this slot
  * @param {Participant} participants - to check if the participant is not in the same group as the author and currently not ative in this timeslot
  */
  fillPossibleParticipantsOfReview (roomSlot, participants) {
    const slot = this.#getSlotFromRoomSlot(roomSlot);
    this.#setPossibleParticipants(
      participants.filter((p) => this.getAuthor().getGroup() !== p.getGroup() && !p.isActiveInSlot(slot))
    );
  }

  /**
  * parse the roomSlot in the upper class slot object
  * @param {RoomSlot} roomSlot
  * @returns {Slot}
  */
  #getSlotFromRoomSlot (roomSlot) {
    return new Slot(roomSlot.getDate(), roomSlot.getStartTime(), roomSlot.getEndTime());
  }
}
