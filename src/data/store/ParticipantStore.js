import { Store } from './AbstractStore';
import Participant from '../model/Participant';

export const ParticipantStore = (function () {
  let instance = new Store(Participant);

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
