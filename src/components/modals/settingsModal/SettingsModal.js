import './SettingsModal.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import exit from '../../../assets/media/x-circle.svg';
import { Image } from 'react-bootstrap';
import CustomSwitch from '../../shared/buttons/switch/CustomSwitch';

function SettingsModal (props) {
  function setAuthorIsNotary () {
    props.setSettings({
      ...props.settings,
      authorIsNotary: !props.settings.authorIsNotary
    });
  }

  function setAbReview () {
    props.setSettings({
      ...props.settings,
      abReview: !props.settings.abReview
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
      breakForModeratorAndReviewer:
        !props.settings.breakForModeratorAndReviewer
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
        <Image
          src={exit}
          alt={'exitModal'}
          className={'modal-header-icon'}
          onClick={props.onHide}
        />
      </Modal.Header>
      <Modal.Body>
        <div className={'radio-container'}>
          <CustomSwitch
              onSwitchClick={setAuthorIsNotary}
              isChecked={props.settings.authorIsNotary}>
            <span style={{ paddingLeft: 10 }}>Author is Notary</span>
          </CustomSwitch>
          <CustomSwitch
              onSwitchClick={setBreakForModeratorAndReviewer}
              isChecked={props.settings.breakForModeratorAndReviewer}>
            <span style={{ paddingLeft: 10 }}> Break for Moderator and Reviewer </span>
          </CustomSwitch>
          <CustomSwitch
              onSwitchClick={setAbReview}
              isChecked={props.settings.abReview}>
            <span style={{ paddingLeft: 10 }}>A/B Review</span>
          </CustomSwitch>
          <CustomSwitch
              isChecked={props.settings.internationalGroups}
              onSwitchClick={setInternationalGroups}>
            <span style={{ paddingLeft: 10 }}>International Groups</span>
          </CustomSwitch>
        </div>
      </Modal.Body>
    </Modal>
  );
}
SettingsModal.propTypes = {
  onHide: PropTypes.func.isRequired
};
export default SettingsModal;
