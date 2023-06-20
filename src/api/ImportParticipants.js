import Participant from '../data/model/Participant';
import ImportFile from './ImportFile';
import Papa from 'papaparse';

export default class ImportParticipants {
  async runStudentImport (event) {
    const fileType = event.target.files[0].type;
    let fileContent = null;
    const index = 1; // TODO check if it is really 1 in both cases, in some smaller tests it was sometimes 1 and sometimes 2 in vnd.ms-excel
    if (fileType === 'text/csv') {
      fileContent = await new ImportFile('text/csv').runFileLoad(event);
    } else if (fileType === 'application/vnd.ms-excel') { // bc Firefox on Windows use the content type defined by windows and need the excel format
      fileContent = await new ImportFile('application/vnd.ms-excel').runFileLoad(event);
    } else {
      throw new Error('Filetype differs from expected filetype text/csv. Actual filetype: ' + fileType);
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
