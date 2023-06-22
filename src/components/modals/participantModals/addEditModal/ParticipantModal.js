import Modal from 'react-bootstrap/Modal';
import { Form, Image } from 'react-bootstrap';
import './ParticipantModal.css';
import exit from '../../../../assets/media/x-circle.svg';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Participant from '../../../../data/models/Participant';
import ModalButton from '../../../shared/buttons/modalButton/ModalButton';

function ParticipantModal ({ participant, onClose, onSaveClick, newParticipant, ...props }) {
  const [firstName, setFirstName] = useState(participant?.getFirstName() ?? '');
  const [lastName, setLastName] = useState(participant?.getLastName() ?? '');
  const [email, setEmail] = useState(participant?.getEmail() ?? '');
  const [group, setGroup] = useState(participant?.getGroup() ?? '0');
  const [topic, setTopic] = useState(participant?.getTopic() ?? '');
  const [languageLevel, setLanguageLevel] = useState(participant?.getLanguageLevel() ?? 'Native Speaker');
  const [id] = useState(participant?.getId() ?? -1);

  const handleClose = () => {
    if (newParticipant) clearData();
    onClose();
  };

  const clearData = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setEmail('');
    setTopic('');
    setGroup('0');
  };

  const saveClick = () => {
    const participantTemp = new Participant(id, firstName, lastName, email, group, topic, languageLevel);
    onSaveClick(participantTemp);
    handleClose();
  };

  return (
        <Modal
            onExit={handleClose}
            size="sm"
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'modal'}
        >
            <Modal.Header>
                <Modal.Title>{newParticipant ? 'Add new Participant' : 'Edit Participant'}</Modal.Title>
                <Image src={exit} onClick={handleClose} alt={'exit'} className={'modal-header-icon'} />
            </Modal.Header>
            <Modal.Body>
                <Form style={{ padding: 10 }}>
                    <Form.Group>
                        <Form.Label>First name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} autoFocus/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Group:</Form.Label>
                        <Form.Control
                            type={'text'}
                            value={group}
                            placeholder='Group'
                            onChange={(e) => setGroup(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Topic:</Form.Label>
                        <Form.Control
                            type={'text'}
                            value={topic}
                            placeholder='Topic'
                            onChange={(e) => setTopic(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>German Skill Level:</Form.Label>
                        <Form.Select
                            placeholder={'Native Speaker'}
                            value={languageLevel}
                            onChange={(e) => setLanguageLevel(e.target.value)}>
                            <option value={'A1'}>A1</option>
                            <option value={'A2'}>A2</option>
                            <option value={'B1'}>B1</option>
                            <option value={'B2'}>B2</option>
                            <option value={'C1'}>C1</option>
                            <option value={'C2'}>C2</option>
                            <option value={'Native Speaker'}>Native Speaker</option>
                        </Form.Select>
                    </Form.Group>
                    <div className={'text-center'}>
                        <ModalButton
                            backgroundColor={'#B0D7AF'}
                            onButtonClick={saveClick}
                        > {newParticipant ? 'Add Participant' : 'Save Changes'} </ModalButton>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
  );
}
ParticipantModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  participant: PropTypes.object,
  newParticipant: PropTypes.bool.isRequired,
  onSaveClick: PropTypes.func.isRequired
};

export default ParticipantModal;
