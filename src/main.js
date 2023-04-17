//setup
/*let participants = [
  new Participant("Richard", "", "", 1),
  new Participant("Basti", "", "", 1),
  new Participant("Daniel", "", "", 1),
  new Participant("Jakob", "", "", 2),
  new Participant("Nico", "", "", 2),
  new Participant("Hannah", "", "", 2),
  new Participant("A", "", "", 3),
  new Participant("B", "", "", 3),
  new Participant("C", "", "", 3),
  new Participant("X", "", "", 4),
  new Participant("Y", "", "", 4),
  new Participant("Z", "", "", 4),
];

let startDate1 = new Date();
startDate1.setHours(14);
let endDate1 = new Date();
endDate1.setHours(16);

let startDate2 = new Date();
startDate2.setHours(17);
let endDate2 = new Date();
endDate2.setHours(19);

let roomSlots = [
  new RoomSlot(new Date(), startDate1, endDate1, [
    new Room("I.1.2", true),
    new Room("I.1.3", true),
  ]),
  new RoomSlot(new Date(), startDate2, endDate2, [
    new Room("I.2.2", true),
    new Room("I.2.3", true),
  ]),
];*/

let participants = new TestData().participants;
let roomSlots = new TestData().roomSlots;

let numberOfReviewer = 0;
const authorIsNotary = true;

algo();
function algo() {
  prechecks();

  const groups = getAllGroups();
  errorFound = true;
  while (errorFound) {
    //run as long as no solution is found
    setAuthorOfRandomGroupMember(groups);
    calculateNumberOfReviewer(groups);
    for (roomSlot of roomSlots) {
      for (room of roomSlot.getRooms()) {
        if (room.getReview() == null) {
          continue;
        }
        fillPossibleParticipantsOfReview(
          getSlotFromRoomSlot(roomSlot),
          room.getReview()
        );
        assignModeratorToReview(roomSlot, room.getReview());
        assignNotaryToReview(roomSlot, room.getReview());
        try {
          assignReviewersToReview(roomSlot, room.getReview());
          errorFound = false;
        } catch (error) {
          console.log(error.message);
          errorFound = true;
          clearReviews();
        }
      }
    }
  }
  printAll(roomSlots);

  //printReviews(roomSlots);

  //printParticipantsSortByAmountOfActiveInSlots(participants);

  //printJSONinLocalStorage(roomSlots);
}

function prechecks() {
  //if count of rooms >= count of groups
  //are there enough groups for the calculation?
  //do slot times overlap?
}

function getAllGroups() {
  let groups = [];

  //get all groups out of participants
  for (let p of participants) {
    if (!groups.includes(p.getGroup())) {
      groups.push(p.getGroup());
    }
  }
  return groups;
}

function setAuthorOfRandomGroupMember(groups) {
  //select an author out of every group and add him in a new review
  groups.forEach((group) => {
    groupParticipants = participants.filter((p) => p.getGroup() == group);
    rand = Math.floor(Math.random() * groupParticipants.length);
    author = groupParticipants[rand];
    newReview = new Review(author);

    roomFound = false;
    for (let roomSlot of roomSlots) {
      if (roomFound) {
        break;
      }
      for (let room of roomSlot.getRooms()) {
        if (room.getReview() == null) {
          room.setReview(newReview);
          author.addSlotToActiveList(getSlotFromRoomSlot(roomSlot));
          author.increaseAuthorCount();
          roomFound = true;
          break;
        }
      }
    }
  });
}

function fillPossibleParticipantsOfReview(slot, review) {
  //search all possible participants for this review (Participant should not be in the same group as the author and should not already active in the slot of this review)
  review.setPossibleParticipants(
    participants.filter(
      (p) =>
        review.getAuthor().getGroup() != p.getGroup() && !p.isActiveInSlot(slot)
    )
  );
}

function assignModeratorToReview(roomSlot, review) {
  //set the notary for the review
  counter = 1;
  while (true) {
    filteredModerator = review
      .getPossibleParticipants()
      .filter((m) => m.getModeratorCount() < counter);
    if (filteredModerator.length > 0) {
      rand = Math.floor(Math.random() * filteredModerator.length);
      review.setModerator(filteredModerator[rand]);
      break;
    }
    counter++;
  }
  review.getModerator().addSlotToActiveList(getSlotFromRoomSlot(roomSlot));
  review.getModerator().increaseModeratorCount();
  review.deleteParticipantFromPossibleParticipants(review.getModerator());
}

function assignNotaryToReview(roomSlot, review) {
  //set the notary for the review
  if (authorIsNotary == false) {
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
    review.getNotary().addSlotToActiveList(getSlotFromRoomSlot(roomSlot));
    review.getNotary().increaseNotaryCount();
    review.deleteParticipantFromPossibleParticipants(review.getNotary());
  } else {
    //if the author schould be the notary
    review.setNotary(review.getAuthor());
  }
}

function assignReviewersToReview(roomSlot, review) {
  //set the reviewers for the review
  //if there is noSolution possible a Error is thrown
  if (review.getPossibleParticipants().length < numberOfReviewer) {
    //check if there are enougth possibleParticipants
    throw new Error("noSolution");
  }

  for (i = 0; i < numberOfReviewer; i++) {
    try {
      let reviewer = {};
      counter = 1;
      while (true) {
        //iterates over the pariticipants and select one as reviewer from a List with the lowest reviewerCount
        filteredReviewer = review
          .getPossibleParticipants()
          .filter((n) => n.getReviewerCount() < counter);
        if (filteredReviewer.length > 0) {
          rand = Math.floor(Math.random() * filteredReviewer.length);
          reviewer = filteredReviewer[rand];
          break;
        }
        counter++;
      }
      review.addReviewer(reviewer);
      reviewer.addSlotToActiveList(getSlotFromRoomSlot(roomSlot));
      reviewer.increaseReviewerCount();
      review.deleteParticipantFromPossibleParticipants(reviewer);
    } catch (error) {
      throw new Error("noSolution");
    }
  }
}

function calculateNumberOfReviewer(groups) {
  //calculates how many reviews a necessary
  if (authorIsNotary) {
    numberOfReviewer = (2 * participants.length) / groups.length - 2;
  } else {
    numberOfReviewer = (2 * participants.length) / groups.length - 3;
  }
}

function clearReviews() {
  //clear the Slots and the statistic values from the participants
  for (let roomSlot of roomSlots) {
    for (let room of roomSlot.getRooms()) {
      room.setReview(null);
    }
  }

  for (let p of participants) {
    p.resetStatistics();
  }
}

function getSlotFromRoomSlot(roomSlot) {
  //returns only the upper class Slot from a room slot
  return new Slot(
    roomSlot.getDate(),
    roomSlot.getStartTime(),
    roomSlot.getEndTime()
  );
}

function printAll(roomSlots) {
  //print the complete resultstack
  console.log(roomSlots);
}

function printReviews(roomSlots) {
  //print the Review without unneccesary attributs
  for (s of roomSlots) {
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

function printParticipantsSortByAmountOfActiveInSlots(participants) {
  //print all participants sorted by the amount of activities
  participants
    .sort((a, b) => a.getActiveSlots().length - b.getActiveSlots().length)
    .forEach((p) => console.log(p));
}

function printJSONinLocalStorage(roomSlots) {
  //load the result as JSON-String in the LocalStorage of the Browser
  //it is possible to have a nicer look of the result with a formatter
  localStorage.setItem("roomSlots", JSON.stringify(roomSlots));
}
