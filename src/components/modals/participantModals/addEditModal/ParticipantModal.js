import './ParticipantModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../../../assets/media/x-circle.svg';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useParticipantsDispatch } from '../../../window/context/ParticipantsContext';
import Participant from '../../../../data/model/Participant';
import { Button, Form, Image } from 'react-bootstrap';

function ParticipantModal (props) {
  const [firstName, setFirstName] = useState(props.firstname || '');
  const [lastName, setLastName] = useState(props.lastname || '');
  const [email, setEmail] = useState(props.email || '');
  const [group, setGroup] = useState(props.group || '0');
  const [topic, setTopic] = useState(props.topic || '');
  const [languageLevel, setLanguageLevel] = useState(props.languagelevel || 'Native Speaker');
  const [showModal, setShowModal] = useState(true);
  const [newParticipant] = useState(props.newparticipant || false);
  const [id] = useState(props.id || -1);
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

  const onSaveClick = () => {
    const participantTemp = new Participant(id, firstName, lastName, email, group, topic, languageLevel);

    /* eslint-disable object-shorthand */
    if (newParticipant) {
      // create a new participant

      dispatch({
        type: 'added',
        newParticipant: participantTemp
      });
      clearData();
    } else {
      // update an existing participant
      dispatch({
        type: 'changed',
        updatedParticipant: participantTemp
      });
    }
    /* eslint-enable object-shorthand */
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
                <Modal.Title>{newParticipant ? 'Add new Participant' : 'Edit Participant'}</Modal.Title>
                <Image src={exit} onClick={handleClose} alt={'exit'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }}/>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>First name:</Form.Label>
                        <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last name:</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Group:</Form.Label>
                        <Form.Control type={'text'} value={group} placeholder='Group' onChange={(e) => setGroup(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Topic:</Form.Label>
                        <Form.Control type={'text'} value={topic} placeholder='Topic' onChange={(e) => setTopic(e.target.value)}/>
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
                        <Button className={'save-button'} onClick={onSaveClick}> {newParticipant ? 'Add Participant' : 'Save Changes'}</Button>
                    </div>
                </Form>
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
