class Result {
  #roomSlots;

  setRoomSlots (roomSlots) {
    this.#roomSlots = roomSlots;
  }

  getRoomSlots () {
    return this.#roomSlots;
  }
}

export const ResultStore = (function () {
  let instance = new Result();

  function getInstance () {
    return instance;
  }

  return {
    getSingleton: function () {
      if (!instance) {
        instance = getInstance();
      }
      return instance;
    }
  };
})();
