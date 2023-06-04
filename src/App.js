import React from 'react';
import './App.css';
import MainPage from './components/window/mainPage/MainPage';
import { ParticipantProvider } from './components/window/context/ParticipantsContext';
import { RoomSlotProvider } from './components/window/context/RoomSlotContext';

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
