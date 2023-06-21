import React from 'react';
import './MainPage.css';
import '../setup_window.css';
import '../checkboxstyling.css';
import SlotsWindow from '../slotsWindow/SlotsWindow';
import start from '../../../assets/media/play-circle.svg';
import gear from '../../../assets/media/gear.svg';
import LoadConfiguration from '../../../api/LoadConfiguration';
import FailedCalculationModal from '../../modals/failedCalculationModal/FailedCalculationModal';
import SuccessfulCalculationModal from '../../modals/successfulCalculationModal/SuccessfulCalculationModal';
import DataImportCheckModal from '../../modals/dataImportCheckModal/DataImportCheckModal';
import SettingsModal from '../../modals/settingsModal/SettingsModal';
import ParticipantList from '../participantWindow/ParticipantWindow';
import { useParticipants, useParticipantsDispatch } from '../../shared/context/ParticipantsContext';
import { Col, Image, Row } from 'react-bootstrap';
import { useRoomSlots, useRoomSlotsDispatch } from '../../shared/context/RoomSlotContext';
import Runner from '../../../algorithm/logic/Runner';
import ImportParticipants from '../../../api/ImportParticipants';
import CustomButton from '../../shared/button/CustomButton';

function MainPage () {
  const [algorithmErrorMessage, setAlgorithmErrorMessage] =
        React.useState(null);
  const [showModalSuccessfulCalculations, setShowModalSuccessfulCalculations] =
        React.useState(false);
  const [showModalDataImportCheck, setShowModalDataImportCheck] =
        React.useState(false);
  const [showModalSettings, setShowModalSettings] = React.useState(false);
  const [overwriteExistingDataEvent] = React.useState(null);
  const [importDataWithSlots] = React.useState(false);
  const [settings, setSettings] = React.useState({
    authorIsNotary: false,
    breakForModeratorAndReviewer: false,
    ABReview: false,
    internationalGroups: false
  });
  const participantsDispatch = useParticipantsDispatch();
  const participants = useParticipants();
  const roomSlotsDispatch = useRoomSlotsDispatch();
  const roomSlots = useRoomSlots();

  async function importStudentList () {
    const importParticipants = new ImportParticipants();
    const participantList = await importParticipants.runStudentImport(
      overwriteExistingDataEvent
    );
    addParticipantListToContext(participantList);
  }

  function runAlgorithm () {
    try {
      new Runner().runAlgorithm(
        participants,
        participantsDispatch,
        roomSlots,
        roomSlotsDispatch,
        settings.authorIsNotary,
        settings.breakForModeratorAndReviewer
      );

      // successful run
      setShowModalSuccessfulCalculations(true);
    } catch (error) {
      console.log(error.message);
      setAlgorithmErrorMessage(error);
    }
  }

  // TODO: should be in header after import call
  /*
  async function importDataCheck (event) {
    setOverwriteExistingDataEvent(event);
    setShowModalDataImportCheck(true);
  }

  function handleNotaryIsAuthorChange () {
    authorIsNotary = !authorIsNotary;

    async function importStudentList () {
      const importParticipants = new ImportParticipants();
      const participantList = await importParticipants.runStudentImport(
        overwriteExistingDataEvent
      );
      addParticipantListToContext(participantList);
    }

   */

  async function importConfiguration () {
    const importConf = new LoadConfiguration();
    await importConf.runConfigurationImport(overwriteExistingDataEvent);
    addParticipantListToContext(importConf.getParticipants());
    addRoomSlotListToContext(importConf.getRoomSlots());
    setSettings({
      ...settings,
      authorIsNotary: importConf.getAuthorIsNotary()
    });
  }

  /*
  function saveConfiguration () {
    new StoreConfiguration(
      participants,
      roomSlots,
      authorIsNotary
    ).runFileSave();
  }

  */

  function addParticipantListToContext (list) {
    /* eslint-disable object-shorthand */
    for (const entry of list) {
      participantsDispatch({
        type: 'added',
        newParticipant: entry
      });
    }
    /* eslint-enable object-shorthand */
  }

  function addRoomSlotListToContext (list) {
    /* eslint-disable object-shorthand */
    for (const entry of list) {
      roomSlotsDispatch({
        type: 'added',
        newRoomSlot: entry
      });
    }
    /* eslint-enable object-shorthand */
  }

  function deleteParticipantListFromContext (list) {
    /* eslint-disable object-shorthand */
    for (const entry of list) {
      participantsDispatch({
        type: 'deleted',
        itemToDelete: entry
      });
    }
    /* eslint-enable object-shorthand */
  }

  function deleteRoomSlotListFromContext (list) {
    /* eslint-disable object-shorthand */
    for (const entry of list) {
      roomSlotsDispatch({
        type: 'deleted',
        itemToDelete: entry
      });
    }
    /* eslint-enable object-shorthand */
  }

  React.useEffect(() => console.log(settings), [settings]);

  return (
            <div className={'main-page'}>
                <Row className={'participant-slots-container'}>
                    <Col xs={12} md={8} className="mb-3 mb-md-0 pl-0">
                        {/* added context to participant store */}
                        <ParticipantList/>
                    </Col>
                    {/* replace with component */}
                    <Col xs={12} md={4} className={'mb-3 mb-md-0 slots-setup-container'}>
                        <SlotsWindow/>
                        <div className={'setupWindow'} style={{ paddingBottom: '4vh' }}>
                            <h2 className={'title-subheadline'}>Run Configuration</h2>
                            <div className={'setupContainer'}>
                                <div className={'start-button-container'}>
                                    <CustomButton
                                        toolTip={'Settings'}
                                        onButtonClick={() => setShowModalSettings(true)}
                                        backgroundColor={'#B0D7AF'}
                                    >
                                        <Image
                                            src={gear}
                                            alt="settings"
                                            height={20}
                                            width={20}
                                        />
                                        <span className="button-start-text">Settings</span>
                                    </CustomButton>
                                </div>
                                <div className={'start-button-container'}>
                                    <CustomButton
                                        toolTip={'Compute Assignments'}
                                        onButtonClick={runAlgorithm}
                                        backgroundColor={'#B0D7AF'}
                                    >
                                        <Image
                                            src={start}
                                            alt="startCalculation"
                                            height={20}
                                            width={20}
                                        />
                                        <span className="button-start-text">Compute assignments</span>
                                    </CustomButton>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <FailedCalculationModal
                        show={algorithmErrorMessage}
                        onHide={() => setAlgorithmErrorMessage(null)}
                        errorMessage={algorithmErrorMessage}
                    />
                    <SuccessfulCalculationModal
                        show={showModalSuccessfulCalculations}
                        onHide={() => setShowModalSuccessfulCalculations(false)}
                    />
                    <DataImportCheckModal
                        show={showModalDataImportCheck}
                        overwritedata={() => {
                          if (importDataWithSlots) {
                            deleteParticipantListFromContext(participants);
                            deleteRoomSlotListFromContext(roomSlots);
                            importConfiguration();
                          } else {
                            deleteParticipantListFromContext(participants);
                            importStudentList();
                          }
                        }}
                        adddata={() => {
                          if (importDataWithSlots) {
                            importConfiguration();
                          } else {
                            importStudentList();
                          }
                        }}
                        titleObject={
                            importDataWithSlots ? 'Load Configuration' : 'Import Participants'
                        }
                        textobject={
                            importDataWithSlots ? 'participants and slots' : 'participants'
                        }
                        onHide={() => setShowModalDataImportCheck(false)}
                        onClose={() => setShowModalDataImportCheck(false)}
                    />
                    <SettingsModal
                        show={showModalSettings}
                        onHide={() => setShowModalSettings(false)}
                        settings={settings}
                        setSettings={setSettings}
                    />
                </Row>
            </div>
  );
}

/* function handleModeratorNotReviewerChange () {
  console.log('Moderator not Reviewer')
}

function handleABReviewChange () {
  console.log('A/B Review')
} */

export default MainPage;
