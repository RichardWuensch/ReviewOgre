import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './addParticipantModal.css';
import exit from '../../assets/media/x-circle.svg';
import React, { useState } from 'react';

function ParticipantModal (props) {
  const [showModal, setShowModal] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [group, setGroup] = useState('');
  const [englishSkillLevel, setEnglishSkillLevel] = useState('Native Speaker');

  const handleClose = () => {
    setShowModal(false);
    setFirstName('');
    setLastName('');
    setEmailAddress('');
    setGroup('');
    setEnglishSkillLevel('Native Speaker');
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
                        <span className={'modal-header border-0'}>Add New Participant</span>
                        <img src={exit} alt={'exitParticipantModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onHide}/>
                    </div>
                    <div className={'attributes-container'}>
                        <span>First Name:</span>
                        <input className={'input-attributes-container'} type={'text'} value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                        <span>Last Name:</span>
                        <input className={'input-attributes-container'} type={'text'} value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                        <span>Email Address:</span>
                        <input className={'input-attributes-container'} type={'text'} value={emailAddress} placeholder="Email Address" onChange={(e) => setEmailAddress(e.target.value)} />
                        <span>Group:</span>
                        <input className={'input-attributes-container'} type={'text'} value={group} placeholder="Group" onChange={(e) => setGroup(e.target.value)} />
                        <span>English Skill Level:</span>
                        <form action="#">
                            <select className={'dropdown-attributes-container'} value={englishSkillLevel} onChange={(e) => setEnglishSkillLevel(e.target.value)}>
                                <option className={'dropdown-attributes-container-text'} value="A1">A1</option>
                                <option className={'dropdown-attributes-container-text'} value="A2">A2</option>
                                <option className={'dropdown-attributes-container-text'} value="B1">B1</option>
                                <option className={'dropdown-attributes-container-text'} value="B2">B2</option>
                                <option className={'dropdown-attributes-container-text'} value="C1">C1</option>
                                <option className={'dropdown-attributes-container-text'} value="C2">C2</option>
                                <option className={'dropdown-attributes-container-text'} value="Native Speaker">Native Speaker</option>
                            </select>
                        </form>
                    </div>
                    <div className={'footer'}>
                        <button className={'add-participant-button'}>
                            <span className={'add-participant-text'}>Add Participant</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
ParticipantModal.propTypes = {
  eventKey: PropTypes.string.isRequired,
  onHide: PropTypes.string
};
export default ParticipantModal;
