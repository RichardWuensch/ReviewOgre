import { ParticipantStore } from '../../data/store/ParticipantStore';
import RoomSlotHelper from '../../data/store/RoomSlotHelper';
import { ConfigurationStore } from '../../data/store/ConfigurationStore';

export default class AbstractTestData {
  participants = [];
  roomSlots = [];
  authorIsNotary;

  setTestStores () {
    const participantStore = ParticipantStore.getSingleton();
    const helper = new RoomSlotHelper();

    ConfigurationStore.getSingleton().setAuthorIsNotary(this.authorIsNotary);

    participantStore.deleteAll();
    participantStore.putMultiple(this.participants);

    helper.deleteAllSlotsAndRooms();
    for (const roomSlot of this.roomSlots) {
      helper.putRoomSlot(roomSlot);
    }
  }
}
