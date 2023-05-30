export default class Slot {
  #id;
  #date;
  #startTime;
  #endTime;

  constructor (date, startTime, endTime) {
    this.#date = date;
    this.#startTime = startTime;
    this.#endTime = endTime;
  }

  setId (id) {
    this.#id = id;
  }

  getId () {
    return this.#id;
  }

  getDate () {
    return this.#date;
  }

  getFormattedDate () {
    // Get the day, month, and year from the Date object
    const day = this.#date.getDate().toString().padStart(2, '0');
    const month = (this.#date.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0, so add 1
    const year = this.#date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  setDate (date) {
    this.#date = date;
  }

  getStartTime () {
    return this.#startTime;
  }

  getFormattedStartTime () {
    const hours = this.#startTime.getHours().toString().padStart(2, '0');
    const minutes = this.#startTime.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  setStartTime (startTime) {
    this.#startTime = startTime;
  }

  getEndTime () {
    return this.#endTime;
  }

  getFormattedEndTime () {
    const hours = this.#endTime.getHours().toString().padStart(2, '0');
    const minutes = this.#endTime.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  setEndTime (endTime) {
    this.#endTime = endTime;
  }
}
