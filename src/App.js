import React from 'react';
import './App.css';
import MainPage from '../src/components/window/MainPage';
import { ParticipantProvider } from './components/window/ParticipantsContext';

function App () {
  return (
    <div>
        <ParticipantProvider>
            <MainPage/>
        </ParticipantProvider>
    </div>
  );
}

export default App;
