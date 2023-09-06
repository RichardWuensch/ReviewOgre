/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import { createContext, useContext, useReducer } from 'react';

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
      if (temp.getId() === undefined) {
        temp.setId(nextId++);
      } else {
        const idAlreadyTaken = participants.find(p => p.getId() === temp.getId()) !== undefined;
        if (idAlreadyTaken) {
          nextId = Math.max(...participants.map(p => p.getId())) + 1;
          temp.setId(nextId);
        }
      }
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
    case 'deleteAll': {
      nextId = 1;
      return [];
    }
    case 'getAll': {
      return participants;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialParticipants = [];
