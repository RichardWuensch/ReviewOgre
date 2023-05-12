export default class Store {
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

  /**
   * getAll values from the store
   * @returns {any[]} returns an array of values
   */
  getAll () {
    return Array.from(this.#store.values());
  }

  /**
   * Add a new item to the store
   * @param value
   * @returns {boolean} true if successful, false otherwise
   */
  put (value) {
    if (value instanceof this.#type) {
      value.setId(this.#incrementAndGetId());
      this.#store.set(value.getId(), value);
      return value;
    }
    console.error('Unable to store value: ' + value);
    return false;
  }

  /**
   * Helper to store multiple values at once
   * @param values [] array of values to store
   */
  putMultiple (values) {
    values.forEach(value => this.put(value));
  }

  /**
   * Delete a value from the store
   * @param id
   * @returns {boolean} true if deleted successfully, false if value was not found
   */
  delete (id) {
    if (this.#store.has(id) === false) {
      return false;
    }

    this.#store.delete(id);
    return true;
  }

  /**
   * Delete all values from the store
   * @returns {boolean} true if deleted successfully, false if value was not found
   */
  deleteAll () {
    this.#store.clear();
  }

  /**
   * Update a value in the store
   * @param id
   * @param value must have the same id as {id}
   * @returns {boolean} returns true if the value was updated otherwise false
   */
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
