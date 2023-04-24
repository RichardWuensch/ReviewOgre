// import OldTestData from './OldTestData';
import SmallTestData from './SmallTestData';
import Algorithm from '../logic/Algorithm';

export default class Test {
  run (configuration) {
    const participants = configuration.participantStore.getAll();
    const roomSlots = configuration.slotRoomStore.getAll();
    const authorIsNotary = configuration.authorIsNotary;

    const algo = new Algorithm(participants, roomSlots, authorIsNotary);
    algo.run();
    algo.printResult();
    algo.printLikeOldRevOger();
    configuration.slotRoomStore.getAll().forEach(rs => rs.getRooms().forEach(r => r.setReview(null)));
    configuration.participantStore.getAll().forEach(p => p.resetStatistics());
  }

  getTestConfiguration () {
    const testConfiguration = new SmallTestData();
    return testConfiguration;
  }
}
