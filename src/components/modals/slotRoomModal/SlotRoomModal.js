import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './SlotRoomModal.css';
import exit from '../../../assets/media/x-circle.svg';
import add from '../../../assets/media/plus-circle.svg';
import chevronDown from '../../../assets/media/chevron-down.svg';
import chevronUp from '../../../assets/media/chevron-up.svg';
import React, { useContext, useState } from 'react';
import { Accordion, AccordionContext, Card, Image, useAccordionButton } from 'react-bootstrap';
import RoomSlot from '../../../data/model/RoomSlot';
import Room from '../../../data/model/Room';
import { useRoomSlotsDispatch } from '../../window/context/RoomSlotContext';

function ToggleRoom ({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);
  const openAccordion = useAccordionButton(eventKey, () =>
    callback && callback(eventKey)
  );

  const expandAndToggle = () => {
    openAccordion(undefined);
  };
  const isCurrentEventKey = activeEventKey === eventKey;

  return (
        <button
            type="button"
            onClick={expandAndToggle}
            className={'expand-chevron-button'}
        >
            {isCurrentEventKey
              ? (
                <Image src={chevronUp} alt={'chevron up'} />
                )
              : (
                <Image src={chevronDown} alt={'chevron down'} />
                )}
            {children}
        </button>
  );
}
ToggleRoom.propTypes = {
  eventKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  callback: PropTypes.func.isRequired
};

function SlotModal (props) {
  const [showModal, setShowModal] = useState(true);
  const slotId = useState(props.id || 0);
  const [date, setDate] = useState(props.date || new Date());
  const [startTime, setStartTime] = useState(props.starttime || '00:00');
  const [endTime, setEndTime] = useState(props.endtime || '00:00');
  const [items, setItems] = useState(props.items || []);
  const [header] = useState(props.header);
  const [isEdit] = useState(props.edit || false);

  const dispatch = useRoomSlotsDispatch();

  const addItem = () => {
    setItems([...items, new Room('', false)]);
  };

  const handleInputChange = (index, event) => {
    const newItems = [...items];
    newItems[index].setName(event.target.value);
    setItems(newItems);
  };
  const handleBeamerChange = (index) => {
    const newItems = [...items];
    newItems[index].setHasBeamer(!newItems[index].hasBeamer());
    setItems(newItems);
  };

  const handleClose = () => {
    if (!isEdit) {
      setShowModal(false);
      setDate(new Date());
      setStartTime('00:00');
      setEndTime('00:00');
      setItems([]);
    }
  };

  function parseTime (time) {
    const [hours, minutes] = time.split(':');
    const dateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDay(),
      parseInt(hours, 10),
      parseInt(minutes, 10));
    return dateTime;
  }

  function createTempRoomSlot () {
    const rooms = [];
    items.forEach(room => { rooms.push(new Room(room.getName(), room.hasBeamer())); });
    return new RoomSlot(slotId, date, parseTime(startTime), parseTime(endTime), rooms);
  }

  const addSlot = () => {
    const tempRoomSlot = createTempRoomSlot();

    /* eslint-disable object-shorthand */
    dispatch({
      type: 'added',
      newRoomSlot: tempRoomSlot
    });

    /* eslint-enable object-shorthand */
    setShowModal(false);
  };

  const saveEdit = () => {
    const tempRoomSlot = createTempRoomSlot();

    /* eslint-disable object-shorthand */
    dispatch({
      type: 'changed',
      updatedRoomSlot: tempRoomSlot
    });

    /* eslint-enable object-shorthand */
    setShowModal(false);
  };

  return (
        <Modal
            onExit={handleClose}
            show={showModal}
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className={'modal-container'}>
                    <div className={'modal-header-container'}>
                        <span className={'modal-header border-0'}>{header}</span>
                        <img src={exit} alt={'exitSlotModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onHide}/>
                    </div>
                    <div className={'date-container'}>
                        <input type={'date'} className={'input-date-container'} value={date ? new Date(date).toISOString().slice(0, 10) : ''} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className={'time-container'}>
                        <span className={'time-text'}>From:</span>
                        <input className={'input-time-container'} type={'time'} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        <span className={'time-text'}>To:</span>
                        <input className={'input-time-container'} type={'time'} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                    <div className={'room-container'}>
                        {isEdit ? (<span style={ { marginBottom: 2 } } >Edit or Add Rooms to this Slot:</span>) : (<span style={ { marginBottom: 2 } } >Create Rooms for this Time Slot:</span>)}
                        <div>
                            <div>
                                <Accordion defaultActiveKey="0">
                                <ul className={'list-style'}>
                                    {items?.map((item, index) => (
                                            <li key={index}>
                                                <Card>
                                                    <Card.Header className={'list-item border-0'}>
                                                            <input className={'item-text'} type="text" value={item.getName()} placeholder={'Room'} onChange={(event) => handleInputChange(index, event)} style={{ backgroundColor: '#F5F5F5' }} />
                                                            <ToggleRoom eventKey={index}></ToggleRoom>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey={index}>
                                                        <Card.Body>
                                                            <div className={'beamer-properties'}>
                                                                <label className={'switch'}>
                                                                    <input type="checkbox" checked={item.hasBeamer()} onChange={(event) => handleBeamerChange(index)}/>
                                                                    <span className={'slider round'}></span>
                                                                </label>
                                                                <span style={{ paddingLeft: 5 }}>Beamer needed</span>
                                                            </div>
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </li>
                                    ))}
                                </ul>
                                </Accordion>
                            </div>
                            <button className={'add-room-button'} onClick={addItem}>
                                <Image src={add} alt={'addRoomIcon'}/>
                            </button>
                        </div>
                    </div>
                    <div className={'footer'}>
                        {isEdit
                          ? (
                        <button className={'add-slot-button'} onClick={() => {
                          saveEdit();
                          props.onHide();
                        }}>
                            <span className={'add-slot-text'}>Save Changes</span>
                        </button>)
                          : (
                        <button className={'add-slot-button'} onClick={() => {
                          addSlot();
                          props.onHide();
                        }}>
                            <span className={'add-slot-text'}>Add Slot</span>
                        </button>)}
                    </div>
                </div>
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
