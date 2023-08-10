import './SettingsModal.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import exit from '../../../../public/media/x-circle.svg';
import { Image } from 'react-bootstrap';
import CustomSwitch from '../../shared/buttons/switch/CustomSwitch';
import { useSettings, useSettingsDispatch } from '../../shared/context/SettingsContext';

function SettingsModal (props) {
  const settings = useSettings();
  const settingsDispatch = useSettingsDispatch();

  function updateSettings (updatedSettings) {
    /* eslint-disable object-shorthand */
    settingsDispatch({
      type: 'changed',
      updatedSettings: updatedSettings
    });
    /* eslint-enable object-shorthand */
  }

  function getSettingsCopy () {
    return {
      authorIsNotary: settings.authorIsNotary,
      breakForModeratorAndReviewer: settings.breakForModeratorAndReviewer,
      abReview: settings.abReview,
      internationalGroups: settings.internationalGroups
    };
  }

  function toggleAuthorIsNotary () {
    const settingsTemp = getSettingsCopy();
    settingsTemp.authorIsNotary = !settingsTemp.authorIsNotary;

    updateSettings(settingsTemp);
  }

  function toggleAbReview () {
    const settingsTemp = getSettingsCopy();
    settingsTemp.abReview = !settingsTemp.abReview;

    updateSettings(settingsTemp);
  }

  function toggleInternationalGroups () {
    const settingsTemp = getSettingsCopy();
    settingsTemp.internationalGroups = !settingsTemp.internationalGroups;

    updateSettings(settingsTemp);
  }

  function toggleBreakForModeratorAndReviewer () {
    const settingsTemp = getSettingsCopy();
    settingsTemp.breakForModeratorAndReviewer = !settingsTemp.breakForModeratorAndReviewer;

    updateSettings(settingsTemp);
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
              onSwitchClick={toggleAuthorIsNotary}
              isChecked={settings.authorIsNotary}>
            <span style={{ paddingLeft: 10 }}>Author is Notary</span>
          </CustomSwitch>
          <CustomSwitch
              onSwitchClick={toggleBreakForModeratorAndReviewer}
              isChecked={settings.breakForModeratorAndReviewer}>
            <span style={{ paddingLeft: 10 }}> Break for Moderator and Reviewer </span>
          </CustomSwitch>
          <CustomSwitch
              onSwitchClick={toggleAbReview}
              isChecked={settings.abReview}>
            <span style={{ paddingLeft: 10 }}>A/B Review</span>
          </CustomSwitch>
          <CustomSwitch
              isChecked={settings.internationalGroups}
              onSwitchClick={toggleInternationalGroups}>
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
