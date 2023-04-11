//setup
let participants = [
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
];

/*let participants = new TestData().participants;
let roomSlots = new TestData().roomSlots;*/

let reviewerCount = 0;
const authorIsNotary = false;

algo();

function algo() {
  prechecks();

  const groups = getAllGroups();

  errorFound = true;
  while (errorFound) {
    setAuthorOfRandomGroupMember(groups);
    calculateReviewerCount(groups);
    for (roomSlot of roomSlots) {
      for (room of roomSlot.rooms) {
        if (room.review == null) {
          continue;
        }
        fillPossibleParticipantsOfReview(
          getSlotFromRoomSlot(roomSlot),
          room.review
        );
        assignModeratorToReview(roomSlot, room.review);
        assignNotaryToReview(roomSlot, room.review);
        try {
          assignReviewersToReview(roomSlot, room.review);
          errorFound = false;
        } catch (error) {
          console.log(error.message);
          errorFound = true;
          clearReviews();
        }
      }
    }
  }

  console.log(roomSlots);
  for (s of roomSlots) {
    console.log(s);
    for (room of s.rooms) {
      if (room.review == null) {
        continue;
      }
      console.log(room.review.author);
      console.log(room.review.moderator);
      console.log(room.review.notary);
      for (reviewer of room.review.reviewers) {
        console.log(reviewer);
      }
    }
  }

  xyz = participants.sort(
    (a, b) => a.activeInSlots.length - b.activeInSlots.length
  );
  for (p of xyz) {
    console.log(p);
  }

  localStorage.setItem("roomSlots", JSON.stringify(roomSlots));
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
    if (!groups.includes(p.group)) {
      groups.push(p.group);
    }
  }
  return groups;
}

function setAuthorOfRandomGroupMember(groups) {
  //select an author out of every group and add him in a new review
  groups.forEach((group) => {
    groupParticipants = participants.filter((p) => p.group == group);
    rand = Math.floor(Math.random() * groupParticipants.length);
    author = groupParticipants[rand];
    // author.role = "Author";
    newReview = new Review(author);

    roomFound = false;
    for (let roomSlot of roomSlots) {
      if (roomFound) {
        break;
      }
      for (let room of roomSlot.rooms) {
        if (room.review == null) {
          room.review = newReview;
          author.activeInSlots.push(getSlotFromRoomSlot(roomSlot));
          author.authorCount++;
          roomFound = true;
          break;
        }
      }
    }
    //if author == notary is checked -> review.notary = author
  });
}

function fillPossibleParticipantsOfReview(slot, review) {
  review.possibleParticipants = participants.filter(
    (p) => review.author.group != p.group && !p.isActiveInSlot(slot)
  );
}

function assignModeratorToReview(roomSlot, review) {
  rand = Math.floor(Math.random() * review.possibleParticipants.length);
  review.moderator = review.possibleParticipants[rand];
  // review.moderator.role = "Moderator";
  review.moderator.activeInSlots.push(getSlotFromRoomSlot(roomSlot));
  review.moderator.moderatorCount++;
  review.possibleParticipants.splice(
    review.possibleParticipants.indexOf(review.moderator),
    1
  );
}

function assignNotaryToReview(roomSlot, review) {
  if (authorIsNotary == false) {
    rand = Math.floor(Math.random() * review.possibleParticipants.length);
    review.notary = review.possibleParticipants[rand];
    review.notary.activeInSlots.push(getSlotFromRoomSlot(roomSlot));
    review.notary.notaryCount++;
    review.possibleParticipants.splice(
      review.possibleParticipants.indexOf(review.notary),
      1
    );
  } else {
    review.notary = review.author;
  }
  //  review.notary.role = "Notary";
}

function assignReviewersToReview(roomSlot, review) {
  if (review.possibleParticipants.length < reviewerCount) {
    throw new Error("noSolution");
  }

  for (i = 0; i < reviewerCount; i++) {
    try {
      rand = Math.floor(Math.random() * review.possibleParticipants.length);
      let reviewer = review.possibleParticipants[rand];
      review.reviewers.push(reviewer);
      //   reviewer.role = "Reviewer";
      reviewer.activeInSlots.push(getSlotFromRoomSlot(roomSlot));
      reviewer.reviewerCount++;
      review.possibleParticipants.splice(
        review.possibleParticipants.indexOf(reviewer),
        1
      );
    } catch (error) {
      throw new Error("noSolution");
    }
  }
}

function calculateReviewerCount(groups) {
  if (authorIsNotary) {
    reviewerCount = (2 * participants.length) / groups.length - 2;
  } else {
    reviewerCount = (2 * participants.length) / groups.length - 3;
  }
}

function clearReviews() {
  for (let roomSlot of roomSlots) {
    for (let room of roomSlot.rooms) {
      room.review = null;
    }
  }

  for (let p of participants) {
    p.activeInSlots = [];
    p.reviewerCount = 0;
    p.authorCount = 0;
    p.notaryCount = 0;
    p.moderatorCount = 0;
  }
}

function getSlotFromRoomSlot(roomSlot) {
  newSlot = new Slot();
  newSlot.date = roomSlot.date;
  newSlot.startTime = roomSlot.startTime;
  newSlot.endTime = roomSlot.endTime;

  return newSlot;
}
