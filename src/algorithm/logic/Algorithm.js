import ConverterForPrinting from '../../api/ConverterForPrinting';
import Review from '../../data/model/Review';

export default class Algorithm {
  #numberOfReviewers = 0;

  #participants;
  #roomSlots;
  #authorIsNotary;

  #participantsDispatch;
  #roomSlotsDispatch;

  #maximumTries;

  constructor (participants, participantsDispatch, roomSlots, roomSlotsDispatch, authorIsNotary, maximumTries) {
    this.#participants = participants;
    this.#participantsDispatch = participantsDispatch;
    this.#roomSlotsDispatch = roomSlotsDispatch;
    this.#roomSlots = this.#resetRoomSlots(roomSlots);

    this.#authorIsNotary = authorIsNotary;
    this.#maximumTries = (maximumTries === undefined) ? 300 : maximumTries;
  }

  #resetRoomSlots (roomSlots) {
    for (const roomSlot of roomSlots) {
      for (const room of roomSlot.getRooms()) {
        room.setReview(null);
      }
    }
    return roomSlots;
  }

  /**
  * Main function that runs through all nessecary parts
  * the algorithm works gready and tries as often as no soluten is found or the maximumTries are achived
  * @returns {boolean} - return true if very thing was fine
  */
  run () {
    const groups = this.#getAllGroups();
    this.#prechecks(groups.length);

    let errorFound = true;
    let errorCounter = 0;
    while (errorFound) {
      if (errorCounter > this.#maximumTries) {
        throw new Error('No solution found after ' + errorCounter + ' tries of running algorithm.');
      }

      this.#setAuthorOfRandomGroupMember(groups);
      this.#calculateNumberOfReviewer(groups.length);
      for (const roomSlot of this.#roomSlots) {
        for (const room of roomSlot.getRooms()) {
          if (room.getIgnoreForAlgorithm() === true) {
            continue;
          }
          const review = room.getReview();
          if (review === null) {
            continue;
          }
          room.getReview().fillPossibleParticipantsOfReview(roomSlot, this.#participants);
          this.#assignModeratorToReview(roomSlot, review);
          this.#assignNotaryToReview(roomSlot, review);
          try {
            this.#assignReviewersToReview(roomSlot, review);
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

  /**
   * Do some prechecks before the algorithm run to make sure that there is a possibility that a solution can be found
   * Criteria:
   * there must be as much rooms as reviews
   * per Slot are only as much rooms necessary as amout of Participants divided by amout of participants per review (the rest of the rooms can be returned to the roomplaner)
   * there must be at least as much slots as the result from the amount of Groups divided by max number of rooms calculated in the step befor
   * @param {int} numberOfGroups
   * @throws {Error} - to show what's the problem
   */
  #prechecks (numberOfGroups) {
    let roomCount = 0;
    const maxNumberOfRoomsInSlots = this.#participants.length / ((2 * this.#participants.length) / numberOfGroups); // if there are more rooms they can be shown as unneccessary and the booking can canceled
    const minAmountOfSlots = numberOfGroups / maxNumberOfRoomsInSlots;
    // const saveDeletedRoomsForRoomPlaner = [];
    for (const s of this.#roomSlots) {
      const rooms = s.getRooms();
      if (rooms.length > maxNumberOfRoomsInSlots) {
        roomCount += maxNumberOfRoomsInSlots;
        // saveDeletedRoomsForRoomPlaner.push(rooms.splice(maxNumberOfRoomsInSlots, rooms.length - maxNumberOfRoomsInSlots)); // can be shown as unnecessary rooms
        for (let i = maxNumberOfRoomsInSlots; i < rooms.length; i++) {
          rooms[i].setIgnoreForAlgorithm(true);
        }
      } else {
        roomCount += rooms.length;
      }
    }
    // saveDeletedRoomsForRoomPlaner.forEach(room => console.log(room));
    // this.#roomSlots.forEach(room => console.log(room));
    let errorMessage = '';
    if (numberOfGroups > roomCount) errorMessage += 'There are not enough rooms.\n';
    if (minAmountOfSlots > this.#roomSlots.length) errorMessage += 'There are not enough Slots.\n';

    if (errorMessage !== '') throw new Error(errorMessage);
  }

  /**
  * Loops over all participants and create a array with the groupNumber
  * @return {array} Array of all group numbers in the participant list
  */
  #getAllGroups () {
    const groups = [];
    for (const p of this.#participants) {
      if (!groups.includes(p.getGroup())) {
        groups.push(p.getGroup());
      }
    }
    return groups;
  }

  /**
  * Loops over all groups and select one participant of each group as the author and add him to the review
  * @param {array} groups - Array of all group numbers in the participant list
  */
  #setAuthorOfRandomGroupMember (groups) {
    groups.forEach((group) => {
      const groupParticipants = this.#participants.filter(
        (p) => p.getGroup() === group
      );
      let roomFound = false;
      for (const roomSlot of this.#roomSlots) {
        if (roomFound) {
          break;
        }
        for (const room of roomSlot.getRooms()) {
          if (room.getReview() === null) {
            const rand = Math.floor(Math.random() * groupParticipants.length);
            room.setReview(new Review(roomSlot, groupParticipants[rand]));
            roomFound = true;
            break;
          }
        }
      }
    });
  }

  /**
  * assign the moderator to the review
  * the selected participant should be part of the possibleParticipants list and should have a as lowest moderatorCount as possible
  * this will make sure that moderator role is equally distributed
  * @param {RoomSlot} roomSlot - to add the roomSlot in the activeInSlot list of the selected particpant
  * @param {Review} review -to get some nessecary parameter of the review
  */
  #assignModeratorToReview (roomSlot, review) {
    let counter = 1;
    while (true) {
      const filteredModerator = review.getPossibleParticipants().filter((m) => m.getModeratorCount() < counter);
      if (filteredModerator.length > 0) {
        const rand = Math.floor(Math.random() * filteredModerator.length);
        review.setModerator(roomSlot, filteredModerator[rand]);
        break;
      }
      counter++;
    }
  }

  /**
  * assign the notary to the review
  * if the author should be the notary in a double role, the author is set as notary
  * if not the selected participant should be part of the possibleParticipants list and should have a as lowest notaryCount as possible
  * this will make sure that notary role is equally distributed
  * @param {RoomSlot} roomSlot - to add the roomSlot in the activeInSlot list of the selected particpant
  * @param {Review} review -to get some nessecary parameter of the review
  */
  #assignNotaryToReview (roomSlot, review) {
    if (this.#authorIsNotary === false) {
      let counter = 1;
      while (true) {
        const filteredNotary = review.getPossibleParticipants().filter((n) => n.getNotaryCount() < counter);
        if (filteredNotary.length > 0) {
          const rand = Math.floor(Math.random() * filteredNotary.length);
          review.setNotary(roomSlot, filteredNotary[rand], false);
          break;
        }
        counter++;
      }
    } else {
      review.setNotary(roomSlot, review.getAuthor(), true);
    }
  }

  /**
  * assign the reviewers to the review
  * the selected participant should be part of the possibleParticipants list and should have a as lowest reviewerCount as possible
  * this will make sure that notary role is equally distributed
  * @param {RoomSlot} roomSlot - to add the roomSlot in the activeInSlot list of the selected particpant
  * @param {Review} review -to get some nessecary parameter of the review
  * @throws {Error} throws a error in case of not enough participants or no founded solution
  */
  #assignReviewersToReview (roomSlot, review) {
    if (review.getPossibleParticipants().length < this.#numberOfReviewers) {
      throw new Error('noSolution');
    }

    for (let i = 0; i < this.#numberOfReviewers; i++) {
      try {
        // let reviewer = {};
        let counter = 1;
        while (true) {
          const filteredReviewer = review.getPossibleParticipants().filter((n) => n.getReviewerCount() < counter);
          if (filteredReviewer.length > 0) {
            const rand = Math.floor(Math.random() * filteredReviewer.length);
            review.addReviewer(roomSlot, filteredReviewer[rand]);
            break;
          }
          counter++;
        }
      } catch (error) {
        console.log(error.message);
        throw new Error('noSolution');
      }
    }
  }

  /**
  * calculates the number of needed reviewers
  * the number depends on the authorIsNotary-setting and the number of participants
  * @param {int} numberOfGroups
  */
  #calculateNumberOfReviewer (numberOfGroups) {
    if (this.#authorIsNotary) {
      this.#numberOfReviewers = (2 * this.#participants.length) / numberOfGroups - 2;
    } else {
      this.#numberOfReviewers = (2 * this.#participants.length) / numberOfGroups - 3;
    }
  }

  /**
  * clears the up to now setted reviews, the activeInSlot list of eaach participant and the roleCounter of each participant
  * after no solution could found so the algorithm can be restarted
  */
  #clearReviews () {
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

  printResult () {
    // print the complete resultstack
    console.log(this.#roomSlots);
  }

  printLikeOldRevOger () {
    // print the Review without unneccesary attributs
    const converter = new ConverterForPrinting();
    for (const s of this.#roomSlots) {
      for (const room of s.getRooms()) {
        if (room.getReview() === null) {
          continue;
        }
        console.log('Review: ' + room.getReview().getGroupName() +
                     ' am ' + converter.getDataDDmmYYYYforPrinting(s.getDate()) +
                     ' von ' + converter.getTimeHHmm(s.getStartTime()) +
                     ' bis ' + converter.getTimeHHmm(s.getEndTime()) +
                     ' in ' + room.getName());
        console.log(room.hasBeamer() ? 'Beamer verfügbar' : 'Kein Beamer verfügbar');
        console.log('Author: ', converter.getParticipantAttributsForPrinting(room.getReview().getAuthor()));
        console.log('Moderator: ', converter.getParticipantAttributsForPrinting(room.getReview().getModerator()));
        console.log('Notary: ', converter.getParticipantAttributsForPrinting(room.getReview().getNotary()));
        for (const reviewer of room.getReview().getReviewer()) {
          console.log('Reviewer: ', converter.getParticipantAttributsForPrinting(reviewer));
        }
        console.log('*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x');
      }
    }
  }

  printParticipantsSortByAmountOfActiveInSlots () {
    // print all participants sorted by the amount of activities
    this.#participants
      .sort((a, b) => a.getActiveSlots().length - b.getActiveSlots().length)
      .forEach((p) => console.log(p.getLastName() + ' ' + p.getFirstName() + ' n:' + p.getNotaryCount() + ' a:' + p.getAuthorCount() + ' m:' + p.getModeratorCount() + ' r:' + p.getReviewerCount()));

    /* const participantStore = ParticipantStore.getSingleton();
      participantStore.getAll().sort((a, b) => a.getActiveSlots().length - b.getActiveSlots().length)
        .forEach((p) => console.log(p.getLastName() + ' ' + p.getFirstName() + ' n:' + p.getNotaryCount() + ' a:' + p.getAuthorCount() + ' m:' + p.getModeratorCount() + ' r:' + p.getReviewerCount())); */
  }

  printJSONinLocalStorage () {
    // load the result as JSON-String in the LocalStorage of the Browser
    // it is possible to have a nicer look of the result with a formatter
    localStorage.setItem('roomSlots', JSON.stringify(this.#roomSlots));
  }
}
