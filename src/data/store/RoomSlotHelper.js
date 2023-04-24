import { SlotStore } from './SlotStore';
import { RoomStore } from './RoomStore';
import RoomSlot from '../model/RoomSlot';

const slotStore = SlotStore.getSingleton();
const roomStore = RoomStore.getSingleton();

export default class RoomSlotHelper {
  getRoomSlot (slotId) {
    const slot = slotStore.getById(slotId);
    const rooms = this.getAllRoomsOfSlot(slotId);

    return new RoomSlot(new Date(), slot.getStartTime(), slot.getEndTime(), rooms);
  }

  getAllRoomSlots () {
    const slots = slotStore.getAll();

    const roomSlots = [];
    slots.forEach(slot => {
      roomSlots.push(this.getRoomSlot(slot.getId()));
    });

    return roomSlots;
  }

  getAllRoomsOfSlot (slotId) {
    return roomStore.getAll().filter(room => room.getSlotId() === slotId);
  }
}
