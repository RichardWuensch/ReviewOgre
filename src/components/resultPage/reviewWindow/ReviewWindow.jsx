import React, { useEffect, useState } from 'react';
import './ReviewWindow.css';
import { Col, Image, Row, Table } from 'react-bootstrap';
import { useRoomSlots } from '../../shared/context/RoomSlotContext';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import deleteButton from '../../../media/trash.svg';
import CustomIconButton from '../../shared/buttons/iconButton/CustomIconButton';
import { useParticipants } from '../../shared/context/ParticipantsContext';
import CustomButton from '../../shared/buttons/button/CustomButton';
import ExportOptions from '../exportOptions/ExportOptions';
import { useSettings } from '../../shared/context/SettingsContext';
import ParticipantFairness from '../../../data/models/ParticipantFairness';
import ParticipantFairnessIndicator from '../participantFairness/ParticipantFairnessIndicator';
import ErrorModal from '../../modals/errorModal/ErrorModal';

function Droppable ({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
  };

  return (
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
  );
}

function Draggable ({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const tdStyle = transform ? { backgroundColor: 'transparent' } : { backgroundColor: 'white' };
  const [scrollY, setScrollY] = useState(0);

  const calculateTransform = () => {
    if (transform) {
      return {
        transform: `translate3d(${transform.x}px, ${transform.y - scrollY}px, 0)`,
        backgroundColor: '#D3D3D3',
        position: 'fixed',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        width: '25vw',
        borderRadius: '5px',
        fontWeight: 'bold'
      };
    }

    return undefined;
  };

  useEffect(() => {
    const tableContainer = document.querySelector('.participant-result-list-container .table-container');
    if (tableContainer) {
      setScrollY(tableContainer.scrollTop);
    }
  }, [transform]);

  return (
      <tr ref={setNodeRef} style={calculateTransform()} {...listeners} {...attributes}>
        {React.Children.map(children, child =>
          React.cloneElement(child, { style: tdStyle })
        )}
      </tr>
  );
}

function ReviewWindow () {
  const roomSlots = useRoomSlots();
  const settings = useSettings();
  const [containerOfItem, setContainerOfItem] = useState({});
  const items = useParticipants();
  const [participantDragError, setParticipantDragError] = React.useState(null);
  const [sortedParticipants, setSortedParticipants] = useState([]);
  const [avgCounts, setAvgCounts] = useState({
    totalCount: 0,
    reviewerCount: 0
  });
  const [showExportOptions, setShowExportOptions] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [deleteTrigger, setDeleteTrigger] = useState(0);

  React.useEffect(() => {
    calculateFairness();
  }, []);

  const calculateFairness = () => {
    // eslint-disable-next-line no-return-assign
    const avgParticipantTotalCount = Math.round(items.reduce((sum, participant) => sum += participant.getTotalCount(), 0) / items.length);
    // eslint-disable-next-line no-return-assign
    const avgParticipantReviewerCount = Math.round(items.reduce((sum, participant) => sum += participant.getReviewerCount(), 0) / items.length);
    setAvgCounts({
      totalCount: avgParticipantTotalCount,
      reviewerCount: avgParticipantReviewerCount
    });
    for (const participant of items) {
      participant.calculateFairness(avgParticipantTotalCount, avgParticipantReviewerCount);
    }
    setSortedParticipants(ParticipantFairness.sortParticipantsByFairness(items));
  };

  const handleDragEnd = (event) => {
    try {
      const { active, over } = event;

      const reviewer = items.find(item => item.getId().toString() === active.id);

      selectedRoom.getReview().addReviewerDragnDrop(roomSlots, roomSlots.indexOf(selectedSlot), reviewer, settings.breakForModeratorAndReviewer);

      setSelectedSlot(null);
      setSelectedRoom(null);

      calculateFairness();
      setContainerOfItem({
        ...containerOfItem,
        [active.id]: active.id
      });
    } catch (error) {
      // TODO: this is a quick fix! Needs to be fixed permanently
      if (error.message === 'Participant is not possible for this review' ||
      error.message === 'Because of breakForModeratorAndReviewer is selected, this participant is not possible for this review. ' +
          'If you want to break the rule, please change the appropriate setting and return.') {
        setParticipantDragError(error);
      }
    }
  };

  const deleteFromReview = (room, roomSlot, reviewer) => {
    try {
      room.getReview().deleteReviewer(roomSlots, roomSlots.indexOf(roomSlot), reviewer, settings.breakForModeratorAndReviewer);
      calculateFairness();
      setDeleteTrigger(prev => prev + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
        <DndContext onDragEnd={handleDragEnd}>
          <Row style={{ maxHeight: '75vh' }}>
            <Col xl={8}>
              <div className={'review-list-container'}>
                <div style={{ maxHeight: '100%' }}>
                  {roomSlots.map((roomSlot, roomSlotIndex) =>
                    roomSlot
                      .getRooms()
                      .filter(room => room.getReview()?.getAuthor())
                      .map((room, roomIndex) => {
                        const accordionItemKey = `${roomSlotIndex}-${roomIndex}`;

                        return (
                            <div
                                id={accordionItemKey}
                                style={{ fontWeight: selectedRoom === room ? 'bold' : 'normal' }}
                                onMouseEnter={() => { setSelectedSlot(roomSlot); setSelectedRoom(room); }}>
                              <Droppable id={accordionItemKey} key={accordionItemKey}>
                                <h5>{`Group ${room.getReview()?.getGroupName()} in Room ${room.getName()} on ${roomSlot.getFormattedDate()} from ${roomSlot.getFormattedStartTime()} to ${roomSlot.getFormattedEndTime()}`}</h5>
                                { room.getReview().isReviewValid()
                                  ? <h5 style={{ color: 'red' }}>Review is invalid</h5>
                                  : null
                                }
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
                            </div>
                        );
                      })
                  )}
                </div>
              </div>
            </Col>
            <Col xl={4}>
              <CustomButton
                  backgroundColor={'#B0D7AF'}
                  onButtonClick={() => setShowExportOptions(true)}
                  toolTip={'Click to show export options, e.g. export results, room plan, RevAger Lite files, ...'}>
                Show Export Options
              </CustomButton>
              <div className={'participant-result-list-container'}>
                <div className={'table-container'}>
              <Table
                  responsive
                  borderless
              >
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Fairness</th>
                </tr>
                </thead>
                <tbody>
                {sortedParticipants.map((reviewer) => (
                    <Draggable key={reviewer.getId()} id={reviewer.getId().toString()}>
                      <td>{reviewer.getFirstName() + ' ' + reviewer.getLastName()}</td>
                      <td>{reviewer.getEmail()}</td>
                      <td>
                        <ParticipantFairnessIndicator participant={reviewer} avgCounts={avgCounts} />
                      </td>
                    </Draggable>
                ))}
                </tbody>
              </Table>
              </div>
              </div>
            </Col>
          </Row>
          <ExportOptions
              show={showExportOptions}
              onHide={() => setShowExportOptions(false)}
          />
          <ErrorModal
              show={participantDragError !== null}
              errorObject={participantDragError}
              modalHeader={"Can't put Participant in this Review"}
              onHide={() => setParticipantDragError(null)} />
        </DndContext>
  );
}

export default ReviewWindow;
