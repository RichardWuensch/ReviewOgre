import React from 'react';
import './ReviewWindow.css';
import { Accordion, ListGroup } from 'react-bootstrap';
import ReviewCard from './ReviewCard';
import { useRoomSlots } from '../../window/context/RoomSlotContext';

function ReviewWindow () {
  const roomSlots = useRoomSlots();

  return (
      <div className={'reviewsWindow'}>
          <div className={'reviews-list-container'}>
              <Accordion defaultActiveKey="0">
                  <div className={'overflow-container'}>
                      <ListGroup className={'list-group'}>
                          {roomSlots.map((roomSlot, roomSlotIndex) => (
                            roomSlot.getRooms().map((room, roomIndex) => (
                                  <ListGroup.Item key={roomIndex}>
                                      <ReviewCard
                                          key={roomSlot.getId()}
                                          eventKey={room}
                                          room={room}
                                          reviewTime={roomSlot.getFormattedStartTime() + ' - ' + roomSlot.getFormattedEndTime()}/>
                                  </ListGroup.Item>
                            ))
                          ))}
                      </ListGroup>
                  </div>
              </Accordion>
          </div>
      </div>
  );
}
export default ReviewWindow;
