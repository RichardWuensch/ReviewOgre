import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './SlotRoomModal.css';
import exit from '../../../assets/media/x-circle.svg';
import add from '../../../assets/media/plus-circle.svg';
import info from '../../../assets/media/info-circle.svg';
import React, { useEffect, useState } from 'react';
import { Accordion, Alert, Button, Card, Col, Form, FormControl, Image, Row } from 'react-bootstrap';
import RoomSlot from '../../../data/models/RoomSlot';
import Room from '../../../data/models/Room';
import { useRoomSlots } from '../../shared/context/RoomSlotContext';
import ConverterForPrinting from '../../../api/ConverterForPrinting';
import deleteButton from '../../../assets/media/trash.svg';
import CustomIconButton from '../../shared/buttons/iconButton/CustomIconButton';
import ModalButton from '../../shared/buttons/modalButton/ModalButton';
import CustomSwitch from '../../shared/buttons/switch/CustomSwitch';

function SlotModal ({ roomslot, onSaveClick, ...props }) {
  const slotId = roomslot?.getId() ?? -1;
  const [date, setDate] = useState(roomslot?.getDate() ?? new Date());
  const [startTime, setStartTime] = useState(roomslot?.getFormattedStartTime() ?? '00:00');
  const [endTime, setEndTime] = useState(roomslot?.getFormattedEndTime() ?? '00:00');
  const [invalidSlotError, setInvalidSlotError] = useState(null);
  const [errorTooltipText, setErrorTooltipText] = useState(null);
  const [isEditMode] = useState(props.edit === 'true');
  const [items, setItems] = useState(roomslot
    ?.getRooms()
    .map((room) => new Room(room.getName(), room.getBeamerNeeded())) ?? []);

  const roomSlots = useRoomSlots();

  useEffect(() => {
    // register deleted rooms
    const tempInitialItems =
      roomslot
        ?.getRooms()
        .map((room) => new Room(room.getName(), room.getBeamerNeeded())) ?? [];
    setItems(tempInitialItems);
  }, [roomslot]);

  const addItem = () => {
    setItems([...items, new Room('', false)]);
  };

  function filterDeletedRoom (rooms, roomIdToDelete) {
    return rooms.filter((room) => room.getId() !== roomIdToDelete);
  }

  const deleteItem = (roomId, event) => {
    event.preventDefault(); // Prevents the default behavior of the button
    const filteredItems = filterDeletedRoom(items, roomId);
    setItems(filteredItems);
  };

  const handleInputChange = (roomId, event) => {
    if (items.some(room => room.id === roomId)) {
      const newItems = items.map(room => {
        if (room.getId() === roomId) {
          return { ...room, name: event.target.value };
        } else {
          return room;
        }
      });
      setItems(newItems);
    }
  };

  const handleBeamerChange = (roomId) => {
    if (items.some(room => room.id === roomId)) {
      const newItems = items.map(room => {
        if (room.getId() === roomId) {
          return { ...room, beamerNeeded: !room.getBeamerNeeded() };
        } else {
          return room;
        }
      });
      setItems(newItems);
    }
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
    const rooms = [];
    items.forEach((room) => {
      rooms.push(room.getName() ? new Room(room.getName(), room.getBeamerNeeded()) : new Room('undefined', room.getBeamerNeeded()));
    });
    return new RoomSlot(
      slotId,
      date,
      parseTime(startTime),
      parseTime(endTime),
      rooms
    );
  }

  function handleSaveRoomSlot () {
    const slot = createTempRoomSlot();
    const overlappingSlots = slot.retrieveOverlappingSlots(roomSlots);
    if (overlappingSlots.length === 0) {
      props.onSaveClick(slot);
      hideModal();
      return;
    }

    setInvalidSlotError(
      `Error: The slot is overlapping with ${overlappingSlots.length} slot${
        overlappingSlots.length > 1 ? 's' : ''
      }.`
    );

    const converter = new ConverterForPrinting();
    let overlappingSlotsTooltipText = `Overlapping slots on ${converter.getDataDDmmYYYYforPrinting(
      date
    )}:`;
    overlappingSlotsTooltipText += overlappingSlots.map((slot) => {
      return `\n${slot.getFormattedStartTime()} to ${slot.getFormattedEndTime()}`;
    });

    setErrorTooltipText(overlappingSlotsTooltipText);
  }

  function hideModal () {
    if (!isEditMode) {
      setDate(new Date());
      setStartTime('00:00');
      setEndTime('00:00');
      setItems([]);
    }
    setInvalidSlotError(null);
    setErrorTooltipText(null);
    props.onHide();
  }

  function styleError () {
    if (invalidSlotError) {
      return {
        borderColor: 'red',
        borderWidth: 2
      };
    }
  }

  return (
    <Modal
      onExit={hideModal}
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={'modal'}
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
          {invalidSlotError && (
            <Alert
              variant="danger"
              data-bs-toggle="tooltip"
              title={errorTooltipText}
            >
              {invalidSlotError}

              <Image src={info} alt={'errorInfoIcon'} className='error-info-icon'/>
            </Alert>
          )}
          <Form.Group>
            <FormControl
              type={'date'}
              aria-label={'Enter Date'}
              className={'input-date-container'}
              value={date.toISOString().slice(0, 10)}
              onChange={(e) => setDate(new Date(e.target.value))}
              style={styleError()}
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
                    onChange={(e) => setStartTime(e.target.value)}
                    style={styleError()}
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
                    onChange={(e) => setEndTime(e.target.value)}
                    style={styleError()}
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
          <div style={{ marginTop: 10, maxHeight: '20vh', overflowY: 'auto' }}>
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
                    >
                      <Accordion.Header
                        className={'header-style list-item border-0'}
                      >
                        <Form.Control
                          className={'item-text'}
                          type="text"
                          value={item.getName()}
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
            onClick={addItem}
          >
            <Image src={add} alt={'addRoomIcon'} />
          </Button>
          <div className={'text-center'}>
            <ModalButton
                backgroundColor={'#B0D7AF'}
                onButtonClick={handleSaveRoomSlot}>
              <span className={'add-slot-text'}>
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
  date: PropTypes.number,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  items: PropTypes.any,
  onSaveClick: PropTypes.func.isRequired
};
export default SlotModal;
