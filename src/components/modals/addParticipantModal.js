import './addParticipantModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../assets/media/x-circle.svg';
import { useState } from 'react';

function addParticipantModal (props, onClose, onSave, onHide, list) {
  const [firstNameAttr, setFirstNameAttr] = useState(props.list[0]);
  const [lastNameAttr, setLastNameAttr] = useState(props.list[1]);
  const [emailAttr, setEmailAttr] = useState(props.list[2]);
  const [groupAttr, setGroupAttr] = useState(props.list[3]);
  const [topicAttr, setTopicAttr] = useState(props.list[4]);
  const [languageLevelAttr, setLanguageLevelAttr] = useState(props.list[5]);
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
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
                        <span className={'modal-header border-0'}>Add New Participant</span>
                        <img src={exit} alt={'exitParticipantModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onHide}/>
                    </div>
                    <div className={'attributes-container'}>
                        <span>First Name:{firstNameAttr}</span>
                        <input className={'input-attributes-container'} type={'text'} value={firstNameAttr} placeholder="First Name" onChange={(e) => setFirstNameAttr(e.target.value)} />
                        <span>Last Name:{lastNameAttr}</span>
                        <input className={'input-attributes-container'} type={'text'} value={lastNameAttr} placeholder="Last Name" onChange={(e) => setLastNameAttr(e.target.value)} />
                        <span>Email:</span>
                        <input className={'input-attributes-container'} type={'text'} value={emailAttr} placeholder="Email" onChange={(e) => setEmailAttr(e.target.value)} />
                        <span>Group:</span>
                        <input className={'input-attributes-container'} type={'text'} value={groupAttr} placeholder="Group" onChange={(e) => setGroupAttr(e.target.value)} />
                        <span>Topic:</span>
                        <input className={'input-attributes-container'} type={'text'} value={topicAttr} placeholder="Topic" onChange={(e) => setTopicAttr(e.target.value)} />
                        <span>German Skill Level:</span>
                        <form action="#">
                            <select className={'dropdown-attributes-container'} value={languageLevelAttr} onChange={(e) => setLanguageLevelAttr(e.target.value)}>
                                <option className={'dropdown-attributes-container-text'} value="Native Speaker">Native Speaker</option>
                                <option className={'dropdown-attributes-container-text'} value="A1">A1</option>
                                <option className={'dropdown-attributes-container-text'} value="A2">A2</option>
                                <option className={'dropdown-attributes-container-text'} value="B1">B1</option>
                                <option className={'dropdown-attributes-container-text'} value="B2">B2</option>
                                <option className={'dropdown-attributes-container-text'} value="C1">C1</option>
                                <option className={'dropdown-attributes-container-text'} value="C2">C2</option>
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
export default addParticipantModal;
