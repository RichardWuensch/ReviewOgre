import RoomSlotHelper from '../../data/store/RoomSlotHelper';

export default class Mail {
  #roomSlots;
  constructor () {
    this.#roomSlots = new RoomSlotHelper().getAllRoomSlots();
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
  germanVersion (roomSlot, room, review, moderator/*, attachment */) {
    const recipient = moderator.getEmail();
    const subject = 'Sie sind der Moderator von Review ' + review.getGroupName();
    let body = 'Hallo ' + moderator.getFirstName() + ' ' + moderator.getLastName() + ',\n' +
          'Sie wurden als Moderator bestimmt. Hier die wichtigsten Informationen: \n';
    body += '\n' + 'Review: ' + review.getGroupName() +
                     ' am ' + this.getDataDDmmYYYYforPrinting(roomSlot.getDate()) +
                     ' von ' + this.getTimeHHmm(roomSlot.getStartTime()) +
                     ' bis ' + this.getTimeHHmm(roomSlot.getEndTime()) +
                     ' in Raum ' + room.getName();
    body += room.hasBeamer() ? '\nBeamer verfügbar' : '\nKein Beamer verfügbar';
    body += '\nAutor: ' + this.getParticipantAttriburesForPrinting(review.getAuthor());
    body += '\nNotar: ' + this.getParticipantAttriburesForPrinting(review.getNotary());
    for (const reviewer of review.getReviewer()) {
      body += '\nReviewer: ' + this.getParticipantAttriburesForPrinting(reviewer);
    }
    body += '\n\n Bitte kontaktieren Sie Ihre Teilnehmer mit den entsprechenden Aufgaben.';
    body += '\n Die RevAger-Lite-Datei im Anhang hilft Ihnen bei der Vorbereitung des Reviews.';
    this.openMailClient(recipient, subject, body /* ,attachment */);
  }

  /**
  * Generate content of the Mail in englisch and call the openMailClient-function 
  * @param {RoomSlot} roomSlot
  * @param {Room} room
  * @param {Review} review 
  * @param {Moderator} moderator 
  */
  englischVersion (roomSlot, room, review, moderator/*, attachment */) {
    const recipient = moderator.getEmail();
    const subject = 'Your are the moderator of ' + review.getGroupName();
    let body = 'Hello ' + moderator.getFirstName() + ' ' + moderator.getLastName() + ',\n' +
          'You have been designated as the moderator. Here are the most important information: \n';
    body += '\n' + 'Review: ' + review.getGroupName() +
                     ' on ' + this.getDataDDmmYYYYforPrinting(roomSlot.getDate()) +
                     ' from ' + this.getTimeHHmm(roomSlot.getStartTime()) +
                     ' to ' + this.getTimeHHmm(roomSlot.getEndTime()) +
                     ' in room ' + room.getName();
    body += room.hasBeamer() ? '\nBeamer available' : '\nKein Beamer available';
    body += '\nAuthor: ' + this.getParticipantAttriburesForPrinting(review.getAuthor());
    body += '\nNoray: ' + this.getParticipantAttriburesForPrinting(review.getNotary());
    for (const reviewer of review.getReviewer()) {
      body += '\nReviewer: ' + this.getParticipantAttriburesForPrinting(reviewer);
    }
    body += '\n\n Please contact your participants with the appropriate tasks.';
    body += '\n The RevAger Lite file in the appendix will help you prepaing the review.';
    this.openMailClient(recipient, subject, body /* ,attachment */);
  }

  /**
  * Get the Date from the Date()
  * @param {date} date 
  * @returns {string} - in format 'dd.mm.yyyy'
  */
  getDataDDmmYYYYforPrinting (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return ((day < 10) ? ('0' + day) : day) + '.' + ((month < 10) ? ('0' + month) : month) + '.' + date.getFullYear();
  }

  /**
  * Get the Time from the Date()
  * @param {date} time 
  * @returns {string} - in format 'HH:MM'
  */
  getTimeHHmm (time) {
    const hour = time.getHours();
    const min = time.getMinutes();
    return ((hour < 10) ? ('0' + hour) : hour) + ':' + ((min < 10) ? ('0' + min) : min) + 'Uhr';
  }

  /**
  * Makes the participant to a simple string with the nessecary attributes
  * @param {participant} participant 
  * @returns {string} - in format 'FirstName LastName Email Group group'
  */
  getParticipantAttributesForPrinting (participant) {
    return participant.getFirstName() + ' ' + participant.getLastName() + ' ' + participant.getEmail() + ' Gruppe ' + participant.getGroup();
  }

  /**
  * Opens the default mail client on the user's computer and composes a new email with the specified recipient,
  * subject, and body. The recipient, subject, and body parameters are URL-encoded and appended to a 'mailto'
  * URL scheme, which is used to trigger the user's mail client to open and pre-fill the email fields.
  * @param {string} recipient - The email address of the recipient.
  * @param {string} subject - The subject line of the email.
  * @param {string} body - The body content of the email.
  * @param {string} attachment - The attachment of the mail contains the RevAger-File             //check datatype
  */
  openMailClient (recipient, subject, body /* , attachment */) {
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; // &attachment=${encodeURIComponent(attachment)}`;
    window.location.href = mailtoUrl;
  }
}
