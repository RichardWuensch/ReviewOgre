// import OldTestData from './OldTestData';
import SmallTestData from './SmallTestData';
import Algorithm from '../logic/Algorithm';

export default class Test {
  run (configuration) {
    const participants = configuration.participants;
    const roomSlots = configuration.roomSlots;
    const authorIsNotary = configuration.authorIsNotary;

    const algo = new Algorithm(participants, roomSlots, authorIsNotary);
    algo.run();
    algo.printResult();
    algo.printLikeOldRevOger();
    configuration.roomSlots.forEach(rs => rs.getRooms().forEach(r => r.setReview(null)));
    configuration.participants.forEach(p => p.resetStatistics());
  }

  getTestConfiguration () {
    const testConfiguration = new SmallTestData();
    return testConfiguration;
  }
}
