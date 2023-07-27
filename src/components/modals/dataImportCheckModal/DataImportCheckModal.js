import React, { useState } from 'react';
import './DataImportCheckModal.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import exit from '../../../assets/media/x-circle.svg';
import { Accordion, ListGroup, Image, Card, Table, useAccordionButton } from 'react-bootstrap';
import ModalButton from '../../shared/buttons/modalButton/ModalButton';
import Participant from '../../../data/models/Participant';
import CustomIconButton from '../../shared/buttons/iconButton/CustomIconButton';
import alarmImage from '../../../assets/media/alarm-fill.svg';
import locationImage from '../../../assets/media/geo-alt-fill.svg';
import CustomSwitch from '../../shared/buttons/switch/CustomSwitch';

function DataImportCheckModal ({ importedRoomSlots, importedParticipants, importedSettings, onAddData, onOverwriteData, title, text, onHide, ...props }) {
  const participantData = [
    new Participant(675, 'Richard', 'Wünsch', 'richard.wuensch@study.thws.de', 1),
    new Participant(676, 'Basti', 'Schindler', 'richard.wuensch@study.thws.de', 1),
    new Participant(666, 'Daniel', 'Kulesz', 'richard.wuensch@study.thws.de', 1),
    new Participant(555, 'Jakob', 'Rechberger', 'richard.wuensch@study.thws.de', 2),
    new Participant(444, 'Nico', 'Stoll', 'richard.wuensch@study.thws.de', 2),
    new Participant(333, 'Hannah', 'Meinhardt', 'richard.wuensch@study.thws.de', 2)
  ];
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
                <div className={'participant-import'}>
                    <div className={'participant-import-list-container'}>
                        <Table responsive borderless className={'participant-import-table'}>
                            <thead style={{ position: 'sticky', top: '0', zIndex: '1', background: 'white' }}>
                                <tr>
                                  <th className={'column-firstName'} style={{ fontSize: '1em' }}>First Name</th>
                                  <th className={'column-lastName'} style={{ fontSize: '1em' }}>Last Name</th>
                                  <th className={'column-email-header'} style={{ fontSize: '1em' }}>Email Address</th>
                                  <th className={'column-team'} style={{ fontSize: '1em' }}>Team</th>
                                  <th className={'column-topic'} style={{ fontSize: '1em' }}>Topic</th>
                                  <th className={'column-languageLevel'} style={{ fontSize: '1em' }}>German Skill Level</th>
                                  <th className={'column-options'} style={{ fontSize: '1em' }}></th>
                                </tr>
                            </thead>
                            <tbody style={{ position: 'sticky', top: '0', zIndex: '1', background: 'white' }}>
                                <tr>
                                    <td className={'column-firstName'}>Hannah</td>
                                    <td className={'column-lastName'}>Meinhardt</td>
                                    <td className={'column-email'}>hannah.meinhardt@study.thws.de</td>
                                    <td className={'column-group'} style={{ justifySelf: 'center' }} >2</td>
                                    <td className={'column-topic'}>Computer Science</td>
                                    <td className={'column-languageLevel'}>C2</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className={'slots-settings-import'}>
                    <div className={'slots-import'}>
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
                        <div className={'radio-container-import-content'}>
                            <CustomSwitch
                              isChecked={'true'}>
                                <span style={{ paddingLeft: 10 }}>Author is Notary</span>
                            </CustomSwitch>
                            <CustomSwitch
                              isChecked={'false'}>
                                <span style={{ paddingLeft: 10 }}> Break for Moderator and Reviewer </span>
                            </CustomSwitch>
                            <CustomSwitch
                              isChecked={'true'}>
                                <span style={{ paddingLeft: 10 }}>A/B Review</span>
                            </CustomSwitch>
                            <CustomSwitch
                              isChecked={'false'}>
                                <span style={{ paddingLeft: 10 }}>International Groups</span>
                            </CustomSwitch>
                        </div>
                    </div>
                </div>
                <div className={'text-container text-center'}>
                    <div className={'delete-title-subheadline'} style={{ fontSize: '1.2em', whiteSpace: 'pre-line', fontWeight: 'bold' }}>
                        Do you want to overwrite the already existing { text } in your list
                        <br/>or<br/>add the imported { text } to the list?
                    </div>
                </div>
                <div className={'footer'}>
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
                            onButtonClick={() => { console.log({ participantData }); onHide(); }}
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
