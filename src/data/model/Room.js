export default class Room {
  #id;
  #slotId;
  #name;
  #beamer;
  #review = null;

  constructor (name, beamer) {
    this.#name = name;
    this.#beamer = beamer;
  }

  setId (id) {
    this.#id = id;
  }

  getId () {
    return this.#id;
  }

  setSlotId (slotId) {
    this.#slotId = slotId;
  }

  getSlotId () {
    return this.#slotId;
  }

  getName () {
    return this.#name;
  }

  setName (name) {
    this.#name = name;
  }

  hasBeamer () {
    return this.#beamer;
  }

  setHasBeamer (beamer) {
    this.#beamer = beamer;
  }

  getReview () {
    return this.#review;
  }

  setReview (review) {
    this.#review = review;
  }
}
