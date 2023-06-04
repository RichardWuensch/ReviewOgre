import './DeleteModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../../assets/media/x-circle.svg';
import PropTypes from 'prop-types';
import ParticipantModal from '../participantModals/addEditModal/ParticipantModal';
import { Image } from 'react-bootstrap';

function deleteModal (props) {
  const deleteItem = () => {
    props.onDeleteClick(props.deleteobject);
  };

  return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className={'modal-container'}>
                    <div className={'modal-header-container'}>
                        <span className={'modal-header border-0'}> {'Delete ' + props.titleObject}</span>
                        <Image src={exit} alt={'exitModal'} className={'modal-header-icon'} style={{ color: '#82868B', height: 20, width: 20 }} onClick={props.onHide}/>
                    </div>
                    <div className={'text-container'}>
                        <h2 className={'delete-title-subheadline'}>Are you sure you want to delete {props.textobject}?</h2>
                        <span className={'delete-title-subheadline'}>This Action can&lsquo;t be undone.</span>
                    </div>
                    <div className={'footer'}>
                        <button className={'confirm-button'} onClick= {() => {
                          deleteItem();
                          props.onHide();
                        }}>
                            <span className={'confirm-text'}>Confirm</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
  );
}
ParticipantModal.propTypes = {
  textObject: PropTypes.string,
  titleObject: PropTypes.string,
  onClose: PropTypes.func,
  onDeleteClick: PropTypes.func
};
export default deleteModal;
