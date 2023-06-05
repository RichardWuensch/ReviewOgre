import ConverterForPrinting from '../ConverterForPrinting';

export default class Mail {
  #converter = new ConverterForPrinting();
  #roomSlots;
  constructor () {
    this.#roomSlots = null;// new RoomSlotHelper().getAllRoomSlots();
  }

  /**
  * iterate through all reviews and call the mail gernation the the language regarding to the languagelevel of the moderator
  */
  generateMailsForModerators () {
    for (const roomSlot of this.#roomSlots) {
      for (const room of roomSlot.getRooms()) {
        const review = room.getReview();
        if (review === null) {
          continue;
        }
        const moderator = review.getModerator();
        // if (moderator.getLanguagelevel()==='A'){
        this.germanVersion(roomSlot, room, review, moderator);
        /* }else{
          this.englischVersion(roomSlot, room, review, moderator);
        } */
      }
    }
  }

  /**
  * Generate content of the Mail in german and call the openMailClient-function
  * @param {RoomSlot} roomSlot
  * @param {Room} room
  * @param {Review} review
  * @param {Moderator} moderator
  */
  germanVersion (roomSlot, room, review, moderator) {
    const recipient = moderator.getEmail();
    const subject = 'Sie sind der Moderator von Review ' + review.getGroupName();
    let body = 'Hallo ' + moderator.getFirstName() + ' ' + moderator.getLastName() + ',\n' +
          'Sie wurden als Moderator bestimmt. Hier die wichtigsten Informationen: \n';
    body += '\n' + 'Review: ' + review.getGroupName() +
                     ' am ' + this.#converter.getDataDDmmYYYYforPrinting(roomSlot.getDate()) +
                     ' von ' + this.#converter.getTimeHHmm(roomSlot.getStartTime()) +
                     ' bis ' + this.#converter.getTimeHHmm(roomSlot.getEndTime()) +
                     ' in Raum ' + room.getName();
    body += room.hasBeamer() ? '\nBeamer verfügbar' : '\nKein Beamer verfügbar';
    body += '\nAutor: ' + this.#converter.getParticipantAttributsForPrinting(review.getAuthor());
    body += '\nNotar: ' + this.#converter.getParticipantAttributsForPrinting(review.getNotary());
    for (const reviewer of review.getReviewer()) {
      body += '\nReviewer: ' + this.#converter.getParticipantAttributsForPrinting(reviewer);
    }
    body += '\n\n Bitte kontaktieren Sie Ihre Teilnehmer mit den entsprechenden Aufgaben.';
    body += '\n Die RevAger-Lite-Datei im Anhang hilft Ihnen bei der Vorbereitung des Reviews.';
    this.openMailClient(recipient, subject, body);
  }

  /**
  * Generate content of the Mail in englisch and call the openMailClient-function
  * @param {RoomSlot} roomSlot
  * @param {Room} room
  * @param {Review} review
  * @param {Moderator} moderator
  */
  englischVersion (roomSlot, room, review, moderator) {
    const recipient = moderator.getEmail();
    const subject = 'Your are the moderator of ' + review.getGroupName();
    let body = 'Hello ' + moderator.getFirstName() + ' ' + moderator.getLastName() + ',\n' +
          'You have been designated as the moderator. Here are the most important information: \n';
    body += '\n' + 'Review: ' + review.getGroupName() +
                     ' on ' + this.#converter.getDataDDmmYYYYforPrinting(roomSlot.getDate()) +
                     ' from ' + this.#converter.getTimeHHmm(roomSlot.getStartTime()) +
                     ' to ' + this.#converter.getTimeHHmm(roomSlot.getEndTime()) +
                     ' in room ' + room.getName();
    body += room.hasBeamer() ? '\nBeamer available' : '\nKein Beamer available';
    body += '\nAuthor: ' + this.#converter.getParticipantAttributsForPrinting(review.getAuthor());
    body += '\nNoray: ' + this.#converter.getParticipantAttributsForPrinting(review.getNotary());
    for (const reviewer of review.getReviewer()) {
      body += '\nReviewer: ' + this.#converter.getParticipantAttributsForPrinting(reviewer);
    }
    body += '\n\n Please contact your participants with the appropriate tasks.';
    body += '\n The RevAger Lite file in the appendix will help you prepaing the review.';

    this.openMailClient(recipient, subject, body);
  }

  /**
  * Opens the default mail client on the user's computer and composes a new email with the specified recipient,
  * subject, and body. The recipient, subject, and body parameters are URL-encoded and appended to a 'mailto'
  * URL scheme, which is used to trigger the user's mail client to open and pre-fill the email fields.
  * The attachment with the corresponding RevAger (lite) file has to be added manually because mailto
  * does not allow attachments
  * @param {string} recipient - The email address of the recipient.
  * @param {string} subject - The subject line of the email.
  * @param {string} body - The body content of the email.
  */
  openMailClient (recipient, subject, body) {
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  }
}
