let participants = [
  new Participant("Richard", 1),
  new Participant("Basti", 1),
  new Participant("Jakob", 2),
  new Participant("Nico", 2),
  new Participant("Hannah", 2)
]

let startDate1 = new Date()
startDate1.setHours(14)
let endDate1 = new Date()
endDate1.setHours(16)

let startDate2 = new Date()
startDate2.setHours(17)
let endDate2 = new Date()
endDate2.setHours(19)

slots = [
  new Slot(startDate1, endDate1),
  new Slot(startDate2, endDate2)
]

reviews = []

algo()

function algo() {
  setAuthorOfRandomGroupMember()
  assignReviewToSlot()
  fillPossibleParticipantsOfSlot()

  console.log(slots)
  console.log(reviews)
}

function setAuthorOfRandomGroupMember() {
  groups = []
  for(p of participants) {
    if(! groups.includes(p.group)) {
      groups.push(p.group)
    }
  }

  groups.forEach(group => {
    groupParticipants = participants.filter(p => p.group == group)
    rand = Math.floor(Math.random() * groupParticipants.length)
    author = groupParticipants[rand]
    author.role = "Author"
    reviews.push(new Review(author))
    //if author == notary is checked -> review.notary = author
  });
}

function assignReviewToSlot() {
  for(let i = 0; i < slots.length; i++) {
    slots[i].review = reviews[i]
  }
}

function fillPossibleParticipantsOfSlot() {
  slots.forEach(slot => {
    for(p of participants) {
      if(slot.review.groupName != p.group
        && p.role != 'Author') {          // plus: check if p is already in anothter room in that slot
        slot.possibleParticipants.push(p)
      }
    }
  })
}