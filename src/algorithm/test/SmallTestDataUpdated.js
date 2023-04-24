import Participant from '../../data/model/Participant';
import Room from '../../data/model/Room';
import Slot from '../../data/model/Slot';
import { ParticipantStore } from '../../data/store/ParticipantStore';
import { SlotStore } from '../../data/store/SlotStore';
import { RoomStore } from '../../data/store/RoomStore';

export default class SmallTestData {
  constructor () {
    this.participantStore = ParticipantStore.getSingleton();
    this.slotStore = SlotStore.getSingleton();
    this.roomStore = RoomStore.getSingleton();

    this.authorIsNotary = true;
    [
      new Participant('Richard', '', '', 1),
      new Participant('Basti', '', '', 1),
      new Participant('Daniel', '', '', 1),
      new Participant('Jakob', '', '', 2),
      new Participant('Nico', '', '', 2),
      new Participant('Hannah', '', '', 2),
      new Participant('A', '', '', 3),
      new Participant('B', '', '', 3),
      new Participant('C', '', '', 3),
      new Participant('X', '', '', 4),
      new Participant('Y', '', '', 4),
      new Participant('Z', '', '', 4)
    ].forEach(p => { this.participantStore.put(p); });

    const startDate1 = new Date();
    startDate1.setHours(14);
    const endDate1 = new Date();
    endDate1.setHours(16);
    const slot1 = new Slot(new Date(), startDate1, endDate1);
    this.slotStore.put(slot1);

    const startDate2 = new Date();
    startDate2.setHours(17);
    const endDate2 = new Date();
    endDate2.setHours(19);
    const slot2 = new Slot(new Date(), startDate2, endDate2);
    this.slotStore.put(slot2);

    [
      new Room('I.1.2', true),
      new Room('I.1.3', true)
    ].forEach(room => {
      room.setSlotId(slot1.getId());
      this.roomStore.put(room);
    });

    [
      new Room(1, 'I.2.2', true),
      new Room(1, 'I.2.3', true)
    ].forEach(room => {
      room.setSlotId(slot2.getId());
      this.roomStore.put(room);
    });
  }
}
