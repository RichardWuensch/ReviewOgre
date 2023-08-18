import React from 'react';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../../../public/ogre96.png';
import { useParticipants, useParticipantsDispatch } from '../context/ParticipantsContext';
import { useRoomSlots, useRoomSlotsDispatch } from '../context/RoomSlotContext';
import { Link, useLocation } from 'react-router-dom';
import DataImportCheckModal from '../../modals/dataImportCheckModal/DataImportCheckModal';
import LoadState from '../../../api/LoadState';
import StoreState from '../../../api/StoreState';
import StateExportSaveReviewsModal from '../../modals/stateExportSaveReviewsModal/StateExportSaveReviewsModal';
import ErrorModal from '../../modals/errorModal/ErrorModal';
import { useSettings, useSettingsDispatch } from '../context/SettingsContext';
import './CustomNavbar.css';

function CustomNavbar () {
  const location = useLocation();
  const participantsDispatch = useParticipantsDispatch();
  const participants = useParticipants();
  const roomSlotsDispatch = useRoomSlotsDispatch();
  const settingsDispatch = useSettingsDispatch();
  const settings = useSettings();
  const roomSlots = useRoomSlots();
  const [showModalDataImportCheck, setShowModalDataImportCheck] = React.useState(false);
  const [showSaveReviewsModal, setShowSaveReviewsModal] = React.useState(false);
  const [importedRoomSlots, setImportedRoomSlots] = React.useState([]);
  const [importedParticipants, setImportedParticipants] = React.useState([]);
  const [importedSettings, setImportedSettings] = React.useState({});
  const [stateImportError, setStateImportError] = React.useState(null);

  function checkForAssignedReviews () {
    const firstAssignedReview = roomSlots[0]?.getRooms()[0]?.getReview();
    if (firstAssignedReview) {
      setShowSaveReviewsModal(true);
    } else {
      saveState(false); // directly call saveState without having to ask whether to save reviews
    }
  }

  function saveState (saveWithReviews) {
    new StoreState().saveAsJSON(roomSlots, participants, settings, saveWithReviews);
  }

  async function loadStateIntoLocalObjects (event) {
    try {
      const loadState = new LoadState();
      await loadState.runStateImport(event);
      setImportedRoomSlots(loadState.getRoomSlots());
      setImportedParticipants(loadState.getParticipants());
      setImportedSettings(loadState.getSettings());
      setStateImportError(null);
      setShowModalDataImportCheck(true);
    } catch (error) {
      setStateImportError(error);
      resetImportedObjects();
    }
  }

  function resetImportedObjects () {
    setImportedRoomSlots([]);
    setImportedParticipants([]);
    setImportedSettings({});
  }

  function addLocalObjectsToContext () {
    addRoomSlotListToContext(importedRoomSlots);
    addParticipantListToContext(importedParticipants);
    addSettingsToContext(importedSettings);
    resetImportedObjects();
  }

  function addParticipantListToContext (list) {
    /* eslint-disable object-shorthand */
    for (const entry of list) {
      participantsDispatch({
        type: 'added',
        newParticipant: entry
      });
    }
    /* eslint-enable object-shorthand */
  }

  function addRoomSlotListToContext (list) {
    /* eslint-disable object-shorthand */
    for (const entry of list) {
      roomSlotsDispatch({
        type: 'added',
        newRoomSlot: entry
      });
    }
    /* eslint-enable object-shorthand */
  }

  function deleteAllParticipantsFromContext () {
    participantsDispatch({
      type: 'deleteAll'
    });
  }

  function deleteAllRoomSlotsFromContext () {
    roomSlotsDispatch({
      type: 'deleteAll'
    });
  }

  function addSettingsToContext (settings) {
    /* eslint-disable object-shorthand */
    settingsDispatch({
      type: 'changed',
      updatedSettings: settings
    });
    /* eslint-enable object-shorthand */
  }

  const isActiveTab = (path) => location.pathname === path;

  return (
      <Navbar collapseOnSelect className={'fixed-top'} expand="lg" style={{ backgroundColor: '#f5f5f5', borderBottom: 'solid rgba(0, 0, 0, 0.19) 1px' }}>
          <Container>
              <Navbar.Brand as={ Link } to="/">
                  <div className="d-flex align-items-center">
                      <Image src={logo} alt="icon" height={50} width={50} />
                      <div className="ml-3" style={{ paddingLeft: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ fontSize: '18px' }}>ReviewOgre Reloaded</span>
                          </div>
                          <div style={{ fontSize: '14px' }}>Sort your review peers in groups for better Technical Reviews!</div>
                      </div>
                  </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto"></Nav>
                  <Nav>
                      <Nav.Link className={(isActiveTab('/') ? 'active' : '')} as={ Link } to="/">Home</Nav.Link>
                      <Nav.Link className={(isActiveTab('/reviews') ? 'active' : '') + 'cypress-e2e-review-page-nav'} as={ Link } to="/reviews">Reviews</Nav.Link>
                      <Nav.Link className={(isActiveTab('/docs') ? 'active' : '')} as={ Link } to="/docs">Docs</Nav.Link>
                      <NavDropdown title="Save/Load Options" id="basic-nav-dropdown">
                          <NavDropdown.Item onClick={() => document.getElementById('file-input-config').click()}>Load State</NavDropdown.Item>
                          <input type="file"
                                 id="file-input-config"
                                 className='e2e-testing-load-state'
                                 style={{ display: 'none' }}
                                 onChange={() => { loadStateIntoLocalObjects(event); }}
                                 accept='application/json'/>
                          <NavDropdown.Item onClick={checkForAssignedReviews}>Save State</NavDropdown.Item>
                      </NavDropdown>
                  </Nav>
              </Navbar.Collapse>
          </Container>
          <DataImportCheckModal
              show={showModalDataImportCheck}
              importedRoomSlots={importedRoomSlots}
              importedParticipants={importedParticipants}
              importedSettings={importedSettings}
              onOverwriteData={() => {
                deleteAllParticipantsFromContext();
                deleteAllRoomSlotsFromContext();
                addLocalObjectsToContext();
              }}
              onAddData={addLocalObjectsToContext}
              title={ 'Load State' }
              text={ 'participants and slots' }
              onHide={() => setShowModalDataImportCheck(false)}
              onClose={() => setShowModalDataImportCheck(false)}
          />
          <StateExportSaveReviewsModal
            show={showSaveReviewsModal}
            saveState={saveState}
            onHide={() => setShowSaveReviewsModal(false)}
            onClose={() => setShowSaveReviewsModal(false)}
          />
          <ErrorModal
              show={stateImportError !== null}
              errorObject={stateImportError}
              modalHeader={'Error while importing State'}
              onHide={() => setStateImportError(null)} />
      </Navbar>
  );
}
export default CustomNavbar;
