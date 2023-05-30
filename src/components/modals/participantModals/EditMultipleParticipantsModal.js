import Modal from 'react-bootstrap/Modal';
import exit from '../../../assets/media/x-circle.svg';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useParticipantsDispatch } from '../../window/ParticipantsContext';
import { Button, Form, Image } from 'react-bootstrap';
import './EditMultipleParticipantsModal.css';

function EditMultipleParticipantsModal (props) {
  const [showModal, setShowModal] = useState(true);
  const [group, setGroup] = useState('');
  const [languageLevel, setLanguageLevel] = useState('');
  const [topic, setTopic] = useState('');
  const participants = props.participants;
  const participantDispatch = useParticipantsDispatch();

  const handleClose = () => {
    setShowModal(false);
    props.onClose();
  };

  const onSaveUpdates = () => {
    participants.forEach(participant => {
      if (group !== '') participant.setGroup(group);
      if (topic !== '') participant.setTopic(topic);
      if (languageLevel !== '') participant.setLanguageLevel(languageLevel);

      participantDispatch({
        type: 'changed',
        updatedParticipant: participant
      });
    });

    handleClose();
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
            <Modal.Header>
                <Modal.Title>Edit Participants</Modal.Title>
                <Image src={exit} alt={'exit'} className={'modal-header-icon'} onClick={ handleClose }></Image>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Group:</Form.Label>
                        <Form.Control placeholder='Group' type={'text'} value={group} onChange={(e) => setGroup(e.target.value)} autoFocus></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Topic:</Form.Label>
                        <Form.Control placeholder={'Topic'} type={'text'} value={topic} onChange={(e) => setTopic(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>German Skill Level:</Form.Label>
                        <Form.Select placeholder={'Native Speaker'} value={languageLevel} onChange={(e) => setLanguageLevel(e.target.value)}>
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
                        <Button onClick={ onSaveUpdates } className={'save-button'}>Save Changes</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
  );
}
EditMultipleParticipantsModal.propTypes = {
  onClose: PropTypes.func,
  group: PropTypes.string,
  topic: PropTypes.string,
  languageLevel: PropTypes.string
};
export default EditMultipleParticipantsModal;
