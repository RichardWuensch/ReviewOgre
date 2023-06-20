import React from 'react';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../../assets/media/favicon_ogre.png';
import LoadConfiguration from '../../../api/LoadConfiguration';
import { useParticipants, useParticipantsDispatch } from '../context/ParticipantsContext';
import { useRoomSlots, useRoomSlotsDispatch } from '../context/RoomSlotContext';
import StoreConfiguration from '../../../api/StoreConfiguration';
import { Link } from 'react-router-dom';

function CustomNavbar () {
  const participantsDispatch = useParticipantsDispatch();
  const participants = useParticipants();
  const roomSlotsDispatch = useRoomSlotsDispatch();
  const roomSlots = useRoomSlots();

  function saveConfiguration () {
    new StoreConfiguration(participants, roomSlots, false).runFileSave();
  }

  async function importConfiguration (event) {
    deleteParticipantListFromContext(participants);
    deleteRoomSlotListFromContext(roomSlots);
    const importConf = new LoadConfiguration();
    await importConf.runConfigurationImport(event);
    addParticipantListToContext(importConf.getParticipants());
    addRoomSlotListToContext(importConf.getRoomSlots());
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

  function deleteParticipantListFromContext (list) {
    /* eslint-disable object-shorthand */
    for (const entry of list) {
      participantsDispatch({
        type: 'deleted',
        itemToDelete: entry
      });
    }
    /* eslint-enable object-shorthand */
  }

  function deleteRoomSlotListFromContext (list) {
    /* eslint-disable object-shorthand */
    for (const entry of list) {
      roomSlotsDispatch({
        type: 'deleted',
        itemToDelete: entry
      });
    }
    /* eslint-enable object-shorthand */
  }

  return (
      <Navbar expand="lg" style={{ backgroundColor: '#f5f5f5', borderBottom: 'solid rgba(0, 0, 0, 0.19) 1px' }}>
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
                          <NavDropdown.Item onClick={() => document.getElementById('file-input').click()}>Load Configuration</NavDropdown.Item>
                          <input type="file" id="file-input" style={{ display: 'none' }} onChange={importConfiguration}
                                 accept='application/json'/>
                          <NavDropdown.Item onClick={saveConfiguration}>Save Configuration</NavDropdown.Item>
                      </NavDropdown>
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  );
}
export default CustomNavbar;
