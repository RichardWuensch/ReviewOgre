let nextId = 0;

export default class Room {
  #id;
  #slotId;
  #name;
  #beamer;
  #ignoreForAlgorithm;
  #review = null;

  constructor (name, beamer, id = null) {
    if (id !== null) {
      this.#id = id;
    } else {
      this.#id = nextId++;
    }
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

  getIgnoreForAlgorithm () {
    return this.#ignoreForAlgorithm;
  }

  setIgnoreForAlgorithm (ignoreForAlgorithm) {
    this.#ignoreForAlgorithm = ignoreForAlgorithm;
  }

  getReview () {
    return this.#review;
  }

  setReview (review) {
    this.#review = review;
  }
}
