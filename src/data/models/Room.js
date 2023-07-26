let nextId = 0;

export default class Room {
  #id;
  #slotId;
  #name;
  #beamerNeeded;
  #notNeeded = false;
  #review = null;

  constructor (name, beamerNeeded, id = null) {
    if (id !== null) {
      this.#id = id;
    } else {
      this.#id = nextId++;
    }
    this.#name = name;
    this.#beamerNeeded = beamerNeeded;
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

  getBeamerNeeded () {
    return this.#beamerNeeded;
  }

  setBeamerNeeded (beamerNeeded) {
    this.#beamerNeeded = beamerNeeded;
  }

  getNotNeeded () {
    return this.#notNeeded;
  }

  setNotNeeded (notNeeded) {
    this.#notNeeded = notNeeded;
  }

  getReview () {
    return this.#review;
  }

  setReview (review) {
    this.#review = review;
  }
}
