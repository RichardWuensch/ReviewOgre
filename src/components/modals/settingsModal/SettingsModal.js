import './SettingsModal.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import exit from '../../../assets/media/x-circle.svg';
import { Col, Image, Row } from 'react-bootstrap';
import ModalButton from '../../shared/buttons/modalButton/ModalButton';

function SettingsModal (props) {
  return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'modal'}
        >
            <Modal.Header>
                <Modal.Title>Settings</Modal.Title>
                <Image src={exit} alt={'exitModal'} className={'modal-header-icon'} onClick={props.onHide}/>
            </Modal.Header>
            <Modal.Body>
                <div className={'radio-container'}>
                    <div className={'setupItems'}>
                        <label className={'switch'}>
                            <input type="checkbox" aria-label={'Notary is author'}/>
                            <span className={'slider round'}></span>
                        </label>
                        <span style={{ paddingLeft: 10 }}>Notary is Author</span>
                    </div>
                    <div className={'setupItems'}>
                        <label className={'switch'}>
                            <input type="checkbox" aria-label={'International Groups needed'}/>
                            <span className={'slider round'}></span>
                        </label>
                        <span style={{ paddingLeft: 10 }}>International Groups</span>
                    </div>
                    <div className={'setupItems'} style={{ paddingBottom: '0' }}>
                        <label className={'switch'}>
                            <input type="checkbox" aria-label={'A/B-Reviews allowed'}/>
                            <span className={'slider round'}></span>
                        </label>
                        <span style={{ paddingLeft: 10 }}>A/B Review</span>
                    </div>
                </div>
                <div className={'footer'}>
                    <Row>
                        <Col>
                            <ModalButton
                                backgroundColor={'#B0D7AF'}
                                onButtonClick={props.onHide}>
                                Confirm
                            </ModalButton>
                        </Col>
                        <Col>
                            <ModalButton
                                backgroundColor={'#C40233'}
                                onButtonClick={props.onHide}>
                                Abort
                            </ModalButton>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
  );
}
SettingsModal.propTypes = {
  onHide: PropTypes.func.isRequired
};
export default SettingsModal;
