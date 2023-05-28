import { createContext, useContext, useReducer } from 'react';
import Participant from '../../data/model/Participant';

const ParticipantContext = createContext(null);
const ParticipantDispatchContext = createContext(null);

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
      const newParticipant = new Participant(
        action.id,
        action.firstName,
        action.lastName,
        action.email,
        action.group,
        action.topic,
        action.languageLevel
      );
      return [...participants, newParticipant];
    }
    case 'changed': {
      return participants.map(t => {
        const newParticipant = new Participant(
          action.id,
          action.firstName,
          action.lastName,
          action.email,
          action.group,
          action.topic,
          action.languageLevel
        );

        if (t.getId() === newParticipant.getId()) {
          return newParticipant;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return participants.filter(t => t.getId() !== action.id);
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
