import { saveAs } from 'file-saver';
import ConverterForPrinting from './ConverterForPrinting';
import JSZip from 'jszip';

export default class RevagerLiteExport {
  buildZipWithAllRevagerLiteFiles (roomSlots) {
    const jsZip = new JSZip();
    for (const roomSlot of roomSlots) {
      for (const room of roomSlot.getRooms()) {
        if (!room.getReview()) {
          continue;
        }
        const reviewJSON = this.buildJSONSingleReview(roomSlot, room);
        const reviewFileName = `revager-lite-${room
          .getReview()
          .getGroupName()}.rev`;

        jsZip.file(reviewFileName, reviewJSON);
      }
    }
    jsZip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'revager-lite-reviews.zip');
    });
  }

  buildJSONSingleReview (roomSlot, room) {
    const dateTimeConverter = new ConverterForPrinting();
    const procuctTitle = room.getReview().getAuthor().getTopic() ? room.getReview().getAuthor().getTopic() : 'Product title';

    const outputSlot = {
      reviewType: 1,
      product: {
        title: procuctTitle,
        description: 'Product description'
      },
      description: '',
      location: room.getName(),
      participants: this.#getParticipants(room.getReview()),
      allAspects: [],
      date: dateTimeConverter.getYYYYmmDDforRevagerLite(roomSlot.getDate()),
      startTime: dateTimeConverter.getTimeHHmm(roomSlot.getStartTime()),
      endTime: dateTimeConverter.getTimeHHmm(roomSlot.getEndTime())
    };

    const revagerLiteString = JSON.stringify(outputSlot, null, 1);
    return revagerLiteString;
  }

  #getParticipants (review) {
    const participants = [];

    const exportAuthor = this.#getSingleParticipant(
      review.getAuthor(),
      'Author'
    );
    participants.push(exportAuthor);

    const exportNotary = this.#getSingleParticipant(
      review.getNotary(),
      'Scribe'
    );
    participants.push(exportNotary);

    const exportModerator = this.#getSingleParticipant(
      review.getModerator(),
      'Moderator'
    );
    participants.push(exportModerator);

    for (const reviewer of review.getReviewer()) {
      const exportReviewer = this.#getSingleParticipant(reviewer, 'Reviewer');
      participants.push(exportReviewer);
    }

    return participants;
  }

  #getSingleParticipant (participant, role) {
    return {
      firstName: participant.getFirstName(),
      lastName: participant.getLastName(),
      id: participant.getId(),
      contact: participant.getEmail(),
      role,
      aspect: []
    };
  }
}
