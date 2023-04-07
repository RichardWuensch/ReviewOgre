//setup
let participants = [
  new Participant("Richard", 1),
  new Participant("Basti", 1),
  new Participant("Daniel", 1),
  new Participant("Jakob", 2),
  new Participant("Nico", 2),
  new Participant("Hannah", 2),
  new Participant("A", 3),
  new Participant("B", 3),
  new Participant("C", 3),
  new Participant("X", 4),
  new Participant("Y", 4),
  new Participant("Z", 4),
];

let startDate1 = new Date();
startDate1.setHours(14);
let endDate1 = new Date();
endDate1.setHours(16);

let startDate2 = new Date();
startDate2.setHours(17);
let endDate2 = new Date();
endDate2.setHours(19);

slots = [
  new Slot(startDate1, endDate1, [
    new Room("I.1.2", true),
    new Room("I.1.3", true),
  ]),
  new Slot(startDate2, endDate2, [
    new Room("I.2.2", true),
    new Room("I.2.3", true),
  ]),
];

reviewerCount = 0;

algo();

function algo() {
  prechecks();

  groups = [];
  getAllGroups();

  error = true;
  while (error) {
    setAuthorOfRandomGroupMember();
    calculateReviewerCount();
    for (slot of slots) {
      for (room of slot.rooms) {
        if (room.review == null) {
          continue;
        }
        fillPossibleParticipantsOfReview(slot, room.review);
        assignModeratorToReview(slot, room.review);
        assignNotaryToReview(slot, room.review);
        try {
          assignReviewersToReview(slot, room.review);
          error = false;
        } catch (error) {
          console.log("no Solution")
          error = true;
        }
      }
    }
    console.log(slots);
  }
  
}

function prechecks() {
  //if count of rooms >= count of groups
  //are there enough groups for the calculation?
  //do slot times overlap?
}

function getAllGroups() {
  //get all groups out of participants
  for (p of participants) {
    if (!groups.includes(p.group)) {
      groups.push(p.group);
    }
  }
}

function setAuthorOfRandomGroupMember() {
  //select an author out of every group and add him in a new review
  groups.forEach((group) => {
    groupParticipants = participants.filter((p) => p.group == group);
    rand = Math.floor(Math.random() * groupParticipants.length);
    author = groupParticipants[rand];
    author.role = "Author";
    newReview = new Review(author);

    roomFound = false;
    for (slot of slots) {
      if (roomFound) {
        break;
      }
      for (room of slot.rooms) {
        if (room.review == null) {
          room.review = newReview;
          author.activeInSlots.push(slot);
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
    (p) => review.author.group != p.group && !p.activeInSlots.includes(slot)
  );
}

function assignModeratorToReview(slot, review) {
  rand = Math.floor(Math.random() * review.possibleParticipants.length);
  review.moderator = review.possibleParticipants[rand];
  review.moderator.role = "Moderator";
  review.moderator.activeInSlots.push(slot);
  review.possibleParticipants.splice(
    review.possibleParticipants.indexOf(review.moderator),
    1
  );
}

function assignNotaryToReview(slot, review) {
  rand = Math.floor(Math.random() * review.possibleParticipants.length);
  review.notary = review.possibleParticipants[rand];
  review.notary.role = "Notary";
  review.notary.activeInSlots.push(slot);
  review.possibleParticipants.splice(
    review.possibleParticipants.indexOf(review.notary),
    1
  );
}

function assignReviewersToReview(slot, review) {
  //console.log(review.possibleParticipants);
  for (i = 0; i < reviewerCount; i++) {
    try{
    rand = Math.floor(Math.random() * review.possibleParticipants.length);
    let reviewer = review.possibleParticipants[rand];
    review.reviewers.push(reviewer);
    reviewer.role = "Reviewer";
    reviewer.activeInSlots.push(slot);
    review.possibleParticipants.splice(
      review.possibleParticipants.indexOf(reviewer),
      1
    );
  }
  catch(errorr){
    throw new Error("noSolution");
  }
}
}

function calculateReviewerCount() {
  reviewerCount = (2 * participants.length) / groups.length - 3;
}
