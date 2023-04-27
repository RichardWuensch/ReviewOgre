import React from 'react';
import './App.css';
import MainPage from '../src/components/window/MainPage';

function App () {
  const listAllParticipants = [
    { firstName: 'Max', lastName: 'Mustermann', email: 'max.mustermann@study.thws.de', group: '1', topic: 'Informatik', languageLevel: 'A1', id: 1 },
    { firstName: 'Martina', lastName: 'Musterfrau', email: 'martina.musterfrau@study.thws.de', group: '2', topic: 'Religion', languageLevel: 'B2', id: 2 }
  ];

  return (
    <div>
      <MainPage listAllParticipants={listAllParticipants}/>
    </div>
  );
}

export default App;
