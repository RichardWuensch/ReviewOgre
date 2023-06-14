import React from 'react';
import './App.css';
import MainPage from './components/window/mainPage/MainPage';
import { ParticipantProvider } from './components/window/context/ParticipantsContext';
import { RoomSlotProvider } from './components/window/context/RoomSlotContext';
import { Route, Routes } from 'react-router-dom';

function App () {
  return (
    <>
        <RoomSlotProvider>
            <ParticipantProvider>
                <Routes>
                    <Route path={'/'} element={<MainPage/>} />
                    {/* add other routes here */}
                </Routes>
            </ParticipantProvider>
        </RoomSlotProvider>
    </>
  );
}

export default App;
