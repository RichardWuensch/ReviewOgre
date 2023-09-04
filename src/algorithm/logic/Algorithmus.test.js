import Algorithm from './Algorithm';
import { getParticipants, getRoomSlots, getSettings } from './Testdata';
import Participant from '../../data/models/Participant';

// ----------------------------correct input validation errors-------------------------------
describe('failed input validation', () => {
  describe('checks()', () => {
    test('no participants', () => {
      const algorithm = new Algorithm([], null, getRoomSlots(), null, getSettings());
      expect(() => algorithm.run()).toThrow('There are no participants.');
    });

    test('not enough participants', () => {
      const algorithm = new Algorithm(getParticipants().slice(0, 7), null, getRoomSlots(), null, getSettings());
      expect(() => algorithm.run()).toThrow('There are not enough participants to build review groups.');
    });

    test('not enough rooms not enough slots - no slots', () => {
      const algorithm = new Algorithm(getParticipants().slice(0, 8), null, [], null, getSettings());
      expect(() => algorithm.run()).toThrow('There are not enough rooms for 3 groups with this settings.\nThere are not enough slots. Minimum amount: 3\n');
    });

    test('not enough slots wrong room distribution between the slots - no slots', () => {
      const algorithm = new Algorithm(getParticipants().slice(0, 8), null, getRoomSlots().splice(0, 1), null, getSettings());
      expect(() => algorithm.run()).toThrow('With the current configuration only 1 rooms per slot can be used to schedule reviews. Please add more rooms to the slots with less then 1 rooms or create more slots.\nThere are not enough slots. Minimum amount: 3');
    });

    test('At least 2 groups needed', () => {
      const p = getParticipants().slice(0, 21);
      p.forEach(p => p.setGroup('1'));
      const algorithm = new Algorithm(p, null, getRoomSlots().splice(0, 3), null, getSettings());
      expect(() => algorithm.run()).toThrow('At least 2 groups are needed');
    });
  });

  describe('prechecks()', () => {
    test('not all participants have german skill level set', () => {
      const p = getParticipants();
      p.forEach(p => p.setLanguageLevel(undefined));
      const setting = {
        authorIsNotary: false,
        breakForModeratorAndReviewer: false,
        abReview: false,
        internationalGroups: true
      };
      const algorithm = new Algorithm(p, null, getRoomSlots(), null, setting);
      expect(() => algorithm.run()).toThrow('Some participants have no German Skill Level');
    });

    const setting = {
      authorIsNotary: false,
      breakForModeratorAndReviewer: false,
      abReview: true,
      internationalGroups: false
    };

    test('For AB-Reviews at least 2 different topics are needed', () => {
      const p = getParticipants();
      p.forEach(p => p.setTopic('A'));
      const algorithm = new Algorithm(p, null, getRoomSlots(), null, setting);
      expect(() => algorithm.run()).toThrow('For AB-Reviews at least 2 different topics are needed');
    });

    test('not all participants have topic set', () => {
      const p = getParticipants();
      p.forEach(p => p.setTopic(undefined));
      const algorithm = new Algorithm(p, null, getRoomSlots(), null, setting);
      expect(() => algorithm.run()).toThrow('Some participants have no topic');
    });
  });

  describe('checksLanguageLevel()', () => {
    const setting = {
      authorIsNotary: false,
      breakForModeratorAndReviewer: false,
      abReview: false,
      internationalGroups: true
    };

    test('no german participants', () => {
      const p = getParticipants();
      p.forEach(p => p.setLanguageLevel('A1'));

      const algorithm = new Algorithm(p, null, getRoomSlots(), null, setting);
      expect(() => algorithm.run()).toThrow('All participants are unable to make german reviews. You should disable the \'international Groups\' Setting in this case.');
    });

    test('not enough participants to build international review groups', () => {
      const p = getParticipants();
      for (let i = 0; i < 5; i++) {
        p[i].setLanguageLevel('A1');
      }
      const algorithm = new Algorithm(p, null, getRoomSlots(), null, setting);
      expect(() => algorithm.run()).toThrow('There are not enough participants to build international review groups.');
    });

    test('not at least 2 international groups', () => {
      const p = getParticipants();
      for (let i = 0; i < 9; i++) {
        p[i].setLanguageLevel('A1');
        p[i].setGroup('1');
      }
      const algorithm = new Algorithm(p, null, getRoomSlots(), null, setting);
      expect(() => algorithm.run()).toThrow('At least 2 international groups are needed.');
    });
  });
});

// -----------------------------test of the helper methods-------------------------------
describe('helperMethods', () => {
  test('groupMap', () => {
    const p = getParticipants().splice(0, 9);
    const groupMap = new Algorithm(p, null, getRoomSlots(), null, getSettings()).getGroupMap(getParticipants().splice(0, 9));
    expect(groupMap.size).toBe(3);
  });

  test('groupTopicMap', () => {
    const topicMap = new Algorithm(getParticipants(), null, getRoomSlots(), null, getSettings()).getTopicMap();
    expect(topicMap.size).toBe(2);
  });
});

// -----------------------------successful runs result tests-------------------------------
describe('result tests', () => {
  test('correct number of reviews', () => {
    const roomSlots = getRoomSlots();
    const algorithm = new Algorithm(getParticipants(), null, roomSlots, null, getSettings());
    algorithm.run();
    let counter = 0;
    for (const roomSlot of roomSlots) {
      for (const room of roomSlot.getRooms()) {
        if (room.getReview() !== null) {
          counter++;
        }
      }
    }
    expect(counter).toBe(36); // 36 is the sum of expected reviews (one review per group)
  });

  test('author is notary setting', () => {
    const roomSlots = getRoomSlots();
    const setting = {
      authorIsNotary: true,
      breakForModeratorAndReviewer: false,
      abReview: false,
      internationalGroups: false
    };
    const algorithm = new Algorithm(getParticipants(), null, roomSlots, null, setting);
    algorithm.run();
    let counter = 0;
    for (const roomSlot of roomSlots) {
      for (const room of roomSlot.getRooms()) {
        if (room.getReview() !== null) {
          if (room.getReview().getAuthor() === room.getReview().getNotary()) {
            counter++;
          }
        }
      }
    }
    expect(counter).toBe(36); // 36 is the sum of expected reviews (one review per group)
  });

  test('ab Review - topic of author differs from the rest of the review team', () => {
    const roomSlots = getRoomSlots();
    const setting = {
      authorIsNotary: true,
      breakForModeratorAndReviewer: false,
      abReview: true,
      internationalGroups: false
    };
    const algorithm = new Algorithm(getParticipants(), null, roomSlots, null, setting);
    algorithm.run();
    let counter = 0;
    for (const roomSlot of roomSlots) {
      for (const room of roomSlot.getRooms()) {
        if (room.getReview() !== null) {
          const authorTopic = room.getReview().getAuthor().getTopic();
          if (authorTopic !== room.getReview().getModerator().getTopic()) {
            let reviewerCheck = false;
            for (const reviewer of room.getReview().getReviewer()) {
              if (reviewer.getTopic() === authorTopic) {
                reviewerCheck = true;
              }
            }
            if (reviewerCheck === false) {
              counter++;
            }
          }
        }
      }
    }
    expect(counter).toBe(36); // 36 is the sum of expected reviews (one review per group)
  });

  test('international Groups - students with lower than B2 are in the not german reviews', () => {
    const roomSlots = getRoomSlots();
    const p = getParticipants();
    for (let i = 0; i < 6; i++) {
      p[i].setLanguageLevel('B1');
    }
    const setting = {
      authorIsNotary: true,
      breakForModeratorAndReviewer: false,
      abReview: false,
      internationalGroups: true
    };
    const algorithm = new Algorithm(p, null, roomSlots, null, setting);
    algorithm.run();
    let counter = 0;
    for (const roomSlot of roomSlots) {
      for (const room of roomSlot.getRooms()) {
        if (room.getReview() !== null) {
          const authorLanguage = room.getReview().getAuthor().getLanguageLevel();
          if (authorLanguage === room.getReview().getModerator().getLanguageLevel()) {
            let reviewerCheck = false;
            for (const reviewer of room.getReview().getReviewer()) {
              if (reviewer.getLanguageLevel() !== authorLanguage) {
                reviewerCheck = true;
              }
            }
            if (reviewerCheck === false) {
              counter++;
            }
          }
        }
      }
    }
    expect(counter).toBe(36); // 36 is the sum of expected reviews (one review per group)
  });

  test('international Groups - regarding to the less num of int participants, notary and moderator are from the authorsgroup', () => {
    const roomSlots = getRoomSlots();
    const p = getParticipants();
    for (let i = 0; i < 6; i++) {
      p[i].setLanguageLevel('B1');
    }
    const setting = {
      authorIsNotary: false,
      breakForModeratorAndReviewer: false,
      abReview: false,
      internationalGroups: true
    };
    const algorithm = new Algorithm(p, null, roomSlots, null, setting);
    algorithm.run();
    let counter = 0;
    for (const roomSlot of roomSlots) {
      for (const room of roomSlot.getRooms()) {
        if (room.getReview() !== null) {
          const author = room.getReview().getAuthor();
          if (author.getLanguageLevel() === 'B1') {
            if (room.getReview().getModerator().getGroup() === author.getGroup() && room.getReview().getNotary().getGroup() === author.getGroup()) {
              counter++;
            }
          } else {
            counter++;
          }
        }
      }
    }
    expect(counter).toBe(36); // 36 is the sum of expected reviews (one review per group)
  });

  test('international Groups - regarding to the num of int participants, notary is from the authorsgroup', () => {
    const roomSlots = getRoomSlots();
    const p = getParticipants();
    for (let i = 0; i < 7; i++) {
      p[i].setLanguageLevel('B1');
    }
    const setting = {
      authorIsNotary: false,
      breakForModeratorAndReviewer: false,
      abReview: false,
      internationalGroups: true
    };
    const algorithm = new Algorithm(p, null, roomSlots, null, setting);
    algorithm.run();
    let counter = 0;
    for (const roomSlot of roomSlots) {
      for (const room of roomSlot.getRooms()) {
        if (room.getReview() !== null) {
          const author = room.getReview().getAuthor();
          if (author.getLanguageLevel() === 'B1') {
            if (room.getReview().getModerator().getGroup() !== author.getGroup() && room.getReview().getNotary().getGroup() === author.getGroup()) {
              counter++;
            }
          } else {
            counter++;
          }
        }
      }
    }
    expect(counter).toBe(36); // 36 is the sum of expected reviews (one review per group)
  });

  test('add Reviewer without a review role to a random review', () => {
    const p = getParticipants();
    p.push(new Participant(undefined, undefined, 'Risa', 'Davis', 'non.sollicitudin.a@dapibusgravida.com', 36, 'B', 'Native Speaker'));
    p.push(new Participant(undefined, undefined, 'Fay', 'Russell', 'iaculis@atlacusQuisque.org', 36, 'B', 'Native Speaker'));
    p.push(new Participant(undefined, undefined, 'Jaden', 'Kemp', 'ante.blandit@urnaUttincidunt.ca', 36, 'B', 'Native Speaker'));

    const algorithm = new Algorithm(p, null, getRoomSlots(), null, getSettings());
    algorithm.run();
    expect(p.filter(p => p.getReviewerCount() === 0).length).toBe(0); // 36 is the sum of expected reviews (one review per group)
  });
});
