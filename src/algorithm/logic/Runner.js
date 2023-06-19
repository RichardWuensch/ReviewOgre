import Algorithm from '../logic/Algorithm';

export default class Runner {
  runAlgorithm (participants, participantsDispatch, roomSlots, roomSlotsDispatch, authorIsNotary) {
    const algo = new Algorithm(participants, participantsDispatch, roomSlots, roomSlotsDispatch, authorIsNotary);
    algo.run();

    algo.printResult();
    algo.printLikeOldRevOger();
    // algo.printParticipantsSortByAmountOfActiveInSlots();
  }
}
