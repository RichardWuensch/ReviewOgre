import './ResultCalculationPage.css';
import { Container } from 'react-bootstrap';
import React from 'react';
import { useRoomSlots } from '../shared/context/RoomSlotContext';
// import ReviewWindowV1 from './reviewWindowV1/ReviewWindowV1';
import ReviewWindow from './reviewWindow/ReviewWindow';

function ResultCalculationPage () {
  const roomSlots = useRoomSlots();

  const hasReviewResults = () => {
    return [...roomSlots.flatMap((roomSlot) => roomSlot.getRooms())]
      .filter((room) => room.getReview() !== null)
      .length;
  };

  return (
      <div className="review-page">
          {hasReviewResults()
            ? <Container>
                  <ReviewWindow />
              </Container>
            : <Container className="d-flex justify-content-center align-items-center">
                <h3>No Reviews calculated yet</h3>
              </Container>}

      </div>
  );
}
export default ResultCalculationPage;
