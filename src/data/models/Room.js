let nextId = 0;

export default class Room {
  #id;
  #slotId;
  #name;
  #beamerNeeded;
  #review = null;
  #notNeeded = { bool: false, topic: '' };

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

  setNotNeeded (notNeeded, topic) {
    this.#notNeeded.bool = notNeeded;
    this.#notNeeded.topic = topic;
  }

  getReview () {
    return this.#review;
  }

  setReview (review) {
    this.#review = review;
  }

  resetReview () {
    this.#review = null;
    this.#notNeeded = { bool: false, topic: '' };
  }
}
