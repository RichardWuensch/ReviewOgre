import './DocsComponent.css';
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function DocsComponent () {
  return (
        <div className="docs-page">
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body id='get-started'>
                                <Card.Title>How to Get Started</Card.Title>
                                <Card.Text>
                                    <span className={'docs-text'}>
                                        ReviewOger Reloaded allows you to plan your Technical Reviews with ease. With this tool
                                        you can effortlessly schedule and organize your Reviews, saving you a lot of time in the process.
                                        This user-friendly application eliminates the need to manually organize peers into groups taking away
                                        tedious and cumbersome work - you'll be done in minutes, giving you and your team more time to
                                        focus on what really matters!
                                        <br /><br />
                                        All of your data will only ever be stored on your advice. This means you have full control over
                                        your data. The app can even be used without an internet connection - just click the install button
                                        in the search bar and you'll be able to use the tool whenever you need.
                                        <br /><br />
                                        This tools is best used in combination with the RevAger/RevAgerLite application, as we offer
                                        export-files which can be directly imported into these tools.
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body id='import'>
                                <Card.Title>Import/Export Data</Card.Title>
                                <Card.Text>
                                    <span className={'docs-text'}>
                                    This tool offers multiple ways to import data:
                                        <ol>
                                            <li>
                                                Import you previous state from your local device: You able to import data you have
                                                previously downloaded from the application. This includes all of the participants, slots,
                                                rooms and settings. If you have already calculated the reviews these will be available as well.
                                                To import find the 'Save/Load Options' in the Navbar. Choose the 'Load State' option. You can
                                                choose the file you want to import from the file explorer. The data will be previewed before
                                                it is imported into the application.
                                            </li>
                                            <li id='participant-import'>
                                                <b style={{ fontWeight: 'bold' }}>Participant import:</b> Participants can be imported from 3 different csv files: from moodle, ilias or directly.
                                                <ol>
                                                    <li>Moodle is a system used by our university and it offers an export of participants in a course. The outgoing file can be imported here.</li>
                                                    <li>Ilias is a system used by another university, which offers a different export. The export file can be imported too</li>
                                                    <li>The direct import uses this syntax without a header line: firstname;lastname;email;group</li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Manage your participants</Card.Title>
                                <Card.Text>
                                    <span className={'docs-text'}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquet mi
                                    vitae augue ultricies, eget vulputate nisi vestibulum. Fusce aliquam enim sit
                                    amet orci aliquet, at cursus neque feugiat. Pellentesque quis mauris et odio
                                    molestie vestibulum. Nullam fermentum efficitur ex nec volutpat. Proin nec
                                    vestibulum lectus. Nullam facilisis auctor risus. Sed vitae pellentesque leo.
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Choosing the Settings</Card.Title>
                                <Card.Text>
                                    <span className={'docs-text'}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquet mi
                                    vitae augue ultricies, eget vulputate nisi vestibulum. Fusce aliquam enim sit
                                    amet orci aliquet, at cursus neque feugiat. Pellentesque quis mauris et odio
                                    molestie vestibulum. Nullam fermentum efficitur ex nec volutpat. Proin nec
                                    vestibulum lectus. Nullam facilisis auctor risus. Sed vitae pellentesque leo.
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body id='section-three'>
                                <Card.Title>Working with the results</Card.Title>
                                <Card.Text>
                                    <span className={'docs-text'}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquet mi
                                    vitae augue ultricies, eget vulputate nisi vestibulum. Fusce aliquam enim sit
                                    amet orci aliquet, at cursus neque feugiat. Pellentesque quis mauris et odio
                                    molestie vestibulum. Nullam fermentum efficitur ex nec volutpat. Proin nec
                                    vestibulum lectus. Nullam facilisis auctor risus. Sed vitae pellentesque leo.
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
  );
}

export default DocsComponent;
