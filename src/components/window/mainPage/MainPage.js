import React from 'react';
import './MainPage.css';
import '../setup_window.css';
import SlotsWindow from '../slotsWindow/SlotsWindow';
import start from '../../../assets/media/play-circle.svg';
import gear from '../../../assets/media/gear.svg';
import ErrorModal from '../../modals/errorModal/ErrorModal';
import SettingsModal from '../../modals/settingsModal/SettingsModal';
import ParticipantList from '../participantWindow/ParticipantWindow';
import { useParticipants, useParticipantsDispatch } from '../../shared/context/ParticipantsContext';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { useRoomSlots, useRoomSlotsDispatch } from '../../shared/context/RoomSlotContext';
import Runner from '../../../algorithm/logic/Runner';
import CustomButton from '../../shared/buttons/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../shared/context/SettingsContext';

function MainPage () {
  const [algorithmErrorMessage, setAlgorithmErrorMessage] =
        React.useState(null);
  const [showModalSettings, setShowModalSettings] = React.useState(false);
  const participantsDispatch = useParticipantsDispatch();
  const participants = useParticipants();
  const roomSlotsDispatch = useRoomSlotsDispatch();
  const roomSlots = useRoomSlots();
  const settings = useSettings();
  const navigate = useNavigate();

  function runAlgorithm () {
    try {
      new Runner().runAlgorithm(
        participants,
        participantsDispatch,
        roomSlots,
        roomSlotsDispatch,
        settings
      );

      // successful run
      navigate('/reviews');
    } catch (error) {
      console.log(error.message);
      setAlgorithmErrorMessage(error);
    }
  }

  return (
            <div className={'main-page'}>
                <Row className={'participant-slots-container'}>
                    <Col md={12} lg={8} className="mb-3 mb-md-0 pl-0">
                        {/* added context to participant store */}
                        <ParticipantList/>
                    </Col>
                    {/* replace with component */}
                    <Col md={12} lg={4} className={'mb-3 mb-md-0 slots-setup-container'}>
                        <SlotsWindow/>
                        <div className={'setupWindow'} style={{ paddingBottom: '4vh' }}>
                            <h2 className={'title-subheadline'}>Run Configuration</h2>
                            <Card className={'setupContainer'}>
                                <Row className="justify-content-between">
                                    <Col xl={4} md={4} xs={4}>
                                        <CustomButton
                                            toolTip={'Change the settings for the computation'}
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
                                    </Col>
                                    <Col xl={8} md={8} xs={8}>
                                        <CustomButton
                                            toolTip={'Starts the computation. Results will be shown in a separate window'}
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
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                    <ErrorModal
                        show={algorithmErrorMessage}
                        errorObject={algorithmErrorMessage}
                        onHide={() => setAlgorithmErrorMessage(null)}
                    />
                    <SettingsModal
                        show={showModalSettings}
                        onHide={() => setShowModalSettings(false)}

                    />

                    {/* end */}
                </Row>
            </div>
  );
}

export default MainPage;
