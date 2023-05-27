import Store from './AbstractStore';
import Participant from '../model/Participant';

export const ParticipantStore = (() => {
  let instance;

  /* function #addSampleData () {
    const sampleData = [
        new Participant('Max', 'Mustermann', 'max.mustermann@study.thws.de', '1', 'Informatik', 'A1'),
        new Participant('Martina', 'Musterfrau', 'martina.musterfrau@study.thws.de', '2', 'Religion', 'B2')];

    instance.putMultiple(sampleData);
  } */

  function getInstance () {
    if (!instance) {
      instance = new Store(Participant);
      // #addSampleData();
    }
    return instance;
  }

  return {
    getSingleton: () => {
      return getInstance();
    }
  };
})();
