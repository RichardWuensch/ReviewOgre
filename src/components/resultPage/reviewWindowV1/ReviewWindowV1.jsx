/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import React, { useState } from 'react';
import './ReviewWindowV1.css';
import {Accordion, Col, Row, Table} from 'react-bootstrap';
import { useRoomSlots } from '../../shared/context/RoomSlotContext';
import CustomButton from "../../shared/buttons/button/CustomButton";
import ExportOptions from "../exportOptions/ExportOptions";

function ReviewWindow () {
    const roomSlots = useRoomSlots();
    const [activeKey, setActiveKey] = useState(0);
    const [showExportOptions, setShowExportOptions] = useState(false);

    const handleAccordionItemClick = (eventKey) => {
        setActiveKey(eventKey === activeKey ? null : eventKey);
    };

    // calculate fairness
    /* useEffect(() => {
      const meanParticipantTotalCount =
        participants.reduce(
          (slotCount, p) => slotCount + p.getActiveSlots().length,
          0
        ) / participants.length;

      participants.forEach((p) => p.calculateFairness(meanParticipantTotalCount));
    }, [participants]); */

    return (
        <>
            <Row className='justify-content-center'>
                <Col style={{ maxWidth: '200px' }}>
                    <CustomButton
                        backgroundColor={'#B0D7AF'}
                        onButtonClick={() => setShowExportOptions(true)}
                        toolTip={'Click to show export options, e.g. export results, room plan, RevAger Lite files, ...'}>
                        Show Export Options
                    </CustomButton>
                </Col>
            </Row>
            <Accordion
                activeKey={activeKey}
                onSelect={handleAccordionItemClick}
                style={{ height: '70vh' }}
            >
                <div className={'overflow-container'} style={{ maxHeight: '100%' }}>
                    {roomSlots.map((roomSlot, roomSlotIndex) =>
                        roomSlot.getRooms().map((room, roomIndex) => {
                            const accordionItemKey = `${roomSlotIndex}-${roomIndex}`;

                            return (
                                <Accordion.Item
                                    key={accordionItemKey}
                                    eventKey={accordionItemKey}
                                >
                                    <Accordion.Header className={'header-style list-item border-0'}>
                                        <h5 style={{color: 'black'}}>{'Group ' + room.getReview()?.getGroupName() + ' meeting in Room ' + room.getName() +
                                            ' from ' + roomSlot.getFormattedStartTime() + ' to ' + roomSlot.getFormattedEndTime() + ' o\'Clock'}</h5>

                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Table
                                            responsive
                                            borderless
                                            className={'overflow-auto reviews-table'}
                                        >
                                            <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email Address</th>
                                                <th>Role</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{room.getReview()?.getAuthor()?.getFirstName()}</td>
                                                <td>{room.getReview()?.getAuthor()?.getLastName()}</td>
                                                <td>{room.getReview()?.getAuthor()?.getEmail()}</td>
                                                <td>Author</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {room.getReview()?.getModerator()?.getFirstName()}
                                                </td>
                                                <td>
                                                    {room.getReview()?.getModerator()?.getLastName()}
                                                </td>
                                                <td>{room.getReview()?.getModerator()?.getEmail()}</td>
                                                <td>Moderator</td>
                                            </tr>
                                            <tr>
                                                <td>{room.getReview()?.getNotary()?.getFirstName()}</td>
                                                <td>{room.getReview()?.getNotary()?.getLastName()}</td>
                                                <td>{room.getReview()?.getNotary()?.getEmail()}</td>
                                                <td>Notary</td>
                                            </tr>
                                            {room
                                                .getReview()
                                                ?.getReviewer()
                                                .map((reviewer) => (
                                                    <tr key={reviewer.getId()}>
                                                        <td>{reviewer.getFirstName()}</td>
                                                        <td>{reviewer.getLastName()}</td>
                                                        <td>{reviewer.getEmail()}</td>
                                                        <td>Reviewer</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            );
                        })
                    )}
                </div>
            </Accordion>
            <ExportOptions
                show={showExportOptions}
                onHide={() => setShowExportOptions(false)}
            />
        </>

    );
}

export default ReviewWindow;
