import React from 'react';
import './ReviewWindow.css';
import { Accordion, ListGroup } from 'react-bootstrap';
import ReviewCard from './ReviewCard';
// import { useReviews } from '../../window/context/ReviewsContext';
import Review from '../../../data/model/Review';
import Participant from '../../../data/model/Participant';
import RoomSlot from '../../../data/model/RoomSlot';
import Room from '../../../data/model/Room';

function ReviewWindow () {
  // const reviews = useReviews();
  const reviews = [
    new Review(new Participant('-1', 'Max', 'Mustermann', 'max.mustermann@study.thws.de', '1', 'Informatik', 'A1'),
      new RoomSlot(-1, new Date(), new Date(), new Date(), [
        new Room('I.1.2', true),
        new Room('I.1.3', true)
      ])
    ),
    new Review(new Participant('0', 'Martina', 'Musterfrau', 'martina.musterfrau@study.thws.de', '2', 'Religion', 'B2'),
      new RoomSlot(0, new Date(), new Date(), new Date(), [
        new Room('I.2.2', true),
        new Room('I.2.3', true)
      ])
    )
  ];

  return (
      <div className={'reviewsWindow'}>
          <div className={'reviews-list-container'}>
              <Accordion defaultActiveKey="0">
                  <div className={'overflow-container'}>
                      <ListGroup className={'list-group'}>
                          {reviews.map((review, index) => (
                              <ListGroup.Item key={index}>
                                  <ReviewCard
                                      key={review.getId()}
                                      eventKey={index}
                                      singleReview={review}/>
                              </ListGroup.Item>
                          ))}
                      </ListGroup>
                  </div>
              </Accordion>
          </div>
      </div>
  );
}
export default ReviewWindow;
