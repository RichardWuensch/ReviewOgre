import Store from './AbstractStore';
import Slot from '../model/Slot';

export const SlotStore = (function () {
  let instance = new Store(Slot);

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
