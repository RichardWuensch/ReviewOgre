import React, { useState } from 'react';
import './ReviewWindow.css';
import { Col, Image, Row, Table } from 'react-bootstrap';
import { useRoomSlots } from '../../shared/context/RoomSlotContext';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import deleteButton from '../../../media/trash.svg';
import CustomIconButton from '../../shared/buttons/iconButton/CustomIconButton';
import { useParticipants } from '../../shared/context/ParticipantsContext';
import CustomButton from '../../shared/buttons/button/CustomButton';
import ExportOptions from '../exportOptions/ExportOptions';

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
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        width: '25vw',
        borderRadius: '5px',
        fontWeight: 'bold'
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
  const [containerOfItem, setContainerOfItem] = useState({});
  const items = useParticipants();
  const [showExportOptions, setShowExportOptions] = useState(false);

  const [deleteTrigger, setDeleteTrigger] = useState(0);

  const handleDragEnd = (event) => {
    try {
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
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteFromReview = (room, roomSlot, reviewer) => {
    try {
      room.getReview().deleteReviewer(roomSlots, roomSlots.indexOf(roomSlot), reviewer);
      console.log(deleteTrigger);
      setDeleteTrigger(prev => prev + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
        <DndContext onDragEnd={handleDragEnd}>
          <Row style={{ maxHeight: '75vh' }}>
            <Col xl={8}>
                <div style={{ maxHeight: '100%' }}>
                  {roomSlots.map((roomSlot, roomSlotIndex) =>
                    roomSlot.getRooms().map((room, roomIndex) => {
                      const accordionItemKey = `${roomSlotIndex}-${roomIndex}`;

                      return (
                              <Droppable id={accordionItemKey} key={accordionItemKey}>
                                  <h5>{'Group ' + room.getReview()?.getGroupName() + ' meeting in Room ' + room.getName() +
                                      ' from ' + roomSlot.getFormattedStartTime() + ' to ' + roomSlot.getFormattedEndTime() + ' o\'Clock'}</h5>

                                  <Table
                                      responsive
                                      borderless
                                      style={{ borderColor: room.getReview()?.isReviewValid() ? 'indianred' : 'white' }}
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
                                      .getReview()?.getReviewer()
                                      .map((reviewer) => (
                                            <tr key={reviewer.getId()}>
                                              <td>{reviewer.getFirstName()}</td>
                                              <td>{reviewer.getLastName()}</td>
                                              <td>{reviewer.getEmail()}</td>
                                              <td>Reviewer</td>
                                              <td>
                                                  <CustomIconButton
                                                  onButtonClick={() => deleteFromReview(room, roomSlot, reviewer)}
                                                  toolTip={'Remove Reviewer from review'}>
                                                    <Image src={deleteButton} alt={'icon'} height={12} width={12}/>
                                                </CustomIconButton>
                                              </td>
                                            </tr>
                                      ))}
                                  </Table>
                              </Droppable>
                      );
                    })
                  )}
                </div>
            </Col>
            <Col xl={4}>
              <CustomButton
                  backgroundColor={'#B0D7AF'}
                  onButtonClick={() => setShowExportOptions(true)}
                  toolTip={'Click to show export options, e.g. export results, room plan, RevAger Lite files, ...'}>
                Show Export Options
              </CustomButton>

              <Table
                  responsive
                  borderless
                  className={'reviews-table'}
                  style={{ zIndex: 0, marginTop: '20px' }}
              >
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
                </thead>
                {items.map((reviewer) => (
                    <Draggable key={reviewer.getId()} id={reviewer.getId().toString()}>
                      <td>{reviewer.getFirstName() + ' ' + reviewer.getLastName()}</td>
                      <td>{reviewer.getEmail()}</td>
                    </Draggable>
                ))}
              </Table>
            </Col>
          </Row>
          <ExportOptions
              show={showExportOptions}
              onHide={() => setShowExportOptions(false)}
          />
        </DndContext>
  );
}

export default ReviewWindow;
