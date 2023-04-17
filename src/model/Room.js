class Room {
  #name;
  #beamer;
  #review = null;

  constructor(name, beamer) {
    this.#name = name;
    this.#beamer = beamer;
  }

  getName() {
    return this.#name;
  }
  setName(name) {
    this.#name = name;
  }

  hasBeamer() {
    return this.#beamer;
  }
  setHasBeamer(beamer) {
    this.#beamer = beamer;
  }

  getReview() {
    return this.#review;
  }
  setReview(review) {
    this.#review = review;
  }
}
