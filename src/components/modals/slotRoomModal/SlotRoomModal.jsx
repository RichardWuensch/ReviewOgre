/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './SlotRoomModal.css';
import exit from '../../../media/x-circle.svg';
import add from '../../../media/plus-circle.svg';
import info from '../../../media/info-circle.svg';
import React, { useEffect, useRef, useState } from 'react';
import { Accordion, Alert, Button, Card, Col, Form, FormControl, Image, Row } from 'react-bootstrap';
import RoomSlot from '../../../data/models/RoomSlot';
import Room from '../../../data/models/Room';
import { useRoomSlots } from '../../shared/context/RoomSlotContext';
import ConverterForPrinting from '../../../import_export/ConverterForPrinting';
import deleteButton from '../../../media/trash.svg';
import CustomIconButton from '../../shared/buttons/iconButton/CustomIconButton';
import ModalButton from '../../shared/buttons/modalButton/ModalButton';
import CustomSwitch from '../../shared/buttons/switch/CustomSwitch';

const noErrorState = {
  overlappingSlots: null,
  endTimeAndStartTimeNotCompliant: null,
  tooltipText: null
};

function SlotModal ({ roomslot, copiedRooms, onSaveClick, onHide, ...props }) {
  const slotId = roomslot?.getId() ?? -1;
  const [date, setDate] = useState(roomslot?.getDate() ?? new Date());
  const [startTime, setStartTime] = useState(roomslot?.getFormattedStartTime() ?? '00:00');
  const [endTime, setEndTime] = useState(roomslot?.getFormattedEndTime() ?? '00:00');
  const [error, setError] = useState(noErrorState);
  const [isEditMode] = useState(props.edit === 'true');
  const [isCopyMode] = useState(props.copy === 'true');
  const [items, setItems] = useState(copiedRooms
    ?.map((roomTemp2) => new Room(roomTemp2.getName(), roomTemp2.getBeamerNeeded())) ?? roomslot
    ?.getRooms()
    .map((roomTemp1) => new Room(roomTemp1.getName(), roomTemp1.getBeamerNeeded())) ?? []);

  const roomSlots = useRoomSlots();

  useEffect(() => {
    // register deleted rooms
    const tempInitialItems =
        copiedRooms
          ?.map((roomTemp2) => new Room(roomTemp2.getName(), roomTemp2.getBeamerNeeded())) ?? roomslot
          ?.getRooms()
          .map((roomTemp1) => new Room(roomTemp1.getName(), roomTemp1.getBeamerNeeded())) ?? [];
    setItems(tempInitialItems);
  }, [roomslot, copiedRooms]);

  const [activeItem, setActiveItem] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(null);

  useEffect(() => {
    if (activeItemIndex !== null && accordionContainerRef.current) {
      const activeItem = accordionContainerRef.current.querySelector(`[data-index="${activeItemIndex}"]`);
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeItemIndex]);

  const accordionContainerRef = useRef(null);
  const [addedItemIndex, setAddedItemIndex] = useState(null);
  // const addedItemRef = useRef(null);

  const addItem = () => {
    const newItem = new Room('', false);
    setItems([...items, newItem]);
    setAddedItemIndex(items.length); // Setze den Index des hinzugefügten Elements
  };

  useEffect(() => {
    if (addedItemIndex !== null && accordionContainerRef.current) {
      const addedItem = accordionContainerRef.current.querySelector(`[data-index="${addedItemIndex}"]`);
      if (addedItem) {
        addedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [addedItemIndex]);

  /* useEffect(() => {
    if (addedItemRef.current && accordionContainerRef.current) {
      const containerRect = accordionContainerRef.current.getBoundingClientRect();
      const itemRect = addedItemRef.current.getBoundingClientRect();
      const offset = itemRect.top - containerRect.top;

      if (offset + itemRect.height > containerRect.height) {
        accordionContainerRef.current.scrollTop += offset;
      }
    }
  }, [addedItemRef.current]); */

  const [activeItemRef, setActiveItemRef] = useState(null);

  useEffect(() => {
    if (activeItemRef?.current && accordionContainerRef.current) {
      const containerRect = accordionContainerRef.current.getBoundingClientRect();
      const itemRect = activeItemRef?.current.getBoundingClientRect();
      const offset = itemRect.top - containerRect.top;

      if (offset + itemRect.height > containerRect.height) {
        accordionContainerRef.current.scrollTop += offset;
      }
    }
  }, [activeItemRef?.current]);

  function filterDeletedRoom (rooms, roomIdToDelete) {
    return rooms.filter((room) => room.getId() !== roomIdToDelete);
  }

  const deleteItem = (roomId, event) => {
    event.preventDefault(); // Prevents the default behavior of the button
    const filteredItems = filterDeletedRoom(items, roomId);
    setItems(filteredItems);
  };

  const handleInputChange = (roomId, event) => {
    const newItems = items.map(room => {
      if (room.getId() === roomId) {
        room.setName(event.target.value);
      }
      return room;
    });
    setItems(newItems);
  };

  const handleBeamerChange = (roomId) => {
    const newItems = items.map(room => {
      if (room.getId() === roomId) {
        room.setBeamerNeeded(!room.getBeamerNeeded());
      }
      return room;
    });
    setItems(newItems);
  };

  function parseTime (time) {
    const [hours, minutes] = time.split(':');
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDay(),
      parseInt(hours, 10),
      parseInt(minutes, 10)
    );
  }

  function createTempRoomSlot () {
    return new RoomSlot(
      slotId,
      date,
      parseTime(startTime),
      parseTime(endTime),
      items
    );
  }

  const saveClick = () => {
    const slot = createTempRoomSlot();
    if (!errorOccured()) {
      onSaveClick(slot);
      hideModal();
    }
  };

  function hideModal () {
    if (!isEditMode) {
      setDate(new Date());
      setStartTime('00:00');
      setEndTime('00:00');
      if (isCopyMode) {
        setItems(copiedRooms);
      } else {
        setItems([]);
      }
    } else {
      setDate(roomslot.getDate());
      setStartTime(roomslot.getFormattedStartTime());
      setEndTime(roomslot.getFormattedEndTime());
      setItems(roomslot.getRooms());
    }
    setError(noErrorState);
    onHide();
  }

  useEffect(() => {
    checkOverlappingSlots();
  }, [date, startTime, endTime]);

  function checkOverlappingSlots () {
    const slot = createTempRoomSlot();
    const overlappingSlots = slot.retrieveOverlappingSlots(roomSlots);
    if (overlappingSlots.length === 0) {
      setError({
        ...error,
        overlappingSlots: null
      });
    } else {
      const overlappingSlotError =
          `Error: The current slot is overlapping with ${overlappingSlots.length} slot${
              overlappingSlots.length > 1 ? 's' : ''
          }. `;

      const converter = new ConverterForPrinting();
      let overlappingSlotsTooltipText = `Overlapping slots on ${converter.getDataDDmmYYYYforPrinting(date)}:`;
      overlappingSlotsTooltipText += overlappingSlots.map((slot) => {
        return `\n${slot.getFormattedStartTime()} to ${slot.getFormattedEndTime()}`;
      });

      setError({
        ...error,
        overlappingSlots: {
          message: overlappingSlotError,
          tooltipText: overlappingSlotsTooltipText
        }
      });
    }
  }

  function checkAndSetDate (event) {
    if (event.target.value !== '') {
      setDate(new Date(event.target.value));
    }
  }

  function checkAndSetEndTime (event) {
    if (event.target.value < startTime) {
      setError({
        ...error,
        endTimeAndStartTimeNotCompliant: {
          message: 'Error: Endtime cannot be smaller than Starttime. ',
          tooltipText: `The entered Endtime "${event.target.value}" is smaller than the Starttime "${startTime}"`
        }
      });
    } else {
      setError({
        ...error,
        endTimeAndStartTimeNotCompliant: null
      });
    }
    setEndTime(event.target.value);
  }

  function checkAndSetStartTime (event) {
    if (event.target.value > endTime) {
      setError({
        ...error,
        endTimeAndStartTimeNotCompliant: {
          message: 'Error: Starttime cannot be greater than Endtime. ',
          tooltipText: `The entered Starttime "${event.target.value}" is smaller than the Endtime "${endTime}"`
        }
      });
    } else {
      setError({
        ...error,
        endTimeAndStartTimeNotCompliant: null
      });
    }
    setStartTime(event.target.value);
  }

  function buildGlobalTooltipText () {
    let tooltipText = null;
    if (error.overlappingSlots) {
      if (tooltipText) {
        tooltipText = `${tooltipText}\n\n${error.overlappingSlots.tooltipText}`;
      } else {
        tooltipText = error.overlappingSlots.tooltipText;
      }
    }
    if (error.endTimeAndStartTimeNotCompliant) {
      if (tooltipText) {
        tooltipText = `${tooltipText}\n\n${error.endTimeAndStartTimeNotCompliant.tooltipText}`;
      } else {
        tooltipText = error.endTimeAndStartTimeNotCompliant.tooltipText;
      }
    }

    return tooltipText;
  }

  function errorOccured () {
    return error.overlappingSlots ||
        error.endTimeAndStartTimeNotCompliant;
  }

  function styleIfError (...errors) {
    for (const error of errors) {
      if (error) {
        return {
          borderColor: 'red',
          borderWidth: 2,
          color: 'red'
        };
      }
    }
  }

  return (
      <Modal
          onExit={hideModal}
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className={'modal-slotRoomModal'}
      >
        <Modal.Header>
          <Modal.Title>{props.header}</Modal.Title>
          <Image
              src={exit}
              alt={'exitSlotModal'}
              className={'modal-header-icon'}
              onClick={hideModal}
          />
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: 5 }}>
            {errorOccured() && (
                <Alert
                    variant="danger"
                    data-bs-toggle="tooltip"
                    title={buildGlobalTooltipText()}
                >
                  {error.overlappingSlots?.message}
                  {error.endTimeAndStartTimeNotCompliant?.message}
                  <Image src={info} alt={'errorInfoIcon'} className='error-info-icon'/>
                </Alert>
            )}
            <Form.Group>
              <FormControl
                  type={'date'}
                  aria-label={'Enter Date'}
                  className={'input-date-container'}
                  value={date.toISOString().slice(0, 10)}
                  onChange={(e) => checkAndSetDate(e)}
                  style={styleIfError(false, error.overlappingSlots)}
              />
            </Form.Group>
            <Row style={{ paddingBottom: 20, paddingTop: 20 }}>
              <Form.Group as={Col} xs={6}>
                <Row style={{ alignContent: 'center' }}>
                  <Col xs={4}>
                    <Form.Label>From:</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                        className={'input-time-container'}
                        aria-label={'Enter start time'}
                        type={'time'}
                        value={startTime}
                        onChange={(e) => checkAndSetStartTime(e)}
                        style={styleIfError(false, error.overlappingSlots, error.endTimeAndStartTimeNotCompliant)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group as={Col} xs={6}>
                <Row style={{ alignContent: 'center' }}>
                  <Col xs={4}>
                    <Form.Label>To:</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                        className={'input-time-container'}
                        aria-label={'enter end time'}
                        type={'time'}
                        value={endTime}
                        onChange={(e) => checkAndSetEndTime(e)}
                        style={styleIfError(false, error.overlappingSlots, error.endTimeAndStartTimeNotCompliant)}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>
            <span>
            {isEditMode
              ? 'Edit or Add Rooms to this Slot:'
              : 'Create Rooms for this Time Slot:'}
          </span>
          <div ref={accordionContainerRef} style={{ marginTop: 10, maxHeight: '50vh', overflowY: 'auto' }}>
            <Accordion
              defaultActiveKey="0"
              style={{ backgroundColor: '#F5F5F5' }}
            >
              <ul className={'list-style'}>
                {items?.map((item, index) => (
                  <li key={item.getId()} style={{ marginBottom: '1%' }}>
                    <Accordion.Item
                      style={{ background: '#F5F5F5' }}
                      eventKey={item.getId()}
                      data-index={index}
                      ref={activeItem === item.getId() ? setActiveItemRef : null}
                    >
                      <Accordion.Header
                        className={'header-style list-item border-0'}
                        onClick={() => setActiveItem(item.getId())}
                      >
                        <Form.Control
                          className={'item-text'}
                          type="text"
                          defaultValue={item.getName()} // Hier den defaultValue-Prop verwenden
                          placeholder={'Room'}
                          onChange={(event) => handleInputChange(item.getId(), event)}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: 'none',
                            boxShadow: 'none'
                          }}
                        />
                        <div className={'options-delete'}>
                          <CustomIconButton as="div" toolTip={'Delete this room'} onButtonClick={(event) => deleteItem(item.getId(), event)}>
                            <Image src={deleteButton} alt={'icon'} />
                          </CustomIconButton>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Card.Body>
                          <div className={'beamer-properties'}>
                            <CustomSwitch
                                onSwitchClick={() => handleBeamerChange(item.getId())}
                                isChecked={item.getBeamerNeeded()}>
                              <span style={{ paddingLeft: 5 }}> Beamer needed </span>
                            </CustomSwitch>
                          </div>
                        </Card.Body>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>
                ))}
              </ul>
            </Accordion>
          </div>
          <Button
            variant={'light'}
            type={'button'}
            className={'add-room-button'}
            onClick={addItem}>
            <Image src={add} alt={'addRoomIcon'} />
          </Button>
          <div className={'text-center'}>
            <ModalButton
                backgroundColor={errorOccured() ? '#bbbbbb' : '#B0D7AF'}
                onButtonClick={saveClick}>
              <span className={'add-slot-text e2e-location-add-slot-button'}>
                {isEditMode ? 'Save Changes' : 'Add Slot'}
              </span>
              </ModalButton>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
  );
}
SlotModal.propTypes = {
  eventKey: PropTypes.string,
  onHide: PropTypes.any,
  id: PropTypes.number,
  header: PropTypes.string,
  edit: PropTypes.string,
  copy: PropTypes.string,
  date: PropTypes.number,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  onSaveClick: PropTypes.func.isRequired
};
export default SlotModal;
