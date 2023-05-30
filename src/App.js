import React from 'react';
import './App.css';
import MainPage from '../src/components/window/MainPage';
import { ParticipantProvider } from './components/window/ParticipantsContext';
import { RoomSlotProvider } from './components/window/RoomSlotContext';

function App () {
  return (
    <div>
        <RoomSlotProvider>
            <ParticipantProvider>
                <MainPage/>
            </ParticipantProvider>
        </RoomSlotProvider>
    </div>
  );
}

export default App;
