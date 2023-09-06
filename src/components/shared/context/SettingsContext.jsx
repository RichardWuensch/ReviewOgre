/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import { createContext, useContext, useReducer } from 'react';

const SettingsContext = createContext(null);
const SettingsDispatchContext = createContext(null);

export function SettingsProvider ({ children }) {
  const [tasks, dispatch] = useReducer(
    settingsReducer,
    initialSettings
  );

  return (
        <SettingsContext.Provider value={tasks}>
            <SettingsDispatchContext.Provider value={dispatch}>
                {children}
            </SettingsDispatchContext.Provider>
        </SettingsContext.Provider>
  );
}

export function useSettings () {
  return useContext(SettingsContext);
}

export function useSettingsDispatch () {
  return useContext(SettingsDispatchContext);
}

function settingsReducer (settings, action) {
  switch (action.type) {
    case 'changed': {
      return {
        ...settings,
        ...action.updatedSettings
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialSettings = {
  authorIsNotary: false,
  breakForModeratorAndReviewer: false,
  abReview: false,
  internationalGroups: false
};
