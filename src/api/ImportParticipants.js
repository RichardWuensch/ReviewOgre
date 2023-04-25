import Participant from '../data/model/Participant';
import { ParticipantStore } from '../data/store/ParticipantStore';
import ImportFile from './ImportFile';
import Papa from 'papaparse';

export default class ImportParticipants {
  async runStudentImport (event) {
    const fileContent = await new ImportFile('application/vnd.ms-excel').runFileLoad(event); // internal filetype is not text/csv
    return new Promise(() => {
      let groups = Papa.parse(fileContent).data.slice(2); // get all groups starting from index 2 (bc of separator and header)
      groups = groups.filter(row => row[0] !== ''); // delete empty lines
      const participants = this.parseParticipantsFromGroups(groups);
      ParticipantStore.getSingleton().putMultiple(participants);
    });
  }

  parseParticipantsFromGroups (groups) {
    const participants = [];
    for (const group of groups) {
      let groupIndex = 10; // firstname of first group member
      // for every member in a group: create a new Participant object
      for (let participantIndex = 0; participantIndex < group[2]; participantIndex++) {
        participants.push(new Participant(
          group[groupIndex], // firstname
          group[groupIndex + 1], // lastname
          group[groupIndex + 2], // email
          group[1] // group name
          // topic
          // language level
        ));
        groupIndex += 5; // firstname of the next group member
      }
    }

    return participants;
  }
}
