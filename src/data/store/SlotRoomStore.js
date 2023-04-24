import { Store } from './AbstractStore';

export const SlotRoomStore = (function () {
  let instance = new Store();

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
