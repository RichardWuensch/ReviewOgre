import { createContext, useContext, useReducer } from 'react';
import Review from '../../../data/model/Review';
import Participant from '../../../data/model/Participant';
import RoomSlot from '../../../data/model/RoomSlot';
import Room from '../../../data/model/Room';

const ReviewContext = createContext(null);
const ReviewDispatchContext = createContext(null);

let nextId = 1;

export function ReviewProvider ({ children }) {
  const [tasks, dispatch] = useReducer(
    reviewsReducer,
    initialReviews
  );

  return (
        <ReviewContext.Provider value={tasks}>
            <ReviewDispatchContext.Provider value={dispatch}>
                {children}
            </ReviewDispatchContext.Provider>
        </ReviewContext.Provider>
  );
}

export function useReviews () {
  return useContext(ReviewContext);
}

export function useReviewsDispatch () {
  return useContext(ReviewDispatchContext);
}

function reviewsReducer (reviews, action) {
  switch (action.type) {
    case 'added': {
      const temp = action.newReview;
      temp.setId(nextId++);
      return [...reviews, temp];
    }
    case 'changed': {
      return reviews.map(t => {
        if (t.getId() === action.updatedReview.getId()) {
          return action.updatedReview;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return reviews.filter(t => t.getId() !== action.itemToDelete.getId());
    }
    case 'getAll': {
      return reviews;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialReviews = [
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
