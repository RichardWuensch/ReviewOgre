class Algorithm {
  #numberOfReviewers = 0;

  #participants;
  #roomSlots;
  #authorIsNotary;

  constructor(participants, roomSlots, authorIsNotary) {
    this.#participants = participants;
    this.#roomSlots = roomSlots;
    this.#authorIsNotary = authorIsNotary;
  }

  run() {
    this.#prechecks();

    const groups = this.#getAllGroups();
    let errorFound = true;
    while (errorFound) {
      //run as long as no solution is found
      this.#setAuthorOfRandomGroupMember(groups);
      this.#calculateNumberOfReviewer(groups);
      for (let roomSlot of this.#roomSlots) {
        for (let room of roomSlot.getRooms()) {
          if (room.getReview() == null) {
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
            errorFound = true;
            this.#clearReviews();
          }
        }
      }
    }
  }

  #prechecks() {
    //if count of rooms >= count of groups
    //are there enough groups for the calculation?
    //do slot times overlap?
  }

  #getAllGroups() {
    let groups = [];

    //get all groups out of participants
    for (let p of this.#participants) {
      if (!groups.includes(p.getGroup())) {
        groups.push(p.getGroup());
      }
    }
    return groups;
  }

  #setAuthorOfRandomGroupMember(groups) {
    //select an author out of every group and add him in a new review
    groups.forEach((group) => {
      const groupParticipants = this.#participants.filter(
        (p) => p.getGroup() == group
      );
      const rand = Math.floor(Math.random() * groupParticipants.length);
      let author = groupParticipants[rand];
      let newReview = new Review(author);

      let roomFound = false;
      for (let roomSlot of this.#roomSlots) {
        if (roomFound) {
          break;
        }
        for (let room of roomSlot.getRooms()) {
          if (room.getReview() == null) {
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

  #fillPossibleParticipantsOfReview(slot, review) {
    //search all possible participants for this review (Participant should not be in the same group as the author and should not already active in the slot of this review)
    review.setPossibleParticipants(
      this.#participants.filter(
        (p) =>
          review.getAuthor().getGroup() != p.getGroup() &&
          !p.isActiveInSlot(slot)
      )
    );
  }

  #assignModeratorToReview(roomSlot, review) {
    //set the notary for the review
    let counter = 1;
    while (true) {
      let filteredModerator = review
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

  #assignNotaryToReview(roomSlot, review) {
    //set the notary for the review
    if (this.#authorIsNotary == false) {
      counter = 1;
      while (true) {
        filteredNotary = review
          .getPossibleParticipants()
          .filter((n) => n.getNotaryCount() < counter);
        if (filteredNotary.length > 0) {
          rand = Math.floor(Math.random() * filteredNotary.length);
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
      //if the author schould be the notary
      review.setNotary(review.getAuthor());
    }
  }

  #assignReviewersToReview(roomSlot, review) {
    //set the reviewers for the review
    //if there is noSolution possible a Error is thrown
    if (review.getPossibleParticipants().length < this.#numberOfReviewers) {
      //check if there are enougth possibleParticipants
      throw new Error("noSolution");
    }

    for (let i = 0; i < this.#numberOfReviewers; i++) {
      try {
        let reviewer = {};
        let counter = 1;
        while (true) {
          //iterates over the pariticipants and select one as reviewer from a List with the lowest reviewerCount
          let filteredReviewer = review
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
        throw new Error("noSolution");
      }
    }
  }

  #calculateNumberOfReviewer(groups) {
    //calculates how many reviews a necessary
    if (this.#authorIsNotary) {
      this.#numberOfReviewers =
        (2 * this.#participants.length) / groups.length - 2;
    } else {
      this.#numberOfReviewers =
        (2 * this.#participants.length) / groups.length - 3;
    }
  }

  #clearReviews() {
    //clear the Slots and the statistic values from the participants
    for (let roomSlot of this.#roomSlots) {
      for (let room of roomSlot.getRooms()) {
        room.setReview(null);
      }
    }

    for (let p of this.#participants) {
      p.resetStatistics();
    }
  }

  #getSlotFromRoomSlot(roomSlot) {
    //returns only the upper class Slot from a room slot
    return new Slot(
      roomSlot.getDate(),
      roomSlot.getStartTime(),
      roomSlot.getEndTime()
    );
  }

  printResult() {
    //print the complete resultstack
    console.log(this.#roomSlots);
  }

  printReviews() {
    //print the Review without unneccesary attributs
    for (let s of this.#roomSlots) {
      console.log(s);
      for (room of s.getRooms()) {
        if (room.getReview() == null) {
          continue;
        }
        console.log(room.getReview().getAuthor());
        console.log(room.getReview().getModerator());
        console.log(room.getReview().getNotary());
        for (reviewer of room.getReview().getReviewer()) {
          console.log(reviewer);
        }
      }
    }
  }

  printParticipantsSortByAmountOfActiveInSlots() {
    //print all participants sorted by the amount of activities
    this.#participants
      .sort((a, b) => a.getActiveSlots().length - b.getActiveSlots().length)
      .forEach((p) => console.log(p));
  }

  printJSONinLocalStorage() {
    //load the result as JSON-String in the LocalStorage of the Browser
    //it is possible to have a nicer look of the result with a formatter
    localStorage.setItem("roomSlots", JSON.stringify(this.#roomSlots));
  }
}
