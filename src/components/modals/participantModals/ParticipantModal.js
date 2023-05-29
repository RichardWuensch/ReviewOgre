import './ParticipantModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../../assets/media/x-circle.svg';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useParticipantsDispatch } from '../../window/ParticipantsContext';
import Participant from '../../../data/model/Participant';

let nextId = 1;

function ParticipantModal (props) {
  const [firstName, setFirstName] = useState(props.firstname || '');
  const [lastName, setLastName] = useState(props.lastname || '');
  const [email, setEmail] = useState(props.email || '');
  const [group, setGroup] = useState(props.group || '0');
  const [topic, setTopic] = useState(props.topic || '');
  const [languageLevel, setLanguageLevel] = useState(props.languagelevel || 'Native Speaker');
  const [showModal, setShowModal] = useState(true);
  const [newParticipant] = useState(props.newparticipant || false);
  const [id, setId] = useState(props.id || nextId);
  const dispatch = useParticipantsDispatch();

  const handleClose = () => {
    setShowModal(false);
    props.onClose();
  };

  const clearData = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setEmail('');
    setTopic('');
    setGroup('0');
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
                        <img src={exit} alt={'exitParticipantModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={handleClose}/>
                    </div>
                    <div className={'attributes-container'}>
                        <span>First Name:</span>
                        <input className={'input-attributes-container'} type={'text'} value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                        <span>Last Name:</span>
                        <input className={'input-attributes-container'} type={'text'} value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                        <span>Email:</span>
                        <input className={'input-attributes-container'} type={'text'} value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <span>Group:</span>
                        <input className={'input-attributes-container'} type={'text'} value={group} placeholder="Group" onChange={(e) => setGroup(e.target.value)} />
                        <span>Topic:</span>
                        <input className={'input-attributes-container'} type={'text'} value={topic} placeholder="Topic" onChange={(e) => setTopic(e.target.value)} />
                        <span>German Skill Level:</span>
                        <form action="src/components/modals/participantModals/ParticipantModal#">
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
                          /* eslint-disable object-shorthand */
                          if (newParticipant) {
                            // create a new participant
                            setId(++nextId);
                            const participantTemp = new Participant(id, firstName, lastName, email, group, topic, languageLevel);
                            dispatch({
                              type: 'added',
                              newParticipant: participantTemp
                            });
                            clearData();
                          } else {
                            // update an existing participant
                            console.log('Update Participant with id :' + id);
                            const participantTemp = new Participant(id, firstName, lastName, email, group, topic, languageLevel);
                            dispatch({
                              type: 'changed',
                              updatedParticipant: participantTemp
                            });
                          }
                          /* eslint-enable object-shorthand */
                          handleClose();
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
  languageLevel: PropTypes.string,
  newParticipant: PropTypes.bool
};
export default ParticipantModal;
