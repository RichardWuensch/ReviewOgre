import { Store } from './AbstractStore';
import Room from '../model/Room';

export const RoomStore = (function () {
  let instance = new Store(Room);

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
