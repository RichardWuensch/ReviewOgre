import ConverterForPrinting from '../../api/ConverterForPrinting';
import Review from '../../data/models/Review';

export default class Algorithm {
  #numberOfReviewers = 0;
  #participantsPerReview = 0;

  #participants;
  #roomSlots;
  #authorIsNotary;
  #abReview;
  #breakForModeratorAndReviewer;

  #participantsDispatch;
  #roomSlotsDispatch;

  #maximumTries;

  constructor (participants, participantsDispatch, roomSlots, roomSlotsDispatch, settings, maximumTries) {
    this.#participants = this.#resetParticipants(participants);
    this.#participantsDispatch = participantsDispatch;
    this.#roomSlotsDispatch = roomSlotsDispatch;
    this.#roomSlots = this.#resetRoomSlots(roomSlots);

    this.#authorIsNotary = settings.authorIsNotary;
    this.#abReview = settings.abReview;
    this.#breakForModeratorAndReviewer = settings.breakForModeratorAndReviewer;
    this.#maximumTries = (maximumTries === undefined) ? 300 : maximumTries;
  }

  #resetRoomSlots (roomSlots) {
    for (const roomSlot of roomSlots) {
      for (const room of roomSlot.getRooms()) {
        room.resetReview();
      }
    }
    return roomSlots;
  }

  #resetParticipants (participants) {
    for (const p of participants) {
      p.resetStatistics();
    }
    return participants;
  }

  /**
  * Main function that runs through all necessary parts
  * the algorithm works gready and tries as often as no solution is found or the maximumTries are achieved
  * @returns {boolean} - return true if very thing was fine
  */
  run () {
    const groups = this.#getAllGroups();
    this.#prechecks(groups.length);

    let errorFound = true;
    let errorCounter = 0;
    while (errorFound) {
      if (errorCounter > this.#maximumTries) {
        throw new Error('No solution found after ' + errorCounter + ' tries of running algorithm.',
          { cause: 'noSolution' }
        );
      }

      this.#setAuthorOfRandomGroupMember(groups);
      for (const roomSlot of this.#roomSlots) {
        for (const room of roomSlot.getRooms()) {
          const review = room.getReview();
          if (review === null) {
            continue;
          }
          room.getReview().fillPossibleParticipantsOfReview(roomSlot, this.#participants, this.#abReview);
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
    let notReviewerList = this.#participants.filter(p => p.getReviewerCount() === 0);
    const toOftenReviewerList = this.#participants.filter(p => p.getReviewerCount() > 1);
    if (notReviewerList.length > 0 && toOftenReviewerList.length > 0) {
      this.#swapReviewer(notReviewerList, toOftenReviewerList);
    }
    notReviewerList = this.#participants.filter(p => p.getReviewerCount() === 0);
    if (notReviewerList.length > 0) {
      this.#addReviewToParticipantsWithoutReviewerRole(notReviewerList);
    }
  }

  #addReviewToParticipantsWithoutReviewerRole (notReviewerList) {
    let i = 0;
    let numberOfTries = 0;
    while (notReviewerList.length > 0) {
      for (const s of this.#roomSlots) {
        for (const notReviewer of notReviewerList) {
          if (i >= s.getRooms().length) break;
          const review = s.getRooms()[i].getReview();
          try {
            review.addReviewer(this.#roomSlots, this.#roomSlots.indexOf(s), notReviewer, false);
            notReviewerList = notReviewerList.filter(p => p !== notReviewer);
            break;
          } catch (error) {
            // do nothing
          }
        }
      }
      i++;
      if (i > this.#roomSlots[this.#roomSlots.length - 1].getRooms().length) {
        if (numberOfTries < 10) {
          numberOfTries++;
          i = 0;
        } else {
          console.log('no swap possible');
          break;
        }
      }
    }
  }

  #swapReviewer (notReviewerList, toOftenReviewerList) {
    for (const toOftenReviewer of toOftenReviewerList) {
      let found = false;
      const reviewSlotsMap = toOftenReviewer.getActiveInSlotsAsReviewer();
      for (const notReviewer of notReviewerList) {
        for (const reviewSlot of Array.from(reviewSlotsMap.keys())) {
          if (!notReviewer.getActiveSlots().includes(reviewSlot)) {
            try {
              reviewSlotsMap.get(reviewSlot).addReviewer(this.#roomSlots, this.#roomSlots.indexOf(this.#roomSlots.filter(rs => rs.getId() === reviewSlot.getId())[0]), notReviewer, this.#breakForModeratorAndReviewer);
              reviewSlotsMap.get(reviewSlot).deleteReviewer(this.#roomSlots, this.#roomSlots.indexOf(this.#roomSlots.filter(rs => rs.getId() === reviewSlot.getId())[0]), toOftenReviewer, this.#breakForModeratorAndReviewer);
              notReviewerList = notReviewerList.filter(p => p !== notReviewer);
              found = true;
              break;
            } catch {
              found = false;
            }
          }
        }
        if (found) break;
      }
    }
  }

  #checkSkipRoom (notNeeded, roomTopic, reviewTopic) {
    if (this.#abReview === true) {
      if (notNeeded === true || (notNeeded === false && roomTopic !== reviewTopic)) {
        return true;
      }
    } else {
      if (notNeeded === true) {
        return true;
      }
    }
  }

  /**
   * Do some prechecks before the algorithm run to make sure that there is a possibility that a solution can be found
   * Criteria:
   * there must be at least 4 groups
   * there must be at least 12 participants
   * there must be as many rooms as reviews
   * per Slot are only as many rooms necessary as amount of Participants divided by amount of participants per review (the rest of the rooms can be returned to the roomplaner)
   * there must be at least as many slots as the result from the amount of Groups divided by max number of rooms calculated in the step before
   * @param {int} groupsLength
   * @throws {Error} - to show what's the problem
   */
  #prechecks (groupsLength) {
    if (this.#abReview === false) {
      const sumOfParticipantsAndReviewerPerReview = this.#calculateNumberOfReviewer(this.#participants.length, groupsLength);
      this.#numberOfReviewers = sumOfParticipantsAndReviewerPerReview.numberOfReviewers;
      this.#participantsPerReview = sumOfParticipantsAndReviewerPerReview.participantsPerReview;
      this.checks(this.#participants);
    } else {
      this.#participants.forEach(p => {
        if (p.getTopic() === undefined) {
          throw new Error('Some participants have no topic', { cause: 'prechecksFailed' });
        }
      });
      const topicMap = this.#getTopicMap();
      if (topicMap.size < 2) {
        throw new Error('For AB-Reviews at least 2 different topics are needed', { cause: 'prechecksFailed' }); // TODO check in frontend
      }
      const listOfNumberOfReviewers = [];
      const listOfParticipantsPerReview = [];
      for (const participantsPerTopic of topicMap.values()) {
        const groupMap = this.#getGroupMap(participantsPerTopic);
        const sumOfParticipantsAndReviewerPerReview = this.#calculateNumberOfReviewer(participantsPerTopic.length, groupMap.size);
        listOfNumberOfReviewers.push(sumOfParticipantsAndReviewerPerReview.numberOfReviewers);
        listOfParticipantsPerReview.push(sumOfParticipantsAndReviewerPerReview.participantsPerReview);
      }
      this.#numberOfReviewers = Math.min(...listOfNumberOfReviewers);
      this.#participantsPerReview = Math.min(...listOfParticipantsPerReview);
      for (const [topic, participantsPerTopic] of topicMap) {
        this.checks(participantsPerTopic, topic);
      }
    }
  }

  checks (participants, topic) {
    let roomCount = 0;
    let roomCountWithNotNeededRooms = 0;
    let errorMessage = '';
    const groupMap = this.#getGroupMap(participants);

    const maxNumberOfRoomsInSlots = Math.floor(participants.length / this.#participantsPerReview); // if there are more rooms they can be shown as unnecessary and the booking can canceled
    const minAmountOfSlots = Math.ceil(this.#breakForModeratorAndReviewer ? (groupMap.size / maxNumberOfRoomsInSlots) * 2 : (groupMap.size / maxNumberOfRoomsInSlots));
    for (const s of this.#roomSlots) {
      let rooms = [];
      if (this.#abReview === true) {
        rooms = s.getRooms().filter(r => (r.getNotNeeded().bool === true && r.getNotNeeded().topic !== topic) || r.getNotNeeded().topic === '');
      } else {
        rooms = s.getRooms();
      }
      rooms.forEach(r => r.setNotNeeded(false, ''));
      roomCountWithNotNeededRooms += rooms.length;
      for (let i = 0; i < roomCountWithNotNeededRooms && i < rooms.length; i++) {
        rooms[i].setNotNeeded(false, topic);
      }
      if (rooms.length > maxNumberOfRoomsInSlots) {
        roomCount += maxNumberOfRoomsInSlots;
        if (maxNumberOfRoomsInSlots === 1 || this.#abReview === false) {
          for (let i = maxNumberOfRoomsInSlots; i < rooms.length; i++) {
            rooms[i].setNotNeeded(true, topic);
          }
        } else {
          for (let i = maxNumberOfRoomsInSlots - 1; i < rooms.length; i++) {
            rooms[i].setNotNeeded(true, topic);
          }
        }
      } else {
        roomCount += rooms.length;
      }
    }
    for (const value of this.#getGroupMap(participants).values()) {
      if (this.#abReview === false) {
        if ((participants.length - value.length) < (this.#participantsPerReview - 1)) {
          errorMessage += 'There are not enough participants to build review groups.\n';
          break;
        }
      } else {
        if ((participants.length) < (this.#participantsPerReview - 1)) { // TODO einfach per OR mit der vorherigen Bedingung verknüpfen ????????
          errorMessage += 'There are not enough participants to build review groups.\n';
          break;
        }
      }
    }
    if (this.#authorIsNotary === false && groupMap.size === 2 && this.#participantsPerReview < 6) errorMessage += 'If only 2 groups per topic exist, authorIsNotary must be active.\n';
    if (groupMap.size < 2) errorMessage += 'At least 2 groups are needed.\n';
    if (!errorMessage) {
      if (groupMap.size > roomCountWithNotNeededRooms) errorMessage += `There are not enough rooms for ${groupMap.size} groups.\n`;
      else if (groupMap.size > roomCount) errorMessage += `With the current configuration only ${maxNumberOfRoomsInSlots} rooms per slot can be used to schedule reviews. Please add more rooms to the slots with less then ${maxNumberOfRoomsInSlots} rooms or create more slots.\n`;
      if (minAmountOfSlots > this.#roomSlots.length) errorMessage += `There are not enough slots. Minimum amount: ${minAmountOfSlots}\n`;
    }
    if (errorMessage) {
      throw new Error(errorMessage, { cause: 'prechecksFailed' });
    }
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

  #getGroupMap (participants) {
    const groupMap = new Map();
    for (const p of participants) {
      const group = p.getGroup();
      if (!groupMap.has(group)) {
        groupMap.set(group, []);
      }
      groupMap.get(group).push(p);
    }
    return groupMap;
  }

  #getTopicMap () {
    const topicMap = new Map();
    for (const p of this.#participants) {
      const topic = p.getTopic();
      if (!topicMap.has(topic)) {
        topicMap.set(topic, []);
      }
      topicMap.get(topic).push(p);
    }
    return topicMap;
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
          if (this.#checkSkipRoom(room.getNotNeeded().bool, room.getNotNeeded().topic, groupParticipants[0].getTopic())) {
            continue;
          }
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
      const filteredModerator = review.getPossibleParticipants()
        .filter((m) => m.getModeratorCount() < counter)
        .sort((a, b) => a.getActiveSlotsWithoutBrakes().length - b.getActiveSlotsWithoutBrakes().length)
        .filter((p, i, arr) => p.getActiveSlotsWithoutBrakes().length === arr[0].getActiveSlotsWithoutBrakes().length);
      if (filteredModerator.length > 0) {
        const rand = Math.floor(Math.random() * filteredModerator.length);
        review.setModerator(this.#roomSlots, this.#roomSlots.indexOf(roomSlot), filteredModerator[rand], this.#breakForModeratorAndReviewer);
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
        const filteredNotary = review.getPossibleParticipants()
          .filter((m) => m.getNotaryCount() < counter)
          .sort((a, b) => a.getActiveSlotsWithoutBrakes().length - b.getActiveSlotsWithoutBrakes().length)
          .filter((p, i, arr) => p.getActiveSlotsWithoutBrakes().length === arr[0].getActiveSlotsWithoutBrakes().length);
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
        let counter = 1;
        while (true) {
          const filteredReviewer = review.getPossibleParticipants()
            .filter((r) => r.getReviewerCount() < counter)
            .sort((a, b) => a.getActiveSlotsWithoutBrakes().length - b.getActiveSlotsWithoutBrakes().length) // TODO filter brakes see printer
            .filter((p, i, arr) => p.getActiveSlotsWithoutBrakes().length === arr[0].getActiveSlotsWithoutBrakes().length);
          if (filteredReviewer.length > 0) {
            const rand = Math.floor(Math.random() * filteredReviewer.length);
            review.addReviewer(this.#roomSlots, this.#roomSlots.indexOf(roomSlot), filteredReviewer[rand], this.#breakForModeratorAndReviewer);
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
  * @param {int} participantsLength
  * @param {int} numberOfGroups
  */
  #calculateNumberOfReviewer (participantsLength, numberOfGroups) {
    let numberOfReviewers = 0;
    let participantsPerReview = 0;
    if (this.#authorIsNotary === true && numberOfGroups > 2) {
      numberOfReviewers = Math.floor((2 * participantsLength) / numberOfGroups - 2);
      if (numberOfReviewers < 3) numberOfReviewers = 3;
      participantsPerReview = numberOfReviewers + 2;
    } else if (this.#authorIsNotary === true && (numberOfGroups <= 2 || (this.#abReview === true && numberOfGroups <= 4))) {
      numberOfReviewers = Math.floor(participantsLength / numberOfGroups - 2);
      if (numberOfReviewers < 3) numberOfReviewers = 3;
      participantsPerReview = numberOfReviewers + 2;
    } else if (this.#abReview === true) {
      numberOfReviewers = Math.floor((2 * participantsLength) / numberOfGroups - 3);
      if (numberOfReviewers < 3) numberOfReviewers = 3;
      participantsPerReview = numberOfReviewers + 3;
      // numberOfReviewers = 2;
    } else {
      numberOfReviewers = Math.floor((2 * participantsLength) / numberOfGroups - 3);
      if (numberOfReviewers < 3) numberOfReviewers = 3;
      participantsPerReview = numberOfReviewers + 3;
    }
    return { numberOfReviewers, participantsPerReview };
  }

  /**
  * clears the up to now set reviews, the activeInSlot list of each participant and the roleCounter of each participant
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

  getResult () {
    return this.#roomSlots;
  }

  printLikeOldRevOger () {
    // print the Review without unnecessary attributes
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
        console.log(room.getBeamerNeeded() ? 'Beamer verfügbar' : 'Kein Beamer verfügbar');
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
    let i = 0;
    const a = this.#participants;
    a.sort((a, b) => {
      const x = a.getActiveSlotsWithoutBrakes();
      const y = b.getActiveSlotsWithoutBrakes();
      return x.length - y.length;
    }).forEach((p) => console.log('id:' + ++i + 'active:' + p.getActiveSlotsWithoutBrakes().length + p.getLastName() + ' ' + p.getFirstName() + ' n:' + p.getNotaryCount() + ' a:' + p.getAuthorCount() + ' m:' + p.getModeratorCount() + ' r:' + p.getReviewerCount()));
  }

  printJSONinLocalStorage () {
    // load the result as JSON-String in the LocalStorage of the Browser
    // it is possible to have a nicer look of the result with a formatter
    localStorage.setItem('roomSlots', JSON.stringify(this.#roomSlots));
  }
}
