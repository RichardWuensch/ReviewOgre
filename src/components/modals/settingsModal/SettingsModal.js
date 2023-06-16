import './SettingsModal.css';
import Modal from 'react-bootstrap/Modal';
import exit from '../../../assets/media/x-circle.svg';
import { Button, Col, Image, Row } from 'react-bootstrap';

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
                    <Row className={'row'}>
                        <Col className={'col'}>
                            <Button
                                variant={'light'}
                                style={{ backgroundColor: '#B0D7AF', color: 'black' }}
                                className={'confirm-button'}
                                onClick={props.onHide()}>
                                Confirm
                            </Button>
                        </Col>
                        <Col className={'col'}>
                            <Button
                                variant={'light'}
                                style={{ backgroundColor: '#C40233' }}
                                className={'cancel-button'}
                                onClick={props.onHide()}>
                                Abort
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
  );
}
export default SettingsModal;
