import React from 'react';
import './App.css';
import MainPage from './components/window/mainPage/MainPage';
import { ParticipantProvider } from './components/window/context/ParticipantsContext';
import { RoomSlotProvider } from './components/window/context/RoomSlotContext';
import { Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/shared/navbar/CustomNavbar';

function App () {
  return (
    <>
        <RoomSlotProvider>
            <ParticipantProvider>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <CustomNavbar/>
                    <Routes>
                        {/* add other routes here. New routes before default route! */}
                        <Route path={'/'} element={<MainPage/>} />
                    </Routes>
                </div>
            </ParticipantProvider>
        </RoomSlotProvider>
    </>
  );
}

export default App;
