import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './SlotRoomModal.css';
import exit from '../../../assets/media/x-circle.svg';
import add from '../../../assets/media/plus-circle.svg';
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  Alert,
  Button,
  Card,
  Col,
  Form,
  FormControl,
  Image,
  Row
} from 'react-bootstrap';
import RoomSlot from '../../../data/model/RoomSlot';
import Room from '../../../data/model/Room';
import { useRoomSlots } from '../../window/context/RoomSlotContext';
import ConverterForPrinting from '../../../api/ConverterForPrinting';
import deleteButton from '../../../assets/media/trash.svg';

function SlotModal ({ roomslot, ...props }) {
  const slotId = roomslot?.getId() ?? -1;
  const [date, setDate] = useState(roomslot?.getDate() ?? new Date());
  const [startTime, setStartTime] = useState(
    roomslot?.getFormattedStartTime() ?? '00:00'
  );
  const [endTime, setEndTime] = useState(
    roomslot?.getFormattedEndTime() ?? '00:00'
  );
  const [invalidSlotError, setInvalidSlotError] = useState(null);
  const [errorTooltipText, setErrorTooltipText] = useState(null);
  const [items, setItems] = useState([]);
  const [isEditMode] = useState(props.edit || false);

  const roomSlots = useRoomSlots();

  useEffect(() => {
    // register deleted rooms
    const initialItems =
      roomslot
        ?.getRooms()
        .map((room) => new Room(room.getName(), room.hasBeamer())) ?? [];
    setItems(initialItems);
  }, [roomslot]);

  const addItem = () => {
    setItems([...items, new Room('', false)]);
  };

  const deleteItem = (room, event) => {
    event.stopPropagation();
    const newItems = items.filter(tempItem => tempItem.getId() !== room.getId());
    setItems(newItems);
  };

  const handleInputChange = (index, event) => {
    const newItems = [...items];
    console.log(event.target.value);
    newItems[index].setName(event.target.value);
    setItems(newItems);
  };
  const handleBeamerChange = (index) => {
    const newItems = [...items];
    newItems[index].setHasBeamer(!newItems[index].hasBeamer());
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
    const rooms = [];
    items.forEach((room) => {
      rooms.push(room.getName() ? new Room(room.getName(), room.hasBeamer()) : new Room('undefined', room.hasBeamer()));
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
            <Form.Group as={Col}>
              <Row>
                <Col sm={3}>
                  <Form.Label>From:</Form.Label>
                </Col>
                <Col sm={5}>
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
            <Form.Group as={Col}>
              <Row>
                <Col sm={3}>
                  <Form.Label>To:</Form.Label>
                </Col>
                <Col sm={5}>
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
                  <li key={index} style={{ marginBottom: '1%' }}>
                    <Accordion.Item
                      style={{ background: '#F5F5F5' }}
                      eventKey={index}
                    >
                      <Accordion.Header
                        className={'header-style list-item border-0'}
                      >
                        <Form.Control
                          className={'item-text'}
                          type="text"
                          value={item.getName()}
                          placeholder={'Room'}
                          onChange={(event) => handleInputChange(index, event)}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: 'none',
                            boxShadow: 'none'
                          }}
                        />
                        <div className={'options-delete'}>
                            <Button
                              variant={'link'}
                              role={'submit'}
                              type={'button'}
                              className={'button-options-delete'}
                              onClick={(event) => { deleteItem(item, event); }}
                            >
                              <Image src={deleteButton} alt={'icon'} />
                            </Button>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Card.Body>
                          <div className={'beamer-properties'}>
                            <label className={'switch'}>
                              <input
                                type="checkbox"
                                checked={item.hasBeamer()}
                                onChange={(event) => handleBeamerChange(index)}
                              />
                              <span className={'slider round'}></span>
                            </label>
                            <span style={{ paddingLeft: 5 }}>
                              Beamer needed
                            </span>
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
            <Button
              variant={'light'}
              className={'add-slot-button'}
              onClick={handleSaveRoomSlot}
            >
              <span className={'add-slot-text'}>
                {isEditMode ? 'Save Changes' : 'Add Slot'}
              </span>
            </Button>
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
  edit: PropTypes.bool,
  date: PropTypes.number,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  items: PropTypes.any
};
export default SlotModal;
