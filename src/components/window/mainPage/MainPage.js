import React from 'react';
import './MainPage.css';
import '../setup_window.css';
import '../checkboxstyling.css';
import SlotsWindow from '../slotsWindow/SlotsWindow';
import start from '../../../assets/media/play-circle.svg';
import Test from '../../../algorithm/test/Test';
import FailedCalculationModal from '../../modals/failedCalculationModal/FailedCalculationModal';
import SuccessfulCalculationModal from '../../modals/successfulCalculationModal/SuccessfulCalculationModal';
import ParticipantList from '../participantWindow/ParticipantWindow';
import { useParticipants, useParticipantsDispatch } from '../context/ParticipantsContext';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { useRoomSlots, useRoomSlotsDispatch } from '../context/RoomSlotContext';
// import StoreResult from '../../../api/StoreResult';
// import RevagerLiteExport from '../../../api/mail/RevagerLiteExport';
// import Mail from '../../../api/mail/Mail';
// import SaveRoomPlan from '../../../api/SaveRoomPlan';
let authorIsNotary = false;

function MainPage () {
  const [showModalFailedCalculations, setShowModalFailedCalculations] = React.useState(false);
  const [showModalSuccessfulCalculations, setShowModalSuccessfulCalculations] = React.useState(false);
  const participantsDispatch = useParticipantsDispatch();
  const participants = useParticipants();
  const roomSlotsDispatch = useRoomSlotsDispatch();
  const roomSlots = useRoomSlots();

  function runAlgorithm () {
    try {
      if (new Test().run(participants, participantsDispatch, roomSlots, roomSlotsDispatch, authorIsNotary)) {
      // successful run
        setShowModalSuccessfulCalculations(true);

        // all on successful calculation window:

        // new Mail(roomSlots).generateMailsForModerators();
        // new RevagerLiteExport().buildJSONAllReviews(roomSlots);
        // new SaveRoomPlan(roomSlots).runSave();
        // new StoreResult().runFileSave(roomSlots);
      } else {
        setShowModalFailedCalculations(true);
      }
    } catch (error) {
      console.log(error.message);
      // call something like setModalFailedPrecheck with the corrosponding message
    }
  }

  function handleNotaryIsAuthorChange () {
    authorIsNotary = !authorIsNotary;
    console.log('Notary is Author');
    // this logs can be used to check if the algo writes correct in context
    console.log(roomSlots);
    console.log(participants);
  }

  return (
        <div className={'main-page'}>
            <Row className={'participant-slots-container'}>
                <Col xs={12} md={8} className="mb-3 mb-md-0 pl-0" >
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
                <SuccessfulCalculationModal
                    show={showModalSuccessfulCalculations}
                    onHide={() => setShowModalSuccessfulCalculations(false)}/>

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
