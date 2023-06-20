import Algorithm from '../logic/Algorithm';

export default class Runner {
  runAlgorithm (participants, participantsDispatch, roomSlots, roomSlotsDispatch, authorIsNotary, breakForModeratorAndReviewer) {
    const algo = new Algorithm(participants, participantsDispatch, roomSlots, roomSlotsDispatch, authorIsNotary, breakForModeratorAndReviewer);
    algo.run();

    algo.printResult();
    algo.printLikeOldRevOger();
    algo.printParticipantsSortByAmountOfActiveInSlots();
  }
}
