import Participant from '../../data/model/Participant';
import Room from '../../data/model/Room';
import RoomSlot from '../../data/model/RoomSlot';
import { ParticipantStore } from '../../data/store/ParticipantStore';
import { SlotStore } from '../../data/store/SlotStore';
import { RoomStore } from '../../data/store/RoomStore';

export default class SmallTestData {
  constructor () {
    this.participantStore = ParticipantStore.getSingleton();
    this.slotRoomStore = SlotStore.getSingleton();
    this.roomStore = RoomStore.getSingleton();

    this.authorIsNotary = true;
    this.participants = [
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
    ];

    const startDate1 = new Date();
    startDate1.setHours(14);
    const endDate1 = new Date();
    endDate1.setHours(16);

    const startDate2 = new Date();
    startDate2.setHours(17);
    const endDate2 = new Date();
    endDate2.setHours(19);

    this.slots = [
      new RoomSlot(new Date(), startDate1, endDate1, [
        new Room(0, 'I.1.2', true),
        new Room(0, 'I.1.3', true)
      ]),
      new RoomSlot(new Date(), startDate2, endDate2, [
        new Room(1, 'I.2.2', true),
        new Room(1, 'I.2.3', true)
      ])
    ];
  }
}
