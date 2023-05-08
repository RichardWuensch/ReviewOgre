import Algorithm from '../logic/Algorithm';
import RoomSlotHelper from '../../data/store/RoomSlotHelper';
import { ParticipantStore } from '../../data/store/ParticipantStore';
import { ConfigurationStore } from '../../data/store/ConfigurationStore';

export default class Runner {
  runAlgorithm () {
    const helper = new RoomSlotHelper();
    const participantStore = ParticipantStore.getSingleton();
    const configurationStore = ConfigurationStore.getSingleton();

    const participants = participantStore.getAll();
    const roomSlots = helper.getAllRoomSlots();
    const authorIsNotary = configurationStore.getAuthorIsNotary();

    const algo = new Algorithm(participants, roomSlots, authorIsNotary);
    const success = algo.run();

    algo.printResult();
    algo.printLikeOldRevOger();

    return success;
  }
}
