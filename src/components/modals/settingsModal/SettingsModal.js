import './SettingsModal.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import exit from '../../../assets/media/x-circle.svg';
import { Image } from 'react-bootstrap';

function SettingsModal (props) {
  function setAuthorIsNotary () {
    props.setSettings({
      ...props.settings,
      authorIsNotary: !props.settings.authorIsNotary
    });
  }

  function setABReview () {
    props.setSettings({
      ...props.settings,
      ABReview: !props.settings.ABReview
    });
  }

  function setInternationalGroups () {
    props.setSettings({
      ...props.settings,
      internationalGroups: !props.settings.internationalGroups
    });
  }

  function setBreakForModeratorAndReviewer () {
    props.setSettings({
      ...props.settings,
      breakForModeratorAndReviewer: !props.settings.breakForModeratorAndReviewer
    });
  }

  return (
        <Modal
            onHide={props.onHide}
            show={props.show}
            // size="sm"
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
                            <input type="checkbox" aria-label={'Notary is author'} onChange={setAuthorIsNotary} checked={props.settings.authorIsNotary}/>
                            <span className={'slider round'}></span>
                        </label>
                        <span style={{ paddingLeft: 10 }}>Notary is Author</span>
                    </div>
                    <div className={'setupItems'}>
                        <label className={'switch'}>
                            <input type="checkbox" aria-label={'A/B-Reviews allowed'} onChange={setBreakForModeratorAndReviewer} checked={props.settings.breakForModeratorAndReviewer}/>
                            <span className={'slider round'}></span>
                        </label>
                        <span style={{ paddingLeft: 10 }}>Break for Moderator and Reviewer</span>
                    </div>
                    <div className={'setupItems'}>
                        <label className={'switch'}>
                            <input type="checkbox" aria-label={'International Groups needed'} onChange={setABReview} checked={props.settings.ABReview}/>
                            <span className={'slider round'}></span>
                        </label>
                        <span style={{ paddingLeft: 10 }}>A/B Review</span>
                    </div>
                    <div className={'setupItems'} style={{ paddingBottom: '0' }}>
                        <label className={'switch'}>
                            <input type="checkbox" aria-label={'A/B-Reviews allowed'} onChange={setInternationalGroups} checked={props.settings.internationalGroups}/>
                            <span className={'slider round'}></span>
                        </label>
                        <span style={{ paddingLeft: 10 }}>International Groups</span>
                    </div>
                </div>
                {/* <div className={'footer'}>
                    <Row className={'row'}>
                        <Col className={'col'}>
                            <Button
                                variant={'light'}
                                style={{ backgroundColor: '#B0D7AF', color: 'black' }}
                                className={'confirm-button'}
                                onClick={props.onHide}>
                                Confirm
                            </Button>
                        </Col>
                        <Col className={'col'}>
                            <Button
                                variant={'light'}
                                style={{ backgroundColor: '#C40233' }}
                                className={'cancel-button'}
                                onClick={props.onHide}>
                                Abort
                            </Button>
                        </Col>
                    </Row>
                </div> */}
            </Modal.Body>
        </Modal>
  );
}
SettingsModal.propTypes = {
  onHide: PropTypes.func.isRequired
};
export default SettingsModal;
