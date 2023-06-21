import React from 'react';
import './MainPage.css';
import '../setup_window.css';
import '../checkboxstyling.css';
import SlotsWindow from '../slotsWindow/SlotsWindow';
import start from '../../../assets/media/play-circle.svg';
import FailedCalculationModal from '../../modals/failedCalculationModal/FailedCalculationModal';
import SuccessfulCalculationModal from '../../modals/successfulCalculationModal/SuccessfulCalculationModal';
import SettingsModal from '../../modals/settingsModal/SettingsModal';
import ParticipantList from '../participantWindow/ParticipantWindow';
import { useParticipants, useParticipantsDispatch } from '../../shared/context/ParticipantsContext';
import { Col, Image, Row } from 'react-bootstrap';
import { useRoomSlots, useRoomSlotsDispatch } from '../../shared/context/RoomSlotContext';
import Runner from '../../../algorithm/logic/Runner';
import CustomButton from '../../shared/button/CustomButton';
// import StoreResult from '../../../api/StoreResult';
// import StoreResult from '../../../api/StoreResult';
// import RevagerLiteExport from '../../../api/mail/RevagerLiteExport';
// import Mail from '../../../api/mail/Mail';
// import SaveRoomPlan from '../../../api/SaveRoomPlan';
const authorIsNotary = false;
const breakForModeratorAndReviewer = false;

function MainPage () {
  const [algorithmErrorMessage, setAlgorithmErrorMessage] =
        React.useState(null);
  const [showModalSuccessfulCalculations, setShowModalSuccessfulCalculations] =
        React.useState(false);
  const [showModalSettings, setShowModalSettings] = React.useState(false);
  const participantsDispatch = useParticipantsDispatch();
  const participants = useParticipants();
  const roomSlotsDispatch = useRoomSlotsDispatch();
  const roomSlots = useRoomSlots();

  function runAlgorithm () {
    try {
      new Runner().runAlgorithm(
        participants,
        participantsDispatch,
        roomSlots,
        roomSlotsDispatch,
        authorIsNotary,
        breakForModeratorAndReviewer
      );

      // successful run
      setShowModalSuccessfulCalculations(true);

      // all on successful calculation window:

      // new Mail(roomSlots).openMailClient();
      // new Mail(roomSlots).saveMailsInTxt();
      // new RevagerLiteExport().buildJSONAllReviews(roomSlots);
      // new SaveRoomPlan(roomSlots).runSave();
      // new StoreResult().runFileSave(roomSlots);
      // new StoreResult().saveAsJSON(roomSlots);
      // new StoreResult().saveAsTXT(roomSlots);
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

  /*
  function saveConfiguration () {
    new StoreConfiguration(
      participants,
      roomSlots,
      authorIsNotary
    ).runFileSave();
  }

  */

  function openSettings () {
    setShowModalSettings(true);
  }

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
                                        onButtonClick={openSettings}
                                        backgroundColor={'#B0D7AF'}
                                    >
                                        <Image
                                            src={start}
                                            alt="startCalculation"
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
                                        <span className="button-start-text">Compute assignment </span>
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
                    <SettingsModal
                        show={showModalSettings}
                        onHide={() => setShowModalSettings(false)}
                        onClose={() => setShowModalSettings(false)}
                    />

                    {/* end */}
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
