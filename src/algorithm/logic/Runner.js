import Algorithm from './Algorithm';

export default class Runner {
  runAlgorithm (participants, participantsDispatch, roomSlots, roomSlotsDispatch, settings) {
    const algo = new Algorithm(participants, participantsDispatch, roomSlots, roomSlotsDispatch, settings);
    algo.run();
    algo.printParticipantsSortByAmountOfActiveInSlots();
  }
}
