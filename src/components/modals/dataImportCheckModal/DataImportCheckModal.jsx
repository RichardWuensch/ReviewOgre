import React from 'react';
import './DataImportCheckModal.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import exit from '../../../assets/media/x-circle.svg';
import { Accordion, ListGroup, Image, Table } from 'react-bootstrap';
import CustomButton from '../../shared/buttons/button/CustomButton';
import SlotCard from '../../window/slotsWindow/Slot';
import Participant from '../../window/participantWindow/participant/Participant';

function DataImportCheckModal ({ importedRoomSlots, importedParticipants, importedSettings, onAddData, onOverwriteData, title, text, onHide, ...props }) {
  return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'modal-dataimportcheck'}
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                <Image src={exit} alt={'exitModal'} className={'modal-header-icon'} onClick={onHide}/>
            </Modal.Header>
            <Modal.Body>
                <div className={'participants-slots-settings-import'}>
                    <div className={'participant-import'}>
                        <h3 className={'title-subheadline'}>Participants</h3>
                        <div className={'list-description-import'}>
                            <div className={'participant-list-container-import'}>
                                <Table responsive borderless className={'participant-table-import'}>
                                    <thead style={{ position: 'sticky', top: '0', zIndex: '1', background: 'white' }}>
                                        <tr>
                                            <th className={'column-firstName'} style={{ fontSize: '1.2em' }}>First Name</th>
                                            <th className={'column-lastName'} style={{ fontSize: '1.2em' }}>Last Name</th>
                                            <th className={'column-email-header'} style={{ fontSize: '1.2em' }}>Email Address</th>
                                            <th className={'column-team'} style={{ fontSize: '1.2em' }}>Group</th>
                                            <th className={'column-topic'} style={{ fontSize: '1.2em' }}>Topic</th>
                                            <th className={'column-languageLevel'} style={{ fontSize: '1.2em' }}>German Skill Level</th>
                                            <th className={'column-options'} style={{ fontSize: '1.2em' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {importedParticipants?.map((participant) => (
                                            <tr key={participant.getId()} style={{ borderBottom: '1px solid black' }}>
                                                <Participant
                                                  participant={participant}
                                                  changePossible={false}/>
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
                            {!importedRoomSlots
                              ? (
                                  <div className={'radio-container-import-content'}>
                                      <span>No imported Slots</span>
                                  </div>
                                )
                              : (
                                  <div className={'slots-list-container-import'}>
                                      <Accordion defaultActiveKey="0">
                                          <div className={'overflow-container-roomslots-import'}>
                                              <ListGroup className={'list-group'}>
                                                {importedRoomSlots?.map((slot, index) => (
                                                    <ListGroup.Item className={'slots-infos-import'} key={index} style={{ padding: 0 }}>
                                                        <SlotCard
                                                          key={slot.getId()}
                                                          eventKey={index}
                                                          roomSlot={slot}
                                                          changePossible={false}/>
                                                    </ListGroup.Item>
                                                ))}
                                              </ListGroup>
                                          </div>
                                      </Accordion>
                                  </div>
                                )}
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
                      Do you want to overwrite the already existing data or add the imported data to the list?
                    </div>
                  </div>
                  <div className={'import-buttons'}>
                    <div className={'button-import-options'}>
                      <CustomButton
                        toolTip={'Overwrite the already existing data'}
                        backgroundColor={ '#B0D7AF' }
                        onButtonClick={() => { onOverwriteData(); onHide(); }}
                      > Overwrite </CustomButton>
                    </div>
                    <div className={'button-import-options'}>
                      <CustomButton
                        toolTip={'Add the imported data to the already existing data'}
                        className={'button-import-options'}
                        backgroundColor={ '#B0D7AF' }
                        onButtonClick={() => { onAddData(); onHide(); }}
                      > Add </CustomButton>
                    </div>
                    <div className={'button-import-options'}>
                      <CustomButton
                        toolTip={'Cancel'}
                        className={'button-import-options'}
                        backgroundColor={ '#C40233' }
                        onButtonClick={onHide}
                      > Cancel </CustomButton>
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
