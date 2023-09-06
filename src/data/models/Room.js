/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

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

  resetNotNeeded () {
    this.#notNeeded = { bool: false, topic: '' };
  }

  getReview () {
    return this.#review;
  }

  setReview (review) {
    this.#review = review;
  }

  resetReview () {
    this.#review = null;
  }
}
