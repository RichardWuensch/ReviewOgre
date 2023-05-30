import Runner from '../logic/Runner';
import { ParticipantStore } from '../../data/store/ParticipantStore';
import RoomSlotHelper from '../../data/store/RoomSlotHelper';
// import SmallTestDataUpdated from './SmallTestDataUpdated';
import SmallTestDataUpdatedWithoutParticipants from './SmallTestDataUpdatedWithoutParticipants';
import SmallTestDataUpdated from './SmallTestDataUpdated';

export default class Test {
  run (participants) {
    // check if stored data is empty

    if (participants.length === 2 && new RoomSlotHelper().getAllRoomSlots().length === 0) { // 2 because of the 2 frontend testdata
      console.log('Running algorithm with test configuration');
      this.#storeTestData();
    }

    if (participants.length > 0 && new RoomSlotHelper().getAllRoomSlots().length === 0) {
      console.log('Running algorithm with test configuration but without test participants');
      this.#storeTestDataWithoutParticipants(participants);
    }

    const result = new Runner().runAlgorithm();

    ParticipantStore.getSingleton().getAll().forEach(p => p.resetStatistics());
    return result;
  }

  #storeTestData () {
    const testConfiguration = new SmallTestDataUpdated();
    testConfiguration.setTestStores();
  }

  #storeTestDataWithoutParticipants (participants) {
    const testConfiguration = new SmallTestDataUpdatedWithoutParticipants(participants);
    testConfiguration.setTestStores();
  }
}
