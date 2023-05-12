import Runner from '../logic/Runner';
import { ParticipantStore } from '../../data/store/ParticipantStore';
import RoomSlotHelper from '../../data/store/RoomSlotHelper';
import SmallTestDataUpdated from './SmallTestDataUpdated';

export default class Test {
  run () {
    // check if stored data is empty
    if (ParticipantStore.getSingleton().getAll().length === 0 || new RoomSlotHelper().getAllRoomSlots().length === 0) {
      console.log('Running algorithm with test configuration');
      this.#storeTestData();
    }

    const result = new Runner().runAlgorithm();

    ParticipantStore.getSingleton().getAll().forEach(p => p.resetStatistics());
    return result;
  }

  #storeTestData () {
    const testConfiguration = new SmallTestDataUpdated();
    testConfiguration.setTestStores();
  }
}
