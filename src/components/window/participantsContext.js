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
      return [...participants, {
        id: action.id,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        group: action.group,
        topic: action.topic,
        languageLevel: action.languageLevel
      }];
    }
    case 'changed': {
      return participants.map(t => {
        if (t.id === action.participants.id) {
          return action.participant;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return participants.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialParticipants = [
  new Participant('Max', 'Mustermann', 'max.mustermann@study.thws.de', '1', 'Informatik', 'A1'),
  new Participant('Martina', 'Musterfrau', 'martina.musterfrau@study.thws.de', '2', 'Religion', 'B2')
];
