import React from 'react';
import './MainPage.css';
import '../setup_window.css';
import '../checkboxstyling.css';
import SlotsWindow from '../slotsWindow/SlotsWindow';
import logo from '../../../assets/media/favicon_ogre.png';
import download from '../../../assets/media/download.svg';
import file from '../../../assets/media/file-earmark.svg';
import start from '../../../assets/media/play-circle.svg';
import Test from '../../../algorithm/test/Test';
import StoreConfiguration from '../../../api/StoreConfiguration';
import LoadConfiguration from '../../../api/LoadConfiguration';
import ImportParticipants from '../../../api/ImportParticipants';
import FailedCalculationModal from '../../modals/failedCalculationModal/FailedCalculationModal';
import ParticipantList from '../participantWindow/ParticipantWindow';
import { useParticipants, useParticipantsDispatch } from '../context/ParticipantsContext';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { useRoomSlots, useRoomSlotsDispatch } from '../context/RoomSlotContext';
import StoreResult from '../../../api/StoreResult';
// import RevagerLiteExport from '../../../api/mail/RevagerLiteExport';
// import Mail from '../../../api/mail/Mail';
// import SaveRoomPlan from '../../../api/SaveRoomPlan';
let authorIsNotary = false;

function MainPage () {
  const [showModalFailedCalculations, setShowModalFailedCalculations] = React.useState(false);
  const participantsDispatch = useParticipantsDispatch();
  const participants = useParticipants();
  const roomSlotsDispatch = useRoomSlotsDispatch();
  const roomSlots = useRoomSlots();

  function runAlgorithm () {
    try {
      if (new Test().run(participants, participantsDispatch, roomSlots, roomSlotsDispatch, authorIsNotary)) {
      // successful run

        // all on successful calculation window:

        // new Mail(roomSlots).generateMailsForModerators();
        // new RevagerLiteExport().buildJSONAllReviews(roomSlots);
        // new SaveRoomPlan(roomSlots).runSave();
        new StoreResult().runFileSave(roomSlots);
      } else {
        setShowModalFailedCalculations(true);
      }
    } catch (error) {
      console.log(error.message);
      // call something like setModalFailedPrecheck with the corrosponding message
    }
  }

  async function importStudentList (event) {
    // deleteParticipantListFromContext(participants);
    const importParticipants = new ImportParticipants();
    const participantList = await importParticipants.runStudentImport(event);
    addParticipantListToContext(participantList);
  }

  function saveConfiguration () {
    new StoreConfiguration(participants, roomSlots, authorIsNotary).runFileSave();
  }

  async function importConfiguration (event) {
    deleteParticipantListFromContext(participants);
    deleteRoomSlotListFromContext(roomSlots);
    const importConf = new LoadConfiguration();
    await importConf.runConfigurationImport(event);
    addParticipantListToContext(importConf.getParticipants());
    addRoomSlotListToContext(importConf.getRoomSlots());
    authorIsNotary = importConf.getAuthorIsNotary();
  }

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

  function handleNotaryIsAuthorChange () {
    console.log('Notary is Author');
    // this logs can be used to check if the algo writes correct in context
    console.log(roomSlots);
    console.log(participants);
  }

  return (
        <div className={'main-page'}>
            <div className={'title-box'}>
                <Image src={logo} alt={'icon'} height={50} width={50}/>
                <span className={'title-text'}>ReviewOgre Reloaded</span>
            </div>
            <h2 className={'title-subheadline'} style={{ fontWeight: 100, fontSize: '2.5em' }}>Sort your review peers in groups for better Technical Reviews!</h2>
            <span className={'title-subheadline'} style={{ fontWeight: 100 }}>Visit the <a href="url">HowToGuide</a> to learn more about this platform</span>
            <Row className={'button-group'}>
                <Col xs={8} md={4} className="mb-3 mb-md-0">
                    <Button variant={'light'} className="button-container-green" onClick={() => document.getElementById('student-input').click()}>
                        <Image src={download} alt="icon1" height={16} width={16} />
                        <span className="button-text">Import Participants</span>
                    </Button>
                    <input type="file" id="student-input" style={{ display: 'none' }} onChange={importStudentList}
                           accept='text/csv'/>
                </Col>
                <Col xs={8} md={4} className="mb-3 mb-md-0">
                    <Button variant={'light'} className="button-container-green" onClick={() => document.getElementById('file-input').click()}>
                        <Image src={download} alt="icon2" height={16} width={16} />
                        <span className="button-text">Load Configuration</span>
                    </Button>
                    <input type="file" id="file-input" style={{ display: 'none' }} onChange={importConfiguration}
                           accept='application/json'/>
                </Col>
                <Col xs={8} md={4} className="mb-3 mb-md-0">
                    <Button variant={'light'} className="button-container-white" onClick={saveConfiguration}>
                        <Image src={file} alt="icon3" height={16} width={16} />
                        <span className="button-text">Save Configuration</span>
                    </Button>
                </Col>
            </Row>
            <Row className={'participant-slots-container'}>
                <Col xs={12} md={8} className="mb-3 mb-md-0">
                    {/* added context to participant store */}
                    <ParticipantList/>
                </Col>
                {/* replace with component */}
                <Col xs={12} md={4} className={'mb-3 mb-md-0 slots-setup-container'}>
                    <SlotsWindow/>
                    <div className={'setupWindow'}>
                        <h2 className={'title-subheadline'}>Run Configuration</h2>
                        <div className={'setupContainer'}>
                            <div className={'radio-container'}>
                                <div className={'setupItems'}>
                                    <label className={'switch'}>
                                        <input type="checkbox" aria-label={'Notary is author'} onClick={handleNotaryIsAuthorChange}/>
                                        <span className={'slider round'}></span>
                                    </label>
                                    <span style={{ paddingLeft: 10 }}>Notary is Author</span>
                                </div>
                                <div className={'setupItems'}>
                                    <label className={'switch'}>
                                        <input type="checkbox" aria-label={'International Groups needed'} onClick={handleModeratorNotReviewerChange}/>
                                        <span className={'slider round'}></span>
                                    </label>
                                    <span style={{ paddingLeft: 10 }}>International Groups</span>
                                </div>
                                <div className={'setupItems'} style={{ paddingBottom: '0' }}>
                                    <label className={'switch'}>
                                        <input type="checkbox" aria-label={'A/B-Reviews allowed'} onClick={handleABReviewChange}/>
                                        <span className={'slider round'}></span>
                                    </label>
                                    <span style={{ paddingLeft: 10 }}>A/B Review</span>
                                </div>
                            </div>
                            <div className={'start-button-container'}>
                                <Button variant={'light'} className="button-start" onClick={runAlgorithm}>
                                    <Image src={start} alt="startCalculation" height={20} width={20} />
                                    <span className="button-start-text">Start Calculations</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
                <FailedCalculationModal
                    show={showModalFailedCalculations}
                    onHide={() => setShowModalFailedCalculations(false)}/>

                {/* end */}
            </Row>
        </div>
  );
}

function handleModeratorNotReviewerChange () {
  console.log('Moderator not Reviewer');
}

function handleABReviewChange () {
  console.log('A/B Review');
}

export default MainPage;
