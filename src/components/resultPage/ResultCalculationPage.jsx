/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

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
