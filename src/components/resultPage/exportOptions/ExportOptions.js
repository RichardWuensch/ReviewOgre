import './ExportOptions.css';
import { Card, Col, Container, Image, Offcanvas, Row } from 'react-bootstrap';
import Mail from '../../../api/mail/Mail';
import mail from '../../../assets/media/envelope-at.svg';
import upload from '../../../assets/media/upload.svg';
import StoreResult from '../../../api/StoreResult';
import SaveRoomPlan from '../../../api/SaveRoomPlan';
import download from '../../../assets/media/download.svg';
import RevagerLiteExport from '../../../api/RevagerLiteExport';
import React from 'react';
import { useRoomSlots } from '../../shared/context/RoomSlotContext';
import CustomButton from '../../shared/buttons/button/CustomButton';

function ExportOptions ({ onHide, ...props }) {
  const roomSlots = useRoomSlots();

  return (
        <div>
            <Offcanvas onHide={onHide} {...props} placement={'bottom'} style={{ height: '280px' }} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Export options</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
                    <Container>
                        <Row>
                            <Col>
                                <Card style={{ backgroundColor: '#cccccc' }}>
                                    <Card.Body>
                                        <Card.Title>Mail Operations</Card.Title>
                                        <CustomButton
                                            backgroundColor={'#B0D7AF'}
                                            onButtonClick={() => new Mail(roomSlots).openMailClient()}
                                            toolTip={'Click to open the mail client and directly send invitations'}>
                                            <Image
                                                src={mail}
                                                alt="openInMailClient"
                                                className={'button-icon'}
                                            />
                                            Open in Mailclient
                                        </CustomButton>
                                        <CustomButton
                                            backgroundColor={'#B0D7AF'}
                                            onButtonClick={() => new Mail(roomSlots).saveMailsInTxt()}
                                            toolTip={'Export Mail list'}
                                        >
                                            <Image
                                                src={upload}
                                                alt="mailExport"
                                                className={'button-icon'}
                                            />
                                            Export Mail list
                                        </CustomButton>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ backgroundColor: '#cccccc' }}>
                                    <Card.Body>
                                        <Card.Title>Export Result</Card.Title>
                                        <CustomButton
                                            backgroundColor={'#B0D7AF'}
                                            onButtonClick={() => new StoreResult().saveAsTXT(roomSlots)}
                                            toolTip={'Export results in txt format'}
                                        >
                                            <Image
                                                src={upload}
                                                alt="exportResult"
                                                className={'button-icon'}
                                            />
                                            Result as txt
                                        </CustomButton>
                                        <CustomButton
                                            backgroundColor={'#B0D7AF'}
                                            onButtonClick={() => new StoreResult().saveAsJSON(roomSlots)}
                                            toolTip={'Export results in json format'}
                                        >
                                            <Image
                                                src={upload}
                                                alt="exportResult"
                                                className={'button-icon'}
                                            />
                                            Result as JSON
                                        </CustomButton>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ backgroundColor: '#cccccc' }}>
                                    <Card.Body>
                                        <Card.Title>Room Plan</Card.Title>
                                        <CustomButton
                                            backgroundColor={'#B0D7AF'}
                                            onButtonClick={() => new SaveRoomPlan(roomSlots).runSave()}
                                            toolTip={'Download results in pdf format'}
                                        >
                                            <Image
                                                src={download}
                                                alt="exportResult"
                                                className={'button-icon'}
                                            />
                                            Download pdf
                                        </CustomButton>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ backgroundColor: '#cccccc' }}>
                                    <Card.Body>
                                        <Card.Title>RevAger Lite</Card.Title>
                                        <CustomButton
                                            backgroundColor={'#B0D7AF'}
                                            onButtonClick={() =>
                                              new RevagerLiteExport().buildZipWithAllRevagerLiteFiles(roomSlots)
                                            }
                                            toolTip={'Export reviews; can be imported into RevAger Lite'}
                                        >
                                            <Image
                                                src={upload}
                                                alt="exportResult"
                                                className={'button-icon'}
                                            />
                                            Export reviews
                                        </CustomButton>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
  );
}

export default ExportOptions;
