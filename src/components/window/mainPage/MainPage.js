import React, { useState, useEffect } from 'react';
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
import SuccessfulCalculationModal from '../../modals/successfulCalculationModal/SuccessfulCalculationModal';
import DataImportCheckModal from '../../modals/dataImportCheckModal/DataImportCheckModal';
import SettingsModal from '../../modals/settingsModal/SettingsModal';
import ParticipantList from '../participantWindow/ParticipantWindow';
import { useParticipants, useParticipantsDispatch } from '../context/ParticipantsContext';
import { Button, Col, Image, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useRoomSlots, useRoomSlotsDispatch } from '../context/RoomSlotContext';
// import StoreResult from '../../../api/StoreResult';
// import StoreResult from '../../../api/StoreResult';
// import RevagerLiteExport from '../../../api/mail/RevagerLiteExport';
// import Mail from '../../../api/mail/Mail';
// import SaveRoomPlan from '../../../api/SaveRoomPlan';
let authorIsNotary = false;

function MainPage () {
  const [showModalFailedCalculations, setShowModalFailedCalculations] = React.useState(false);
  const [showModalSuccessfulCalculations, setShowModalSuccessfulCalculations] = React.useState(false);
  const [showModalDataImportCheck, setShowModalDataImportCheck] = React.useState(false);
  const [showModalSettings, setShowModalSettings] = React.useState(false);
  const [overwriteExistingDataEvent, setOverwriteExistingDataEvent] = React.useState(null);
  const [importDataWithSlots, setImportDataWithSlots] = React.useState(false);
  const participantsDispatch = useParticipantsDispatch();
  const participants = useParticipants();
  const roomSlotsDispatch = useRoomSlotsDispatch();
  const roomSlots = useRoomSlots();

  const [showTooltip, setShowTooltip] = useState([false, false, false, false, false]);
  const [popoverText, setPopoverText] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };
  const handleMouseEnter = (buttonId) => {
    const newShowTooltips = [false, false, false, false, false];
    newShowTooltips[buttonId] = true;
    setShowTooltip(newShowTooltips);
  };
  const handleMouseLeave = (buttonId) => {
    const newShowTooltips = [false, false, false, false, false];
    setShowTooltip(newShowTooltips);
  };
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  function runAlgorithm () {
    try {
      if (new Test().run(participants, participantsDispatch, roomSlots, roomSlotsDispatch, authorIsNotary)) {
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
      } else {
        setShowModalFailedCalculations(true);
      }
    } catch (error) {
      console.log(error.message);
      // call something like setModalFailedPrecheck with the corrosponding message
    }
  }

  async function importDataCheck (event) {
    setOverwriteExistingDataEvent(event);
    setShowModalDataImportCheck(true);
  }

  async function importStudentList () {
    const importParticipants = new ImportParticipants();
    const participantList = await importParticipants.runStudentImport(overwriteExistingDataEvent);
    addParticipantListToContext(participantList);
  }

  async function importConfiguration () {
    const importConf = new LoadConfiguration();
    await importConf.runConfigurationImport(overwriteExistingDataEvent);
    addParticipantListToContext(importConf.getParticipants());
    addRoomSlotListToContext(importConf.getRoomSlots());
    authorIsNotary = importConf.getAuthorIsNotary();
  }

  function saveConfiguration () {
    new StoreConfiguration(participants, roomSlots, authorIsNotary).runFileSave();
  }

  function openSettings () {
    setShowModalSettings(true);
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

  /* function handleNotaryIsAuthorChange () {
    console.log('Notary is Author');
    // this logs can be used to check if the algo writes correct in context
    console.log(roomSlots);
    console.log(participants);
  } */

  return (
        <div className={'main-page'} onMouseMove={handleMouseMove}>
            <div className={'title-box'}>
                <Image src={logo} alt={'icon'} height={50} width={50}/>
                <span className={'title-text'}>ReviewOgre Reloaded</span>
            </div>
            <h2 className={'title-subheadline'} style={{ fontWeight: 100, fontSize: '2.5em' }}>Sort your review peers in groups for better Technical Reviews!</h2>
            <span className={'title-subheadline'} style={{ fontWeight: 100 }}>Visit the <a href="url">HowToGuide</a> to learn more about this platform</span>
            <Row className={'button-group'}>
                <Col xs={8} md={4} className="mb-3 mb-md-0">
                    <OverlayTrigger
                      key='0'
                      placement="top"
                      overlay={<Tooltip id="tooltip-0">{popoverText}</Tooltip>}
                      show={showTooltip[0]}
                      target={mousePosition}
                    >
                        <Button variant={'light'} className="button-container-green" onClick={() => document.getElementById('student-input').click()}
                          onMouseEnter={() => { setPopoverText('Import Participants'); handleMouseEnter(0); }}
                          onMouseLeave={() => handleMouseLeave(0)}>
                            <Image src={download} className={'button-image'} alt="icon1" height={16} width={16} />
                            <span className="button-text">Import Participants</span>
                        </Button>
                    </OverlayTrigger>
                    <input type="file" id="student-input" style={{ display: 'none' }} onChange={() => { importDataCheck(event); setImportDataWithSlots(false); }}
                           accept='text/csv'/>
                </Col>
                <Col xs={8} md={4} className="mb-3 mb-md-0">
                    <OverlayTrigger
                      key='1'
                      placement="top"
                      overlay={<Tooltip id="tooltip-1">{popoverText}</Tooltip>}
                      show={showTooltip[1]}
                      target={mousePosition}
                    >
                        <Button variant={'light'} className="button-container-green" onClick={() => document.getElementById('file-input').click()}
                          onMouseEnter={() => { setPopoverText('Load Configuration'); handleMouseEnter(1); }}
                          onMouseLeave={() => handleMouseLeave(1)}>
                            <Image src={download} className={'button-image'} alt="icon2" height={16} width={16} />
                            <span className="button-text">Load Configuration</span>
                        </Button>
                    </OverlayTrigger>
                    <input type="file" id="file-input" style={{ display: 'none' }} onChange={() => { importDataCheck(event); setImportDataWithSlots(true); }}
                           accept='application/json'/>
                </Col>
                <Col xs={8} md={4} className="mb-3 mb-md-0">
                    <OverlayTrigger
                      key='2'
                      placement="top"
                      overlay={<Tooltip id="tooltip-2">{popoverText}</Tooltip>}
                      show={showTooltip[2]}
                      target={mousePosition}
                    >
                        <Button variant={'light'} className="button-container-white" onClick={saveConfiguration}
                          onMouseEnter={() => { setPopoverText('Save Configuration'); handleMouseEnter(2); }}
                          onMouseLeave={() => handleMouseLeave(2)}>
                            <Image src={file} className={'button-image'} alt="icon3" height={16} width={16} />
                            <span className="button-text">Save Configuration</span>
                        </Button>
                    </OverlayTrigger>
                </Col>
            </Row>
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
                            <div className={'start-button-container'}>
                                <OverlayTrigger
                                  key='3'
                                  placement="top"
                                  overlay={<Tooltip id="tooltip-3">{popoverText}</Tooltip>}
                                  show={showTooltip[3]}
                                  target={mousePosition}
                                >
                                    <Button variant={'light'} className="button-start" onClick={openSettings}
                                      onMouseEnter={() => { setPopoverText('Settings'); handleMouseEnter(3); }}
                                      onMouseLeave={() => handleMouseLeave(3)}>
                                        <Image src={start} alt="startCalculation" height={20} width={20} />
                                        <span className="button-start-text">Settings</span>
                                    </Button>
                                </OverlayTrigger>
                            </div>
                            <div className={'start-button-container'}>
                                <OverlayTrigger
                                  key='4'
                                  placement="top"
                                  overlay={<Tooltip id="tooltip-4">{popoverText}</Tooltip>}
                                  show={showTooltip[4]}
                                  target={mousePosition}
                                >
                                    <Button variant={'light'} className="button-start" onClick={runAlgorithm}
                                      onMouseEnter={() => { setPopoverText('Compute Assignments'); handleMouseEnter(4); }}
                                      onMouseLeave={() => handleMouseLeave(4)}>
                                        <Image src={start} alt="startCalculation" height={20} width={20} />
                                        <span className="button-start-text">Compute Assignments</span>
                                    </Button>
                                </OverlayTrigger>
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
                    titleObject={ importDataWithSlots ? 'Load Configuration' : 'Import Participants' }
                    textobject={ importDataWithSlots ? 'participants and slots' : 'participants' }
                    onHide={() => setShowModalDataImportCheck(false)}
                    onClose={() => setShowModalDataImportCheck(false)}/>
                <SettingsModal
                    show={showModalSettings}
                    onHide={() => setShowModalSettings(false)}
                    onClose={() => setShowModalSettings(false)}/>

                {/* end */}
            </Row>
        </div>
  );
}

/* function handleModeratorNotReviewerChange () {
  console.log('Moderator not Reviewer');
}

function handleABReviewChange () {
  console.log('A/B Review');
} */

export default MainPage;
