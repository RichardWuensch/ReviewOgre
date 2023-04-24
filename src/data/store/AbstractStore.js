export class Store {
  #store = new Map();
  #type;
  #id = 0;

  constructor (type) {
    this.#type = type;
  }

  #incrementAndGetId () {
    this.#id++;
    return this.#id;
  }

  getById (key) {
    return this.#store.get(key);
  }

  getAll () {
    return Array.from(this.#store.values());
  }

  put (value) {
    if (value instanceof this.#type) {
      value.setId(this.#incrementAndGetId());
      this.#store.set(value.getId(), value);
      return true;
    }
    console.error('Unable to store value: ' + value);
    return false;
  }

  putMultiple (values) {
    values.forEach(value => this.put(value));
  }

  delete (id) {
    this.#store.delete(id);
    return true;
  }

  update (id, value) {
    if (this.#store.has(id) === false) {
      return false;
    }

    if (!(value instanceof this.#type)) {
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
