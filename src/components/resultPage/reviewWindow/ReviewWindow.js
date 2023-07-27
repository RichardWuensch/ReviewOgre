import React, { useState } from 'react';
import './ReviewWindow.css';
import { Accordion, Image, Table } from 'react-bootstrap';
import { useRoomSlots } from '../../shared/context/RoomSlotContext';
import Participant from '../../../data/models/Participant';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import deleteButton from '../../../assets/media/trash.svg';
import CustomIconButton from '../../shared/buttons/iconButton/CustomIconButton';

function Droppable ({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    color: isOver ? 'grey' : undefined
  };

  return (
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
  );
}

function Draggable ({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        backgroundColor: '#D3D3D3',
        zIndex: 999
      }
    : undefined;

  return (
      <tr ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {children}
      </tr>
  );
}

function ReviewWindow () {
  const roomSlots = useRoomSlots();
  const [activeKey, setActiveKey] = useState(0);
  const [containerOfItem, setContainerOfItem] = useState({});
  const items = [
    new Participant(675, 'Richard', 'Wünsch', 'richard.wuensch@study.thws.de', 5),
    new Participant(676, 'Basti', 'Schindler', 'richard.wuensch@study.thws.de', 14),
    new Participant(666, 'Daniel', 'Kulesz', 'richard.wuensch@study.thws.de', 56),
    new Participant(555, 'Jakob', 'Rechberger', 'richard.wuensch@study.thws.de', 5),
    new Participant(444, 'Nico', 'Stoll', 'richard.wuensch@study.thws.de', 99),
    new Participant(333, 'Hannah', 'Meinhardt', 'richard.wuensch@study.thws.de', 3)
  ];

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
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      const reviewer = items.find(item => item.getId().toString() === active.id);
      const roomSlotId = over.id.split('-')[0];
      const roomId = over.id.split('-')[1];

      const roomSlot = roomSlots[roomSlotId];
      const room = roomSlot.getRooms()[roomId];
      room.getReview().addReviewer(roomSlots, roomSlots.indexOf(roomSlot), reviewer);

      setContainerOfItem({
        ...containerOfItem,
        [active.id]: over.id
      });
    }
  };

  return (
      <DndContext onDragEnd={handleDragEnd}>
      <div className={'result-container'}>
        <Table
            responsive
            borderless
            className={'overflow-auto reviews-table'}
            style={{ zIndex: 0 }}
        >
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Role</th>
          </tr>
          </thead>
          {items.map((reviewer) => (
              <Draggable key={reviewer.getId()} id={reviewer.getId().toString()}>
                  <td>{reviewer.getFirstName()}</td>
                  <td>{reviewer.getLastName()}</td>
                  <td>{reviewer.getEmail()}</td>
                <td>Reviewer</td>
              </Draggable>
          ))}
        </Table>
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
                <Droppable id={accordionItemKey}>
                  <Accordion.Header
                      className={'header-style list-item border-0'}
                  >
                  <div className={'review-header'}>
                     <div className={'review-text'} style={{ paddingLeft: 5 }}>
                      {room.getReview()?.getGroupName()}
                     </div>
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
                    className={'overflow-auto'}
                  >
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Role</th>
                      </tr>
                    </thead>
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
                            <td> <CustomIconButton
                                onButtonClick={() => {
                                  room.getReview().deleteReviewer(roomSlots, roomSlots.indexOf(roomSlot), reviewer);
                                }}
                                toolTip={'Remove Reviewer from review'}>
                              <Image src={deleteButton} alt={'icon'} height={12}
                                     width={12}/>
                            </CustomIconButton></td>
                          </tr>
                        ))}
                  </Table>
                </Accordion.Body>
                </Droppable>
              </Accordion.Item>
            );
          })
        )}
      </div>
    </Accordion>
      </div>
      </DndContext>
  );
}

export default ReviewWindow;
