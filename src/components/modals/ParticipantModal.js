import './ParticipantModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../assets/media/x-circle.svg';
import { useState } from 'react';
import Participant from '../../data/model/Participant';
import PropTypes from 'prop-types';

function ParticipantModal (props, onClose) {
  const [firstName, setFirstName] = useState(props.firstname);
  const [lastName, setLastName] = useState(props.lastname);
  const [email, setEmail] = useState(props.email);
  const [group, setGroup] = useState(props.group);
  const [topic, setTopic] = useState(props.topic);
  const [languageLevel, setLanguageLevel] = useState(props.languagelevel);
  const [showModal, setShowModal] = useState(true);
  const [newParticipant] = useState(props.newparticipant);
  const [id] = useState(props.id);
  const [saveData, setSaveData] = useState(false);

  const participantstore = props.participantstore;

  const handleClose = () => {
    // TODO: must be set to true if the user clicks the save button else false
    setSaveData(true);

    if (saveData) {
      const participant = new Participant(firstName, lastName, email, group, topic, languageLevel);

      // check if participant needs to be added or updated
      if (newParticipant) {
        participantstore.put(participant);
        console.log(participant.getFirstName());
      } else {
        console.log(participantstore.getById(id).getFirstName());
        participant.setId(id);
        participantstore.update(id, participant);
        console.log(participantstore.getById(id).getFirstName());
      }
    }
    setShowModal(false);
    setSaveData(true);
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
                        <span className={'modal-header border-0'}>{newParticipant ? 'Add New Participant' : 'Edit Participant'}</span>
                        <img src={exit} alt={'exitParticipantModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onClose}/>
                    </div>
                    <div className={'attributes-container'}>
                        <span>First Name:{firstName}</span>
                        <input className={'input-attributes-container'} type={'text'} value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                        <span>Last Name:{lastName}</span>
                        <input className={'input-attributes-container'} type={'text'} value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                        <span>Email:</span>
                        <input className={'input-attributes-container'} type={'text'} value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <span>Group:</span>
                        <input className={'input-attributes-container'} type={'text'} value={group} placeholder="Group" onChange={(e) => setGroup(e.target.value)} />
                        <span>Topic:</span>
                        <input className={'input-attributes-container'} type={'text'} value={topic} placeholder="Topic" onChange={(e) => setTopic(e.target.value)} />
                        <span>German Skill Level:</span>
                        <form action="#">
                            <select className={'dropdown-attributes-container'} value={languageLevel} onChange={(e) => setLanguageLevel(e.target.value)}>
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
                        <button className={'add-participant-button'} onClick={() => {
                          handleClose();
                          props.onClose();
                        }}>
                            <span className={'add-participant-text'}>{newParticipant ? 'Add Participant' : 'Save Changes'}</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
ParticipantModal.propTypes = {
  onClose: PropTypes.func,
  id: PropTypes.number,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  group: PropTypes.string,
  topic: PropTypes.string,
  languagelevel: PropTypes.string,
  newparticipant: PropTypes.bool,
  participantstore: PropTypes.any
};
export default ParticipantModal;
