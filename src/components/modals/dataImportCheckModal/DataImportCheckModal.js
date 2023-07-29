import React, { useState } from 'react';
import './DataImportCheckModal.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import exit from '../../../assets/media/x-circle.svg';
import { Accordion, ListGroup, Image, Card, Table, useAccordionButton } from 'react-bootstrap';
import ModalButton from '../../shared/buttons/modalButton/ModalButton';
import CustomIconButton from '../../shared/buttons/iconButton/CustomIconButton';
import alarmImage from '../../../assets/media/alarm-fill.svg';
import locationImage from '../../../assets/media/geo-alt-fill.svg';

function DataImportCheckModal ({ importedRoomSlots, importedParticipants, importedSettings, onAddData, onOverwriteData, title, text, onHide, ...props }) {
  const openAccordion = useAccordionButton(0, () => {});
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const expandAndToggle = () => {
    openAccordion(undefined);
    setIsAccordionOpen(prevOpen => prevOpen !== true);
  };

  return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'modal'}
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                <Image src={exit} alt={'exitModal'} className={'modal-header-icon'} onClick={onHide}/>
            </Modal.Header>
            <Modal.Body>
                <div className={'participants-slots-settings-import'}>
                    <div className={'participant-import'}>
                        <h3 className={'title-subheadline'}>Participants</h3>
                        <div className={'list-description'}>
                            <div className={'participant-list-container'}>
                                <Table responsive borderless className={'participant-table'}>
                                    <thead style={{ position: 'sticky', top: '0', zIndex: '1', background: 'white' }}>
                                        <tr>
                                            <th className={'column-firstName'} style={{ fontSize: '1.2em' }}>First Name</th>
                                            <th className={'column-lastName'} style={{ fontSize: '1.2em' }}>Last Name</th>
                                            <th className={'column-email-header'} style={{ fontSize: '1.2em' }}>Email Address</th>
                                            <th className={'column-team'} style={{ fontSize: '1.2em' }}>Team</th>
                                            <th className={'column-topic'} style={{ fontSize: '1.2em' }}>Topic</th>
                                            <th className={'column-languageLevel'} style={{ fontSize: '1.2em' }}>German Skill Level</th>
                                            <th className={'column-options'} style={{ fontSize: '1.2em' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {importedParticipants.map((participant) => (
                                            <tr key={participant.getId()} style={{ borderBottom: '1px solid black' }}>
                                                <td className={'column-firstName'}>{participant.getFirstName()}</td>
                                                <td className={'column-lastName'}>{participant.getLastName()}</td>
                                                <td className={'column-email'}>{participant.getEmail()}</td>
                                                <td className={'column-group'} style={{ justifySelf: 'center' }} >{participant.getGroup()}</td>
                                                <td className={'column-topic'}>{participant.getTopic()}</td>
                                                <td className={'column-languageLevel'}>{participant.getLanguageLevel()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className={'slots-settings-import'}>
                        <div className={'slots-import'}>
                            <h3 className={'title-subheadline'}>Slots</h3>
                            <Accordion defaultActiveKey="0">
                                <div className={'overflow-container-roomslots-import'}>
                                    <ListGroup className={'list-group-import'}>
                                        <ListGroup.Item style={{ padding: 0 }}>
                                            <Card>
                                                <Card.Header className={'list-item-import'}>
                                                    <div className={'slots-import-infos'}>
                                                        <CustomIconButton
                                                            onButtonClick={() => expandAndToggle()}
                                                            toolTip={isAccordionOpen ? 'Click to hide rooms' : 'Click to show rooms'}>
                                                            <Image src={alarmImage} alt={'alarmImage'} />
                                                            <span className={'slot-text'} style={{ paddingLeft: 5 }}>
                                                                Slot Description
                                                            </span>
                                                        </CustomIconButton>
                                                    </div>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey='0'>
                                                    <Card.Body>
                                                        <ul style={{ listStyle: 'none', overflowY: 'auto' }}>
                                                            <li>
                                                                <div className={'room-import-properties'}>
                                                                    <Image src={locationImage} alt={'locationImage'} />
                                                                    <span style={{ paddingLeft: 5 }}>Raum Name</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </Accordion>
                        </div>
                        <div className={'radio-container-import'}>
                            <h3 className={'title-subheadline'} style={{ paddingTop: '20px' }}>Settings</h3>
                            <div className={'radio-container-import-content'}>
                                {!importedSettings
                                  ? (
                                      <span>No imported Settings</span>
                                    )
                                  : (
                                        <ul className="bullet-list">
                                          <li>
                                            <span style={{ display: 'block', paddingLeft: 10 }}>Author is
                                                {!importedSettings?.authorIsNotary ? (<span><strong> not </strong> a </span>) : (<span> </span>)
                                                }
                                                a Notary</span>
                                          </li>
                                          <li>
                                            <span style={{ display: 'block', paddingLeft: 10 }}>
                                                {!importedSettings?.breakForModeratorAndReviewer ? (<span><strong>No</strong> b</span>) : (<span>B</span>)
                                                }
                                            reak for Moderator and Reviewer</span>
                                          </li>
                                          <li>
                                            <span style={{ display: 'block', paddingLeft: 10 }}>
                                                {!importedSettings?.abReview ? (<strong>No </strong>) : (<span></span>)
                                                }
                                                A/B Review</span>
                                          </li>
                                          <li>
                                            <span style={{ display: 'block', paddingLeft: 10 }}>
                                                {!importedSettings?.internationalGroups ? (<strong>No </strong>) : (<span></span>)
                                                }
                                                International Groups</span>
                                          </li>
                                        </ul>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                  <div className={'text-container text-center'}>
                    <div className={'delete-title-subheadline'} style={{ fontSize: '1.2em', whiteSpace: 'pre-line', fontWeight: 'bold' }}>
                      Do you want to overwrite the already existing data in your list or add the imported data to the list?
                    </div>
                  </div>
                  <div className={'import-buttons'}>
                    <div className={'button-import-options'}>
                      <ModalButton
                        backgroundColor={ '#B0D7AF' }
                        onButtonClick={() => { onOverwriteData(); onHide(); }}
                      > Overwrite </ModalButton>
                    </div>
                    <div className={'button-import-options'}>
                      <ModalButton
                        className={'button-import-options'}
                        backgroundColor={ '#B0D7AF' }
                        onButtonClick={() => { onAddData(); onHide(); }}
                      > Add </ModalButton>
                    </div>
                    <div className={'button-import-options'}>
                      <ModalButton
                        className={'button-import-options'}
                        backgroundColor={ '#C40233' }
                        onButtonClick={onHide}
                      > Cancel </ModalButton>
                  </div>
                </div>

            </Modal.Body>
        </Modal>
  );
}
DataImportCheckModal.propTypes = {
  importedRoomSlots: PropTypes.array,
  importedParticipants: PropTypes.array.isRequired,
  importedSettings: PropTypes.object,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  onOverwriteData: PropTypes.func.isRequired,
  onAddData: PropTypes.func.isRequired
};
export default DataImportCheckModal;
