
export class Store {
  #store = new Map();
  #id = 0;

  #getAndIncrementId () {
    return this.#id++;
  }

  getById (key) {
    return this.#store.get(key);
  }

  getAll () {
    return Array.from(this.#store.values());
  }

  put (value) {
    value.id = this.#getAndIncrementId();
    this.#store.set(value.id, value);
    return true;
  }

  delete (id) {
    this.#store.delete(id);
    return true;
  }

  update (id, value) {
    if (this.#store.has(id) === false) {
      return false;
    }

    if (id !== value.getId()) {
      return false;
    }

    this.#store.set(id, value);
    return true;
  }

  contains (key) {
    return this.#store.has(key);
  }
}
