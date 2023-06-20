import React, { useState } from 'react';
import './ReviewWindow.css';
import { Accordion, Table } from 'react-bootstrap';
import { useRoomSlots } from '../../shared/context/RoomSlotContext';

function ReviewWindow () {
  const roomSlots = useRoomSlots();
  const [activeKey, setActiveKey] = useState(0);

  const handleAccordionItemClick = (eventKey) => {
    setActiveKey(eventKey === activeKey ? null : eventKey);
  };

  /* useEffect(() => {
    const meanParticipantTotalCount =
      participants.reduce(
        (slotCount, p) => slotCount + p.getActiveSlots().length,
        0
      ) / participants.length;

    participants.forEach((p) => p.calculateFairness(meanParticipantTotalCount));
  }, [participants]); */

  return (
    <Accordion
      activeKey={activeKey}
      onSelect={handleAccordionItemClick}
      style={{ height: '60vh' }}
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
                  <div className={'review-header'}>
                    <span className={'review-text'} style={{ paddingLeft: 5 }}>
                      {room.getReview()?.getGroupName()}
                    </span>
                    <span className={'review-text'} style={{ paddingLeft: 5 }}>
                      {roomSlot.getFormattedStartTime() +
                        ' - ' +
                        roomSlot.getFormattedEndTime()}
                    </span>
                    <span className={'review-text'} style={{ paddingLeft: 5 }}>
                      {room.getName()}
                    </span>
                  </div>
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
  );
}

export default ReviewWindow;
