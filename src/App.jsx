/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import React, { useEffect, useRef } from 'react';
import './App.css';
import MainPage from './components/window/mainPage/MainPage';
import { ParticipantProvider } from './components/shared/context/ParticipantsContext';
import { RoomSlotProvider } from './components/shared/context/RoomSlotContext';
import { Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/shared/navbar/CustomNavbar';
import DocsComponent from './components/window/docsPage/DocsComponent';
import ResultCalculationPage from './components/resultPage/ResultCalculationPage';
import { SettingsProvider } from './components/shared/context/SettingsContext';

function App () {
  const contentRef = useRef(null);

  useEffect(() => {
    const navbarElement = document.querySelector('.navbar');
    const observer = new ResizeObserver((entries) => {
      const navbarHeight = entries[0]?.contentRect?.height;

      requestAnimationFrame(() => {
        contentRef.current.style.marginTop = `${navbarHeight + 10}px`;
      });
    });

    observer.observe(navbarElement);

    return () => {
      observer.unobserve(navbarElement);
    };
  }, [location]);

  return (
    <>
        <RoomSlotProvider>
            <ParticipantProvider>
                <SettingsProvider>
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height: '100%', minWidth: '100%' }}>
                        <CustomNavbar/>
                        <div ref={contentRef} style={{ flexGrow: 1 }}>
                            <Routes>
                                {/* add other routes here. New routes before default route! Otherwise, it will always math '/' */}
                                <Route path={'/reviews'} element={<ResultCalculationPage />} />
                                <Route path={'/docs'} element={<DocsComponent />} />
                                <Route path={'/'} element={<MainPage/>} />
                            </Routes>
                        </div>
                    </div>
                </SettingsProvider>
            </ParticipantProvider>
        </RoomSlotProvider>
    </>
  );
}

export default App;
