import Modal from 'react-bootstrap/Modal';
import exit from '../../assets/media/x-circle.svg';
import { useState } from 'react';

function editMultipleParticipantsModal (props, onClose, onSave, onHide, list) {
  const [showModal, setShowModal] = useState(true);
  const [group, setGroup] = useState('');
  const [languageLevel, setLanguageLevel] = useState('');
  const [topic, setTopic] = useState('');
  const handleClose = () => {
    setShowModal(false);
  };

  /* useEffect(() => {
    setGroup(list.group);
    setLanguageLevel(list.languageLevel);
    setTopic(list.topic);
  }, [list]); */

  /* function handleSave () {
    onSave(group, languageLevel, topic);
  } */
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
                        <span className={'modal-header border-0'}>Edit Participants</span>
                        <img src={exit} alt={'exitParticipantModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onHide}/>
                    </div>
                    <div className={'attributes-container'}>
                        <h6>Group:</h6>
                        <input className={'input-attributes-container'} type={'text'} value={group} placeholder="Group" onChange={(e) => setGroup(e.target.value)} />
                        <h6>Topic:</h6>
                        <input className={'input-attributes-container'} type={'text'} value={topic} placeholder="Topic" onChange={(e) => setTopic(e.target.value)} />
                        <h6>German Skill Level:</h6>
                        <form action="#">
                            <select className={'dropdown-attributes-container'} value={languageLevel} onChange={(e) => setLanguageLevel(e.target.value)}>
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
                            <span className={'add-participant-text'}>Save Changes</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
export default editMultipleParticipantsModal;
