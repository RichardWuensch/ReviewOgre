import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import '../window/SlotModal.css';
import exit from '../../../src/assets/media/x-circle.svg';
function SlotModal (props) {
  return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className={'modal-header-container'}>
                    <h2 className={'modal-header'}>New Time Slot</h2>
                    <img src={exit} alt={'exitSlotModal'} className={'modal-header-icon'} onClick={props.onHide}/>
                </div>
                <div className={'date-container'}>
                    <input type={'date'} className={'input-date-container'}/>
                </div>
                <div className={'footer'}>
                    <button className={'add-slot-button'}>
                        <span className={'add-slot-text'}>Add Slot</span>
                    </button>
                </div>
            </Modal.Body>
        </Modal>
  );
}
SlotModal.propTypes = {
  onHide: PropTypes.string
};
export default SlotModal;
