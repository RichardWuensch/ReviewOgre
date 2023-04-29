import Review from '../../data/model/Review';
import Slot from '../../data/model/Slot';
import { ResultStore } from '../../data/store/ResultStore';

export default class Algorithm {
  #numberOfReviewers = 0;

  #participants;
  #roomSlots;
  #authorIsNotary;

  #maximumTries;

  constructor (participants, roomSlots, authorIsNotary, maximumTries) {
    this.#participants = participants;
    this.#roomSlots = roomSlots;
    this.#authorIsNotary = authorIsNotary;
    this.#maximumTries = (maximumTries === undefined) ? 300 : maximumTries;
  }

  run () {
    if (this.#prechecks() === false) {
      return false;
    };

    const groups = this.#getAllGroups();
    let errorFound = true;
    let errorCounter = 0;
    while (errorFound) {
      // run as long as no solution is found
      if (errorCounter > this.#maximumTries) {
        throw new Error('No solution found after ' + errorCounter + ' tries of running algorithm.');
      }

      this.#setAuthorOfRandomGroupMember(groups);
      this.#calculateNumberOfReviewer(groups);
      for (const roomSlot of this.#roomSlots) {
        for (const room of roomSlot.getRooms()) {
          if (room.getReview() === null) {
            continue;
          }
          this.#fillPossibleParticipantsOfReview(
            this.#getSlotFromRoomSlot(roomSlot),
            room.getReview()
          );
          this.#assignModeratorToReview(roomSlot, room.getReview());
          this.#assignNotaryToReview(roomSlot, room.getReview());
          try {
            this.#assignReviewersToReview(roomSlot, room.getReview());
            errorFound = false;
          } catch (error) {
            console.log(error.message);
            errorFound = true; // must be reset bc we don't break out of 2 nested for loops
            errorCounter++;
            this.#clearReviews();
          }
        }
      }
    }
    return true;
  }

  #prechecks () {
    // if count of rooms >= count of groups
    // are there enough groups for the calculation?
    // do slot times overlap?
    return true;
  }

  #getAllGroups () {
    const groups = [];

    // get all groups out of participants
    for (const p of this.#participants) {
      if (!groups.includes(p.getGroup())) {
        groups.push(p.getGroup());
      }
    }
    return groups;
  }

  #setAuthorOfRandomGroupMember (groups) {
    // select an author out of every group and add him in a new review
    groups.forEach((group) => {
      const groupParticipants = this.#participants.filter(
        (p) => p.getGroup() === group
      );
      const rand = Math.floor(Math.random() * groupParticipants.length);
      const author = groupParticipants[rand];
      const newReview = new Review(author);

      let roomFound = false;
      for (const roomSlot of this.#roomSlots) {
        if (roomFound) {
          break;
        }
        for (const room of roomSlot.getRooms()) {
          if (room.getReview() === null) {
            room.setReview(newReview);
            author.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlot));
            author.increaseAuthorCount();
            roomFound = true;
            break;
          }
        }
      }
    });
  }

  #fillPossibleParticipantsOfReview (slot, review) {
    // search all possible participants for this review (Participant should not be in the same group as the author and should not already active in the slot of this review)
    review.setPossibleParticipants(
      this.#participants.filter(
        (p) =>
          review.getAuthor().getGroup() !== p.getGroup() &&
              !p.isActiveInSlot(slot)
      )
    );
  }

  #assignModeratorToReview (roomSlot, review) {
    // set the notary for the review
    let counter = 1;
    while (true) {
      const filteredModerator = review
        .getPossibleParticipants()
        .filter((m) => m.getModeratorCount() < counter);
      if (filteredModerator.length > 0) {
        const rand = Math.floor(Math.random() * filteredModerator.length);
        review.setModerator(filteredModerator[rand]);
        break;
      }
      counter++;
    }
    review
      .getModerator()
      .addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlot));
    review.getModerator().increaseModeratorCount();
    review.deleteParticipantFromPossibleParticipants(review.getModerator());
  }

  #assignNotaryToReview (roomSlot, review) {
    // set the notary for the review
    if (this.#authorIsNotary === false) {
      let counter = 1;
      while (true) {
        const filteredNotary = review
          .getPossibleParticipants()
          .filter((n) => n.getNotaryCount() < counter);
        if (filteredNotary.length > 0) {
          const rand = Math.floor(Math.random() * filteredNotary.length);
          review.setNotary(filteredNotary[rand]);
          break;
        }
        counter++;
      }
      review
        .getNotary()
        .addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlot));
      review.getNotary().increaseNotaryCount();
      review.deleteParticipantFromPossibleParticipants(review.getNotary());
    } else {
      // if the author schould be the notary
      review.setNotary(review.getAuthor());
      review.getNotary().increaseNotaryCount();
    }
  }

  #assignReviewersToReview (roomSlot, review) {
    // set the reviewers for the review
    // if there is noSolution possible a Error is thrown
    if (review.getPossibleParticipants().length < this.#numberOfReviewers) {
      // check if there are enougth possibleParticipants
      throw new Error('noSolution');
    }

    for (let i = 0; i < this.#numberOfReviewers; i++) {
      try {
        let reviewer = {};
        let counter = 1;
        while (true) {
          // iterates over the pariticipants and select one as reviewer from a List with the lowest reviewerCount
          const filteredReviewer = review
            .getPossibleParticipants()
            .filter((n) => n.getReviewerCount() < counter);
          if (filteredReviewer.length > 0) {
            const rand = Math.floor(Math.random() * filteredReviewer.length);
            reviewer = filteredReviewer[rand];
            break;
          }
          counter++;
        }
        review.addReviewer(reviewer);
        reviewer.addSlotToActiveList(this.#getSlotFromRoomSlot(roomSlot));
        reviewer.increaseReviewerCount();
        review.deleteParticipantFromPossibleParticipants(reviewer);
      } catch (error) {
        console.log(error.message);
        throw new Error('noSolution');
      }
    }
  }

  #calculateNumberOfReviewer (groups) {
    // calculates how many reviews a necessary
    if (this.#authorIsNotary) {
      this.#numberOfReviewers =
        (2 * this.#participants.length) / groups.length - 2;
    } else {
      this.#numberOfReviewers =
        (2 * this.#participants.length) / groups.length - 3;
    }
  }

  #clearReviews () {
    // clear the Slots and the statistic values from the participants
    for (const roomSlot of this.#roomSlots) {
      for (const room of roomSlot.getRooms()) {
        room.setReview(null);
      }
    }

    for (const p of this.#participants) {
      p.resetActiveInSlot();
      p.resetStatistics();
    }
  }

  #getSlotFromRoomSlot (roomSlot) {
    // returns only the upper class Slot from a room slot
    return new Slot(
      roomSlot.getDate(),
      roomSlot.getStartTime(),
      roomSlot.getEndTime()
    );
  }

  printResult () {
    // print the complete resultstack
    console.log(this.#roomSlots);
  }

  printLikeOldRevOger () {
    // print the Review without unneccesary attributs
    for (const s of this.#roomSlots) {
      // console.log(s);
      for (const room of s.getRooms()) {
        if (room.getReview() === null) {
          continue;
        }
        console.log('Review: ' + room.getReview().getGroupName() +
                     ' am ' + this.getDataDDmmYYYYforPrinting(s.getDate()) +
                     ' von ' + this.getTimeHHmm(s.getStartTime()) +
                     ' bis ' + this.getTimeHHmm(s.getEndTime()) +
                     ' in ' + room.getName());
        console.log(room.hasBeamer() ? 'Beamer verfügbar' : 'Kein Beamer verfügbar');
        console.log('Author: ', this.getParticipantAttriburesForPrinting(room.getReview().getAuthor()));
        console.log('Moderator: ', this.getParticipantAttriburesForPrinting(room.getReview().getModerator()));
        console.log('Noray: ', this.getParticipantAttriburesForPrinting(room.getReview().getNotary()));
        for (const reviewer of room.getReview().getReviewer()) {
          console.log('Reviewer: ', this.getParticipantAttriburesForPrinting(reviewer));
        }
        console.log('*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x');
      }
    }
  }

  getDataDDmmYYYYforPrinting (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return ((day < 10) ? ('0' + day) : day) + '.' + ((month < 10) ? ('0' + month) : month) + '.' + date.getFullYear();
  }

  getTimeHHmm (time) {
    const hour = time.getHours();
    const min = time.getMinutes();
    return ((hour < 10) ? ('0' + hour) : hour) + ':' + ((min < 10) ? ('0' + min) : min) + 'Uhr';
  }

  getParticipantAttriburesForPrinting (participant) {
    return participant.getFirstName() + ' ' + participant.getLastName() + ' ' + participant.getEmail() + ' Gruppe ' + participant.getGroup();
  }

  printParticipantsSortByAmountOfActiveInSlots () {
    // print all participants sorted by the amount of activities
    this.#participants
      .sort((a, b) => a.getActiveSlots().length - b.getActiveSlots().length)
      .forEach((p) => console.log(p));
  }

  printJSONinLocalStorage () {
    // load the result as JSON-String in the LocalStorage of the Browser
    // it is possible to have a nicer look of the result with a formatter
    localStorage.setItem('roomSlots', JSON.stringify(this.#roomSlots));
  }

  storeResult () {
    ResultStore.getSingleton().setRoomSlots(this.#roomSlots);
  }
}
