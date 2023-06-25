import React, { useEffect, useRef } from 'react';
import './App.css';
import MainPage from './components/window/mainPage/MainPage';
import { ParticipantProvider } from './components/shared/context/ParticipantsContext';
import { RoomSlotProvider } from './components/shared/context/RoomSlotContext';
import { Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/shared/navbar/CustomNavbar';
import DocsComponent from './components/docs/DocsComponent';
import ReviewComponent from './components/review/ReviewComponent';

function App () {
  const contentRef = useRef(null);

  useEffect(() => {
    const navbarElement = document.querySelector('.navbar');
    const observer = new ResizeObserver((entries) => {
      const navbarHeight = entries[0]?.contentRect?.height;
      contentRef.current.style.marginTop = `${navbarHeight + 10}px`;
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
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height: '100%', minWidth: '100%' }}>
                    <CustomNavbar/>
                    <div ref={contentRef} style={{ flexGrow: 1 }}>
                        <Routes>
                            {/* add other routes here. New routes before default route! Otherwise, it will always math '/' */}
                            <Route path={'/docs'} element={<DocsComponent />} />
                            <Route path={'/'} element={<MainPage/>} />
                            <Route path={'/reviews'} element={<ReviewComponent />} />
                        </Routes>
                    </div>
                </div>
            </ParticipantProvider>
        </RoomSlotProvider>
    </>
  );
}

export default App;
