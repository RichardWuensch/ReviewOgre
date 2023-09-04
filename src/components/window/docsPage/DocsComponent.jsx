import './DocsComponent.css';
import React from 'react';
import {Container, Row, Col, Card, Image} from 'react-bootstrap';
import edit from '../../../media/pencil-square.svg';
import deleteButton from '../../../media/trash.svg';
import add from '../../../media/plus-circle.svg';

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
                                        This tools is best used in combination with the <a href={'https://gitlab.com/kkohut/revager-lite'} target="_blank">RevAger/RevAgerLite</a>
                                        application, as we offer export-files which can be directly imported into these tools.
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
                                                <b style={{ fontWeight: 'bold' }}>Import you previous state from your local device: </b>
                                                 You  are able to import data you have
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
                            <Card.Body id='participants'>
                                <Card.Title>Manage your participants</Card.Title>
                                <Card.Text>
                                    <span className={'docs-text'}>
                                        <p>You can add Participants by clicking the "Add Participant" Button. This will open a popup
                                        where you can enter the participants relevant information. By confirming this action the participant will be added to the list of participants.
                                        </p>
                                        <p>You have following options of editing participants: </p>
                                        <ol>
                                             <li>
                                                 Edit data of a specific participant by clicking the <Image src={edit} alt={'icon'}/> Icon next to the desired participant
                                             </li>
                                            <li>
                                                Edit data of multiple participants by clicking the "Edit List" Button and selecting all
                                                Participants which you would like to edit. Now click the "Edit Selected" Button. You can now edit data and either save or discard your changes.
                                            </li>
                                        </ol>
                                        You can also delete either a specific or multiple participants:
                                        <ol>
                                            <li>
                                                Click the <Image src={deleteButton} alt={'icon'}/> next to a participant to delete the respective participant.
                                            </li>
                                            <li>
                                                You can also select multiple participants with the "Edit List" Button and delete them by pressing the "Delete Selected" Button.
                                            </li>
                                            You will be prompted by a popup asking you to confirm the deletion.
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
                            <Card.Body id='slots-and-rooms'>
                                <Card.Title>Manage Slots and Rooms</Card.Title>
                                <Card.Text>
                                    <span className={'docs-text'}>
                                        <p>
                                            Slots and Rooms are an essential part of ReviewOger. Technical Reviews will be scheduled according
                                            to the Slots and Rooms that are added. A Slot is a adjustable timeframe and Rooms in this Slot are a representation
                                            of physical rooms in which the reviews will be held. The same room can be in different slots so they can be reused for other reviews.
                                            Before calculating review assignments you should make sure that these rooms are available in the stated timeframe.
                                        </p>
                                        <p>Like Participants you can also edit Slots and Rooms and adjust their settings:
                                        </p>
                                        <ul>
                                            <li>
                                                You can add a Slot by clicking the "Add Slot" Button. This will open a popup where you
                                            enter a date and time for this slot. By clicking the <Image src={add} alt={'icon'}/> Button you can add a room to this Slot.
                                            A room requires a name and you can specify whether a beamer is available for this room.
                                            </li>
                                            <li>
                                                Slots and rooms can be edited by clicking the <Image src={edit} alt={'icon'}/> Button next to the slot.
                                                You can adjust the timeframe and add, edit or delete a room as well. Changes are saved once you press the "Save Changes" button.
                                            </li>
                                            <li>
                                                Be aware that deleting a slot also deletes all rooms in this slot. Rooms that are also in other slots will be deleted however they are
                                                still available in  other slots. It just means that this room is no longer available in this timeframe.
                                            </li>
                                        </ul>
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body id='settings'>
                                <Card.Title>Choosing the Settings</Card.Title>
                                <Card.Text>
                                    <span className={'docs-text'}>
                                    You have different options to tell the algorithm how participants will be assigned to reviews
                                        by clicking the "Settings" Button in the bottom right corner. This will open a popup with following options:
                                        <ul>
                                            <li>
                                                <b style={{ fontWeight: 'bold' }}>Author is Notary: </b>
                                                The author of each review is also the notary.
                                            </li>
                                            <li>
                                                 <b style={{ fontWeight: 'bold' }}>Break for Moderator and Reviewer: </b>
                                                 This option will allow participants that have the role of moderator or reviewer to
                                                have a break before their next review by skipping their next possible review
                                            </li>
                                            <li>
                                                 <b style={{ fontWeight: 'bold' }}>A/B Review: </b>
                                                The review participants worked on a different topic than the author. This setting is intended to prevent idea theft and can only be used if international groups are disabled.
                                            </li>
                                            <li>
                                                 <b style={{ fontWeight: 'bold' }}>International Groups:  </b>
                                                The RevOger primarily tries to assign the international reviews according to
                                                the same scheme as the others. In order to offer a high-quality review experience
                                                to non-German-speaking participants and to enable reviews with at least 6 international
                                                students in 2 groups, the RevOger works slightly differently in these cases and uses
                                                participants from the author group for the roles of notary and moderator.
                                                Alternatively, you can also conduct a separate run exclusively for the international students.
                                            </li>
                                        </ul>

                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body id='working-with-results'>
                                <Card.Title>Working with the results</Card.Title>
                                <Card.Text>
                                    <span className={'docs-text'}>
                                        When the algorithm has successfully calculated a schedule you will be redirected to
                                        a results page:
                                        <p>
                                            An overview of all scheduled reviews in each room will be displayed
                                            with each role assigned to a participant.
                                        </p>
                                         <p>
                                            You have following options to change the results:
                                        </p>
                                            <ul>
                                            <li>
                                                <b style={{ fontWeight: 'bold' }}>Change assignments:  </b>
                                                You have the option to change the calculated by dragging a participant
                                                from the right column into the review you want. This participant will then be assigned
                                                to this review as another reviewer. You can also remove reviewers from their reviews.
                                                ReviewOger will tell you if a participant is not available
                                                for the review you dragged the participant into.
                                            </li>
                                        </ul>
                                        <p>
                                            You can export the results by clicking the "Show Export Options" Button.
                                            This will open a popup with different export options:
                                            <ul>
                                                <li>
                                                     <b style={{ fontWeight: 'bold' }}>Open in Mailclient:  </b> This will
                                                    open your preferred mail-provider and allow you to directly send invitations
                                                    to all moderators with details about the upcoming review and its participants.
                                                </li>
                                                <li>
                                                    <b style={{ fontWeight: 'bold' }}>Export Mail list:  </b> Another browser window will
                                                    open and give you the mail text as well as addresses in plain text that you
                                                    can download and alter to your liking
                                                </li>
                                                <li>
                                                    <b style={{ fontWeight: 'bold' }}>Result as txt:  </b> This will download the
                                                    results in .txt file format.
                                                </li>
                                                <li>
                                                    <b style={{ fontWeight: 'bold' }}>Result as JSON:  </b> This will download the
                                                    results in .json file format.
                                                </li>
                                                 <li>
                                                    <b style={{ fontWeight: 'bold' }}>Download Table:  </b> This will download
                                                     a PDF to your system with a room plan for the scheduled reviews to give you an
                                                     overview of the rooms that are used in the respective time slot.
                                                </li>
                                                <li>
                                                    <b style={{ fontWeight: 'bold' }}>Download Matrix:  </b> This will download
                                                     a PDF to your system with matrix to give you a better understanding
                                                    when rooms are occupied and when they are unused to eventually cancel
                                                    the booking of unused rooms.
                                                </li>
                                                <li>
                                                    <b style={{ fontWeight: 'bold' }}>Export reviews:  </b> A file compatible
                                                    with the <a href={'https://gitlab.com/kkohut/revager-lite'} target="_blank">RevAgerLite</a> file format will be downloaded
                                                    for further enhancement and improving quality of the reviews.
                                                </li>
                                            </ul>
                                        </p>

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
