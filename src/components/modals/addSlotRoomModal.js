import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './SlotModal.css';
import exit from '../../assets/media/x-circle.svg';
import add from '../../assets/media/plus-circle.svg';
import chevronDown from '../../assets/media/chevron-down.svg';
import chevronUp from '../../assets/media/chevron-up.svg';
import React, { useState } from 'react';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';

function ToggleRoom ({ eventKey }) {
  const [open, setOpen] = useState(false);
  const openAccordion = useAccordionButton(eventKey, () =>
    console.log('totally custom!')
  );

  const expandAndToggle = () => {
    openAccordion(undefined);
    setOpen(prevOpen => prevOpen !== true);
  };

  return (
        <button
            type="button"
            onClick={expandAndToggle}
            className={'expand-chevron-button'}
        >
            {open
              ? (
                <img src={chevronUp} alt={'chevron up'} />
                )
              : (
                <img src={chevronDown} alt={'chevron down'} />
                )}
        </button>
  );
}
ToggleRoom.propTypes = {
  eventKey: PropTypes.string.isRequired
};

function SlotModal (props) {
  const [showModal, setShowModal] = useState(true);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { text: '', beamer: false }]);
  };

  const handleInputChange = (index, event) => {
    const newItems = [...items];
    newItems[index].text = event.target.value;
    setItems(newItems);
  };
  const handleBeamerChange = (index, event) => {
    const newItems = [...items];
    newItems[index].beamer = event.target.value;
    setItems(newItems);
  };

  const handleClose = () => {
    setShowModal(false);
    setDate('');
    setStartTime('');
    setEndTime('');
    setItems([]);
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
                        <span className={'modal-header'}>New Time Slot</span>
                        <img src={exit} alt={'exitSlotModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onHide}/>
                    </div>
                    <div className={'date-container '}>
                        <input type={'date'} className={'input-date-container'} value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className={'time-container'}>
                        <span>From:</span>
                        <input className={'input-time-container'} type={'time'} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        <span>To:</span>
                        <input className={'input-time-container'} type={'time'} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                    <div className={'room-container'}>
                        <span>Create Rooms for this Time Slot:</span>
                        <div>
                            <div>
                                <Accordion defaultActiveKey="0">
                                <ul className={'list-style'}>
                                    {items.map((item, index) => (
                                            <li key={index}>
                                                <Card>
                                                    <Card.Header className={'list-item'}>
                                                            <input className={'item-text'} type="text" value={item.text} placeholder={'Room'} onChange={(event) => handleInputChange(index, event)} style={{ backgroundColor: '#F5F5F5' }} />
                                                            <ToggleRoom eventKey={index} ></ToggleRoom>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey={index}>
                                                        <Card.Body>
                                                            <div className={'beamer-properties'}>
                                                                <label className={'switch'}>
                                                                    <input type="checkbox" value={item.beamer} onClick={(event) => handleBeamerChange(index, event)}/>
                                                                    <span className={'slider round'}></span>
                                                                </label>
                                                                <span style={{ paddingLeft: 5 }}>Beamer</span>
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
                                <img src={add} alt={'addRoomIcon'}/>
                            </button>
                        </div>
                    </div>
                    <div className={'footer'}>
                        <button className={'add-slot-button'}>
                            <span className={'add-slot-text'}>Add Slot</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
SlotModal.propTypes = {
  eventKey: PropTypes.string.isRequired,
  onHide: PropTypes.string
};
export default SlotModal;
