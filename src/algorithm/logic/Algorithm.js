/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

import ConverterForPrinting from '../../import_export/ConverterForPrinting';
import Review from '../../data/models/Review';

export default class Algorithm {
  #numberOfReviewers = 0;
  #participantsPerReview = 0;

  #participants;
  #roomSlots;
  #authorIsNotary;
  #abReview;
  #breakForModeratorAndReviewer;
  #internationalGroups;

  #participantsDispatch;
  #roomSlotsDispatch;

  #notGermanSpeaker;
  #maximumTries;

  constructor (participants, participantsDispatch, roomSlots, roomSlotsDispatch, settings, maximumTries) {
    this.#participants = participants;
    this.#participantsDispatch = participantsDispatch;
    this.#roomSlotsDispatch = roomSlotsDispatch;
    this.#roomSlots = roomSlots;
    this.#clearReviews();

    this.#authorIsNotary = settings.authorIsNotary;
    this.#abReview = settings.abReview;
    this.#breakForModeratorAndReviewer = settings.breakForModeratorAndReviewer;
    this.#internationalGroups = settings.internationalGroups;
    this.#maximumTries = (maximumTries === undefined) ? 300 : maximumTries;
  }

  /**
  * Main function that runs through all necessary parts
  * the algorithm works gready and tries as often as no solution is found or the maximumTries are achieved
  * After a successful run the result will be checked if there a some participants without the reviewer role
  * and if there is someone it tries to swap with somebody that takes more times part as a reviewer than the average
  * are there still somebody without a reviewer role, this one is added as a additional reviewer to any review
  */
  run () {
    this.prechecks();
    const groups = Array.from(this.getGroupMap(this.#participants).keys());

    let errorFound = true;
    let errorCounter = 0;
    while (errorFound) {
      if (errorCounter > this.#maximumTries) {
        if (this.#abReview === true) {
          for (const roomSlot of this.#roomSlots) {
            for (const room of roomSlot.getRooms()) {
              room.resetNotNeeded();
            }
          }
        }
        throw new Error('No solution found after ' + errorCounter + ' tries of running algorithm.',
          { cause: 'noSolution' }
        );
      }
      let breaker = false;

      this.#setAuthorOfRandomGroupMember(groups);
      for (const roomSlot of this.#roomSlots) {
        for (const room of roomSlot.getRooms()) {
          const review = room.getReview();
          let reviewAlreadySet;
          try {
            room.getReview().getModerator().getFirstName();
            reviewAlreadySet = true;
          } catch (error) {
            reviewAlreadySet = false;
          }
          if (review === null || reviewAlreadySet) {
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
            this.printResult();
            this.#clearReviews();
            breaker = true;
            break;
          }
        }
        if (breaker === true) {
          break;
        }
      }
    }
    let notReviewerList = this.#participants.filter(p => p.getReviewerCount() === 0);
    // eslint-disable-next-line no-return-assign
    const toOftenReviewerList = this.#participants.filter(p => p.getReviewerCount() > Math.round(this.#participants.reduce((sum, participant) => sum += participant.getReviewerCount(), 0) / this.#participants.length));
    if (notReviewerList.length > 0 && toOftenReviewerList.length > 0) {
      this.#swapReviewer(notReviewerList, toOftenReviewerList);
    }
    notReviewerList = this.#participants.filter(p => p.getReviewerCount() === 0);
    if (notReviewerList.length > 0) {
      this.#addReviewToParticipantsWithoutReviewerRole(notReviewerList);
    }
  }

  /**
   * Tries to swap the participants with a high reviewer-roles-count with that ones without that role
   */
  #swapReviewer (notReviewerList, toOftenReviewerList) {
    for (const toOftenReviewer of toOftenReviewerList) {
      let found = false;
      const reviewSlotsMap = toOftenReviewer.getActiveInSlotsAsReviewer();
      for (const notReviewer of notReviewerList) {
        for (const reviewSlot of Array.from(reviewSlotsMap.keys())) {
          if (notReviewer.getActiveSlots().includes(reviewSlot) === false) {
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

  /**
   * Add every participant who takes never part as reviewer in a review this role
   */
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
          break;
        }
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
   * Checks if the settings are possible with the input data call corresponding next methods
   * @throws {Error} - to show what's the problem
   */
  prechecks () {
    if (this.#abReview === false) {
      if (this.#internationalGroups === true) {
        this.#participants.forEach(p => {
          if (p.getLanguageLevel() === undefined) {
            throw new Error('Some participants have no German Skill Level', { cause: 'prechecksFailed' });
          }
        });
        this.checksLanguageLevel();
        this.#participants = this.#participants.filter(p => p.getLanguageLevel() !== 'A1' && p.getLanguageLevel() !== 'A2' && p.getLanguageLevel() !== 'B1');
      }
      const sumOfParticipantsAndReviewerPerReview = this.#calculateNumberOfReviewer(this.#participants.length, [...this.getGroupMap(this.#participants)].length);
      this.#numberOfReviewers = sumOfParticipantsAndReviewerPerReview.numberOfReviewers;
      this.#participantsPerReview = sumOfParticipantsAndReviewerPerReview.participantsPerReview;
      this.checks(this.#participants);
    } else {
      this.#participants.forEach(p => {
        if (p.getTopic() === undefined) {
          throw new Error('Some participants have no topic', { cause: 'prechecksFailed' });
        }
      });
      const topicMap = this.getTopicMap();
      if (topicMap.size < 2) {
        throw new Error('For AB-Reviews at least 2 different topics are needed', { cause: 'prechecksFailed' });
      }
      const listOfNumberOfReviewers = [];
      const listOfParticipantsPerReview = [];
      for (const participantsPerTopic of topicMap.values()) {
        const groupMap = this.getGroupMap(participantsPerTopic);
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

  /**
   * Do some checks before the algorithm run to make sure that there is a possibility that a solution can be found
   * Criteria:
   * there must be at least 2 groups
   * there must be enough participants to fill the reviews
   * there must be as many rooms as reviews
   * per Slot are only as many rooms necessary as amount of Participants divided by amount of participants per review (the rest of the rooms can be returned to the roomplaner)
   * there must be at least as many slots as the result from the amount of Groups divided by max number of rooms calculated in the step before
   * @throws {Error} - to show what's the problem
   */
  checks (participants, topic) {
    let roomCount = 0;
    let roomCountWithNotNeededRooms = 0;
    let errorMessage = '';
    const groupMap = this.getGroupMap(participants);

    if (participants.length === 0) {
      throw new Error('There are no participants.', { cause: 'prechecksFailed' });
    }

    const maxNumberOfRoomsInSlots = Math.floor((participants.length - ((this.#authorIsNotary === true && this.#abReview === true) ? 2 : (this.#authorIsNotary === false && this.#abReview === true) ? 1 : 0) * groupMap.size) / this.#participantsPerReview); // if there are more rooms they can be shown as unnecessary and the booking can canceled
    const minAmountOfSlots = Math.ceil(this.#breakForModeratorAndReviewer ? (groupMap.size / maxNumberOfRoomsInSlots) * 2 : (groupMap.size / maxNumberOfRoomsInSlots));
    for (const s of this.#roomSlots) {
      if (roomCount >= groupMap.size) {
        break;
      }
      let rooms = [];
      if (this.#abReview === true) {
        rooms = s.getRooms().filter(r => ((r.getNotNeeded().bool === true && r.getNotNeeded().topic !== topic) || r.getNotNeeded().topic === ''));
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
          for (let i = maxNumberOfRoomsInSlots; i < rooms.length; i++) {
            rooms[i].setNotNeeded(true, topic);
          }
        }
      } else {
        roomCount += rooms.length;
      }
    }
    if (this.#authorIsNotary === false && groupMap.size === 2 && this.#participantsPerReview === 6) throw new Error('If only 2 groups per topic exist, authorIsNotary must be active.', { cause: 'prechecksFailed' });
    if (groupMap.size < 2) throw new Error('At least 2 groups are needed.', { cause: 'prechecksFailed' });
    for (const value of this.getGroupMap(participants).values()) {
      if ((this.#abReview === false && ((participants.length - value.length) < (this.#participantsPerReview - 1))) || ((participants.length) < (this.#participantsPerReview - 1))) {
        throw new Error('There are not enough participants to build review groups.', { cause: 'prechecksFailed' });
      }
    }
    if (!errorMessage) {
      if (groupMap.size > roomCountWithNotNeededRooms) errorMessage += `There are not enough rooms for ${Array.from(this.getGroupMap(this.#participants).keys()).length} groups with this settings.\n`;
      else if (groupMap.size > roomCount) errorMessage += `With the current configuration only ${maxNumberOfRoomsInSlots} rooms per slot can be used to schedule reviews. Please add more rooms to the slots with less then ${maxNumberOfRoomsInSlots} rooms or create more slots.\n`;
      if (minAmountOfSlots > this.#roomSlots.length) errorMessage += `There are not enough slots. Minimum amount: ${minAmountOfSlots}\n`;
    }
    if (errorMessage) {
      throw new Error(errorMessage, { cause: 'prechecksFailed' });
    }
  }

  /**
   * Because the generation of non english reviews is a bit different, they get their own checks after filtration of non german participants
   * @throws {Error} - to show what's the problem
   */
  checksLanguageLevel () {
    this.#notGermanSpeaker = this.#participants.filter(p => p.getLanguageLevel() === 'A1' || p.getLanguageLevel() === 'A2' || p.getLanguageLevel() === 'B1');
    this.#numberOfReviewers = 3;
    this.#participantsPerReview = 6;
    const groupMap = this.getGroupMap(this.#notGermanSpeaker);

    if (this.#notGermanSpeaker.length === this.#participants.length) {
      throw new Error('All participants are unable to make german reviews. You should disable the \'international Groups\' Setting in this case.', { cause: 'prechecksFailed' }); // TODO check in frontend
    }
    if (groupMap.size < 2) {
      throw new Error('At least 2 international groups are needed.');
    }
    for (const participantsPerGroup of groupMap.values()) {
      if (this.#notGermanSpeaker.length - participantsPerGroup.length < 3) {
        throw new Error('There are not enough participants to build international review groups.');
      }
    }
    this.#calcIntGroups(groupMap);
  }

  /**
   * Set the reviews of the participants with a german language skill level lower than B2
   * The function tries to set the moderator and the notary from another group than the creator group,
   * but in case there are not enough participants the function use the members of the creator group for this role
   * to make the english spoken review possible
   * @param {map} groupMap - Map with key= group name and value= group members
   */
  #calcIntGroups (groupMap) {
    let numberOfTries = 0;
    let i = 0;
    const groupMapCopy = groupMap;
    while (groupMapCopy.size > 0 && numberOfTries < 10) {
      for (const group of groupMapCopy) {
        for (const s of this.#roomSlots) {
          const [groupNum, creator] = group;
          if (i >= s.getRooms().length) {
            continue;
          }
          let review;
          const room = s.getRooms()[i];
          if (room.getReview() === null) {
            const numPosParticipants = this.#notGermanSpeaker.filter((p) => creator[0].getGroup() !== p.getGroup() && !p.isActiveInSlot(s)).length;
            if (numPosParticipants < 3) {
              continue;
            }
            room.setReview(new Review(s, creator[0]));
            review = room.getReview();
            review.fillPossibleParticipantsOfReview(s, this.#notGermanSpeaker, false);
            if (numPosParticipants === 3 && (creator.length >= 3 || (creator.length === 2 && this.#authorIsNotary === true))) {
              review.setModerator(this.#roomSlots, this.#roomSlots.indexOf(s), creator[1], this.#breakForModeratorAndReviewer);
              if (this.#authorIsNotary === true) {
                review.setNotary(s, review.getAuthor(), this.#authorIsNotary);
              } else {
                review.setNotary(s, creator[2], this.#authorIsNotary);
              }
            } else if (numPosParticipants === 4 && creator.length >= 2) {
              this.#assignModeratorToReview(s, review);
              if (this.#authorIsNotary === true) {
                review.setNotary(s, review.getAuthor(), this.#authorIsNotary);
              } else {
                review.setNotary(s, creator[1], this.#authorIsNotary);
              }
            } else if (numPosParticipants > 5) {
              this.#assignModeratorToReview(s, review);
              this.#assignNotaryToReview(s, review);
            } else {
              continue;
            }
            try {
              review.fillPossibleParticipantsOfReview(s, this.#notGermanSpeaker, false);
              this.#numberOfReviewers = 3;
              this.#assignReviewersToReview(s, review);
              groupMapCopy.delete(groupNum);
              i = 0;
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
            break;
          }
        }
      }
    }
  }

  /**
   * Loops over all participants and create a group map with key= group name and value= group members
   * @return {map} Map<groupName,List<groupMember>>
   */
  getGroupMap (participants) {
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

  /**
   * Loops over all participants and create a group map with key= topic and value= all participants that worked on this topic
   * @return {map} Map<topic,List<participants>>
   */
  getTopicMap () {
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
  * the selected participant should be part of the possibleParticipants list and should have an as lowest moderatorCount as possible
  * this will make sure that moderator role is equally distributed
  * @param {RoomSlot} roomSlot - to add the roomSlot in the activeInSlot list of the selected participant
  * @param {Review} review -to get some necessary parameter of the review
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
  * if not the selected participant should be part of the possibleParticipants list and should have an as lowest notaryCount as possible
  * this will make sure that notary role is equally distributed
  * @param {RoomSlot} roomSlot - to add the roomSlot in the activeInSlot list of the selected participant
  * @param {Review} review -to get some necessary parameter of the review
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
  * the selected participant should be part of the possibleParticipants list and should have an as lowest reviewerCount as possible
  * this will make sure that notary role is equally distributed
  * @param {RoomSlot} roomSlot - to add the roomSlot in the activeInSlot list of the selected participant
  * @param {Review} review -to get some necessary parameter of the review
  * @throws {Error} throws an error in case of not enough participants or no founded solution
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
            .sort((a, b) => a.getActiveSlotsWithoutBrakes().length - b.getActiveSlotsWithoutBrakes().length)
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
  * the number depends on the settings and the number of participants
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
        room.resetReview();
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
        console.log('Author: ', converter.getParticipantAttributesForPrintingEnglish(room.getReview().getAuthor()));
        console.log('Moderator: ', converter.getParticipantAttributesForPrintingEnglish(room.getReview().getModerator()));
        console.log('Notary: ', converter.getParticipantAttributesForPrintingEnglish(room.getReview().getNotary()));
        for (const reviewer of room.getReview().getReviewer()) {
          console.log('Reviewer: ', converter.getParticipantAttributesForPrintingEnglish(reviewer));
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
    if (this.#internationalGroups) {
      console.log('------------international Students------------------');
      this.#notGermanSpeaker.forEach((p) => console.log('id:' + ++i + 'active:' + p.getActiveSlotsWithoutBrakes().length + p.getLastName() + ' ' + p.getFirstName() + ' n:' + p.getNotaryCount() + ' a:' + p.getAuthorCount() + ' m:' + p.getModeratorCount() + ' r:' + p.getReviewerCount()));
    }
  }
}
