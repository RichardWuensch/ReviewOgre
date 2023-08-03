import Modal from 'react-bootstrap/Modal';
import { Form, Image } from 'react-bootstrap';
import './EditMultipleParticipantsModal.css';
import exit from '../../../../assets/media/x-circle.svg';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useParticipantsDispatch } from '../../../shared/context/ParticipantsContext';
import ModalButton from '../../../shared/buttons/modalButton/ModalButton';

function EditMultipleParticipantsModal ({ participants, onClose, ...props }) {
  const [group, setGroup] = useState('');
  const [languageLevel, setLanguageLevel] = useState('');
  const [topic, setTopic] = useState('');
  const participantDispatch = useParticipantsDispatch();

  const handleClose = () => {
    onClose();
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
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'modal'}
        >
            <Modal.Header>
                <Modal.Title>Edit Participants</Modal.Title>
                <Image src={exit} alt={'exit'} className={'modal-header-icon'} onClick={ handleClose }></Image>
            </Modal.Header>
            <Modal.Body>
                <Form style={{ padding: 10 }}>
                    <Form.Group>
                        <Form.Label>Group:</Form.Label>
                        <Form.Control
                            placeholder='Group'
                            type={'text'}
                            value={group}
                            onChange={(e) => setGroup(e.target.value)} autoFocus/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Topic:</Form.Label>
                        <Form.Control
                            placeholder={'Topic'}
                            type={'text'}
                            value={topic} onChange={(e) => setTopic(e.target.value)}/>
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
                            onButtonClick={ onSaveUpdates }
                        > Save Changes </ModalButton>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
  );
}
EditMultipleParticipantsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default EditMultipleParticipantsModal;
