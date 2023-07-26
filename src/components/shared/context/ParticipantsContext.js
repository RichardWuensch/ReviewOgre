import { createContext, useContext, useReducer } from 'react';
import Participant from '../../../data/models/Participant';

const ParticipantContext = createContext(null);
const ParticipantDispatchContext = createContext(null);

let nextId = 1;

export function ParticipantProvider ({ children }) {
  const [tasks, dispatch] = useReducer(
    participantsReducer,
    initialParticipants
  );

  return (
        <ParticipantContext.Provider value={tasks}>
            <ParticipantDispatchContext.Provider value={dispatch}>
                {children}
            </ParticipantDispatchContext.Provider>
        </ParticipantContext.Provider>
  );
}

export function useParticipants () {
  return useContext(ParticipantContext);
}

export function useParticipantsDispatch () {
  return useContext(ParticipantDispatchContext);
}

function participantsReducer (participants, action) {
  switch (action.type) {
    case 'added': {
      const temp = action.newParticipant;
      temp.setId(nextId++);
      return [...participants, temp].sort((a, b) => a.getGroup() - b.getGroup());
    }
    case 'changed': {
      return participants.map(t => {
        if (t.getId() === action.updatedParticipant.getId()) {
          return action.updatedParticipant;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return participants.filter(t => t.getId() !== action.itemToDelete.getId());
    }
    case 'getAll': {
      return participants;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialParticipants = [
  new Participant('-1', 'Max', 'Mustermann', 'max.mustermann@study.thws.de', '1', 'Informatik', 'A1'),
  new Participant('0', 'Martina', 'Musterfrau', 'martina.musterfrau@study.thws.de', '2', 'Religion', 'B2')
];
