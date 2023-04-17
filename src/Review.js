class Review {
  #groupName;

  #author = {};
  #moderator = {};
  #notary = {};
  #reviewers = [];

  #possibleParticipants = [];

  constructor(author) {
    this.#author = author;
    this.#groupName = author.getGroup();
  }

  getGroupName() {
    return this.#groupName;
  }
  setGroupName(groupName) {
    this.#groupName = groupName;
  }

  getAuthor() {
    return this.#author;
  }
  setAuthor(author) {
    this.#author = author;
  }

  getModerator() {
    return this.#moderator;
  }
  setModerator(moderator) {
    this.#moderator = moderator;
  }

  getNotary() {
    return this.#notary;
  }
  setNotary(notary) {
    this.#notary = notary;
  }

  getReviewer() {
    return this.#reviewers;
  }
  setReviewer(reviewers) {
    this.#reviewers = reviewers;
  }
  addReviewer(participant){
    this.#reviewers.push(participant)
  }

  getPossibleParticipants() {
    return this.#possibleParticipants;
  }
  setPossibleParticipants(possibleParticipants) {
    this.#possibleParticipants = possibleParticipants;
  }
  deleteParticipantFromPossibleParticipants(participant){
    this.#possibleParticipants.splice(
        this.#possibleParticipants.indexOf(participant),
        1
      );
  }
}
