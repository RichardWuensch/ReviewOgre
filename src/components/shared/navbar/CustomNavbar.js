import React from 'react';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../../assets/media/favicon_ogre.png';
import { useParticipants, useParticipantsDispatch } from '../context/ParticipantsContext';
import { useRoomSlots, useRoomSlotsDispatch } from '../context/RoomSlotContext';
import { Link } from 'react-router-dom';
import DataImportCheckModal from '../../modals/dataImportCheckModal/DataImportCheckModal';
import LoadState from '../../../api/LoadState';
import StoreState from '../../../api/StoreState';
import StateExportSaveReviewsModal from '../../modals/stateExportSaveReviewsModal/StateExportSaveReviewsModal';

function CustomNavbar () {
  const participantsDispatch = useParticipantsDispatch();
  const participants = useParticipants();
  const roomSlotsDispatch = useRoomSlotsDispatch();
  const roomSlots = useRoomSlots();
  const [showModalDataImportCheck, setShowModalDataImportCheck] = React.useState(false);
  const [overwriteExistingDataEvent, setOverwriteExistingDataEvent] = React.useState(null);
  const [showSaveReviewsModal, setShowSaveReviewsModal] = React.useState(false);

  // TODO: use correct settings from MainPage OR use dispatch for settings
  let settings = {
    authorIsNotary: false,
    breakForModeratorAndReviewer: false,
    abReview: false,
    internationalGroups: false
  };

  async function importDataCheck (event) {
    setOverwriteExistingDataEvent(event);
    setShowModalDataImportCheck(true);
  }

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

  async function loadState () {
    const loadState = new LoadState();
    await loadState.runStateImport(overwriteExistingDataEvent);
    addRoomSlotListToContext(loadState.getRoomSlots());
    addParticipantListToContext(loadState.getParticipants());

    // TODO: set correct settings from MainPage OR update dispatch for settings
    settings = loadState.getSettings();
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

  return (
      <Navbar className={'fixed-top'} expand="lg" style={{ backgroundColor: '#f5f5f5', borderBottom: 'solid rgba(0, 0, 0, 0.19) 1px' }}>
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
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link as={ Link } to="/">Home</Nav.Link>
                      <Nav.Link as={ Link } to="/reviews">Reviews</Nav.Link>
                      <Nav.Link as={ Link } to="/docs">Docs</Nav.Link>
                      <NavDropdown title="Save/Load Options" id="basic-nav-dropdown">
                          <NavDropdown.Item onClick={() => document.getElementById('file-input-config').click()}>Load State</NavDropdown.Item>
                          <input type="file"
                                 id="file-input-config"
                                 style={{ display: 'none' }}
                                 onChange={() => { importDataCheck(event); }}
                                 accept='application/json'/>
                          <NavDropdown.Item onClick={checkForAssignedReviews}>Save State</NavDropdown.Item>
                      </NavDropdown>
                  </Nav>
              </Navbar.Collapse>
          </Container>
          <DataImportCheckModal
              show={showModalDataImportCheck}
              onOverwriteData={() => {
                deleteAllParticipantsFromContext();
                deleteAllRoomSlotsFromContext();
                loadState();
              }}
              onAddData={loadState}
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
      </Navbar>
  );
}
export default CustomNavbar;
