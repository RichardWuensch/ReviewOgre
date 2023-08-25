import ConverterForPrinting from '../ConverterForPrinting';

export default class Mail {
  #converter = new ConverterForPrinting();
  #roomSlots;
  #mails = [];
  constructor (roomSlots) {
    this.#roomSlots = roomSlots;

    for (const roomSlot of this.#roomSlots) {
      for (const room of roomSlot.getRooms()) {
        const review = room.getReview();
        if (review === null) {
          continue;
        }
        const moderator = review.getModerator();
        if (moderator.getLanguageLevel() === 'A1' || moderator.getLanguageLevel() === 'A2' || moderator.getLanguageLevel() === 'B2') {
          this.#englishVersion(roomSlot, room, review, moderator);
        } else {
          this.#germanVersion(roomSlot, room, review, moderator);
        }
      }
    }
  }

  /**
  * Generate content of the Mail in german and call
  * @param {RoomSlot} roomSlot
  * @param {Room} room
  * @param {Review} review
  * @param {Participant} moderator
  */
  #germanVersion (roomSlot, room, review, moderator) {
    const recipient = moderator.getEmail();
    const ccRecipients = [review.getAuthor().getEmail(), review.getNotary().getEmail(), ...review.getReviewer().map(r => r.getEmail())];
    const subject = 'Sie sind der Moderator von Review ' + review.getGroupName();
    let body = 'Hallo ' + moderator.getFirstName() + ' ' + moderator.getLastName() + ',\n' +
          'Sie wurden als Moderator bestimmt. Hier die wichtigsten Informationen: \n';
    body += '\n' + 'Review: ' + review.getGroupName() +
                     ' am ' + this.#converter.getDataDDmmYYYYforPrinting(roomSlot.getDate()) +
                     ' von ' + this.#converter.getTimeHHmm(roomSlot.getStartTime()) +
                     ' bis ' + this.#converter.getTimeHHmm(roomSlot.getEndTime()) +
                     ' in Raum ' + room.getName();
    body += room.getBeamerNeeded() ? '\nBeamer benötigt' : '\nKein Beamer benötigt';
    body += '\nAutor: ' + this.#converter.getParticipantAttributesForPrintingGerman(review.getAuthor());
    body += '\nNotar: ' + this.#converter.getParticipantAttributesForPrintingGerman(review.getNotary());
    for (const reviewer of review.getReviewer()) {
      body += '\nReviewer: ' + this.#converter.getParticipantAttributesForPrintingGerman(reviewer);
    }
    body += '\n\nBitte kontaktieren Sie Ihre Teilnehmer mit den entsprechenden Aufgaben.';
    body += '\nDie RevAger-Lite-Datei im Anhang hilft Ihnen bei der Vorbereitung des Reviews.';

    this.#mails.push({ recipient, ccRecipients, subject, body });
  }

  /**
  * Generate content of the Mail in english and call
  * @param {RoomSlot} roomSlot
  * @param {Room} room
  * @param {Review} review
  * @param {Moderator} moderator
  */
  #englishVersion (roomSlot, room, review, moderator) {
    const recipient = moderator.getEmail();
    const ccRecipients = [review.getAuthor().getEmail(), review.getNotary().getEmail(), ...review.getReviewer().map(r => r.getEmail())];
    const subject = 'Your are the moderator of Review ' + review.getGroupName();
    let body = 'Hello ' + moderator.getFirstName() + ' ' + moderator.getLastName() + ',\n' +
          'You have been designated as the moderator. Here are the most important information: \n';
    body += '\n' + 'Review: ' + review.getGroupName() +
                     ' on ' + this.#converter.getDataDDmmYYYYforPrinting(roomSlot.getDate()) +
                     ' from ' + this.#converter.getTimeHHmm(roomSlot.getStartTime()) +
                     ' to ' + this.#converter.getTimeHHmm(roomSlot.getEndTime()) +
                     ' in room ' + room.getName();
    body += room.getBeamerNeeded() ? '\nBeamer needed' : '\nNo Beamer needed';
    body += '\nAuthor: ' + this.#converter.getParticipantAttributesForPrintingEnglish(review.getAuthor());
    body += '\nNotary: ' + this.#converter.getParticipantAttributesForPrintingEnglish(review.getNotary());
    for (const reviewer of review.getReviewer()) {
      body += '\nReviewer: ' + this.#converter.getParticipantAttributesForPrintingEnglish(reviewer);
    }
    body += '\n\nPlease contact your participants with the appropriate tasks.';
    body += '\nThe RevAger Lite file in the appendix will help you preparing the review.';

    this.#mails.push({ recipient, ccRecipients, subject, body });
  }

  /**
  * Opens the default mail client on the user's computer and composes a new email with the specified recipient,
  * allParticipants as CC, subject, and body. The recipient, subject, and body parameters are URL-encoded and appended to a 'mailto'
  * URL scheme, which is used to trigger the user's mail client to open and pre-fill the email fields.
  * The attachment with the corresponding RevAger (lite) file has to be added manually because mailto
  * does not allow attachments
  */
  openMailClient () {
    for (const mail of this.#mails) {
      const ccParams = mail.ccRecipients.map(ccRecipient => `${encodeURIComponent(ccRecipient)}`).join(';');
      window.location.href = `mailto:${mail.recipient}?cc=${ccParams}&subject=${encodeURIComponent(mail.subject)}&body=${encodeURIComponent(mail.body)}`;
    }
  }

  /**
   * Saves the mails in a .txt-file -> can be used to save the result and send it later via copy+paste in a mail client
   */
  saveMailsInTxt () {
    let result = '';
    for (const mail of this.#mails) {
      result += 'TO: ' + mail.recipient + '\n';
      result += 'CC: ' + mail.ccRecipients.map(ccRecipient => `${ccRecipient}`).join(';') + '\n';
      result += 'SUBJECT: ' + mail.subject + '\n';
      result += 'BODY: \n' + mail.body + '\n';
      result += '*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x' + '\n\n';
    }
    const newTab = window.open();
    newTab.document.title = 'mail.txt';
    newTab.document.write(`
        <html>
            <head>
                <title>mail.txt</title>
            </head>
            <body>
                <pre>${result}</pre>
            </body>
          </html>`);
  }
}
