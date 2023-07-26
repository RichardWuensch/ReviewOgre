import { createContext, useContext, useReducer } from 'react';
import RoomSlot from '../../../data/models/RoomSlot';
import Room from '../../../data/models/Room';

const RoomSlotContext = createContext(null);
const RoomSlotDispatchContext = createContext(null);

let nextId = 1;

export function RoomSlotProvider ({ children }) {
  const [tasks, dispatch] = useReducer(
    roomSlotsReducer,
    initialRoomSlots
  );

  return (
        <RoomSlotContext.Provider value={tasks}>
            <RoomSlotDispatchContext.Provider value={dispatch}>
                {children}
            </RoomSlotDispatchContext.Provider>
        </RoomSlotContext.Provider>
  );
}

export function useRoomSlots () {
  return useContext(RoomSlotContext);
}

export function useRoomSlotsDispatch () {
  return useContext(RoomSlotDispatchContext);
}

function roomSlotsReducer (roomSlots, action) {
  switch (action.type) {
    case 'added': {
      const temp = action.newRoomSlot;
      if (temp.getId() === undefined) {
        temp.setId(nextId++);
      } else {
        const idAlreadyTaken = roomSlots.find(rs => rs.getId() === temp.getId()) !== undefined;
        if (idAlreadyTaken) {
          nextId = Math.max(...roomSlots.map(rs => rs.getId())) + 1;
          temp.setId(nextId);
        }
      }

      return [...roomSlots, temp].sort((a, b) => a.getStartTime().getTime() - b.getStartTime().getTime());
    }
    case 'changed': {
      const updatedRoomSlot = action.updatedRoomSlot;
      return roomSlots.map(t => {
        if (t.getId() === updatedRoomSlot.getId()) {
          return updatedRoomSlot;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return roomSlots.filter(t => t.getId() !== action.itemToDelete.getId());
    }
    case 'deleteAll': {
      nextId = 1;
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialRoomSlots = [
  new RoomSlot(-1, new Date(), new Date(), new Date(), [
    new Room('I.1.2', true),
    new Room('I.1.3', true)
  ]),
  new RoomSlot(0, new Date(), new Date(), new Date(), [
    new Room('I.2.2', true),
    new Room('I.2.3', true)
  ])
];
