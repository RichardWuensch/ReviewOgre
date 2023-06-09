import Participant from '../data/model/Participant';
import ImportFile from './ImportFile';
import Papa from 'papaparse';

export default class ImportParticipants {
  async runStudentImport (event) {
    const fileType = event.target.files[0].type;
    let fileContent = null;
    let index = 0;
    if (fileType === 'text/csv') {
      fileContent = await new ImportFile('text/csv').runFileLoad(event);
      index = 1;
    } else if (fileType === 'application/vnd.ms-excel') { // bc Firefox on Windows use the content type defined by windows and need the excel format
      fileContent = await new ImportFile('application/vnd.ms-excel').runFileLoad(event);
      index = 2;
    }
    return new Promise((resolve) => {
      let groups = Papa.parse(fileContent).data.slice(index); // get all groups starting from index that is defiend by the content type
      groups = groups.filter(row => row[0] !== ''); // delete empty lines
      resolve(this.parseParticipantsFromGroups(groups));
    });
  }

  parseParticipantsFromGroups (groups) {
    const participants = [];
    for (const group of groups) {
      let groupIndex = 10; // firstname of first group member
      // for every member in a group: create a new Participant object
      for (let participantIndex = 0; participantIndex < group[2]; participantIndex++) {
        participants.push(new Participant(-1,
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
