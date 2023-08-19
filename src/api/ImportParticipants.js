import Participant from '../data/models/Participant';
import ImportFile from './ImportFile';
import Papa from 'papaparse';

export default class ImportParticipants {
  async runStudentImport (event) {
    const fileType = event.target.files[0].type;
    let fileContent = null;
    if (fileType === 'text/csv') {
      fileContent = await new ImportFile('text/csv').runFileLoad(event);
    } else if (fileType === 'application/vnd.ms-excel') { // bc Firefox on Windows uses the content type defined by windows and need the excel format
      fileContent = await new ImportFile('application/vnd.ms-excel').runFileLoad(event);
    } else {
      throw new Error('Filetype differs from expected filetype text/csv. Actual filetype: ' + fileType);
    }
    return new Promise((resolve) => {
      if (fileContent.includes(',') && fileContent.includes(';')) {
        throw new Error('Both Delimiters "," and ";" were found in the file.');
      }

      const parsedContent = Papa.parse(fileContent, { skipEmptyLines: true });
      if (parsedContent.data.length === 0) {
        if (parsedContent.errors.length === 1) {
          throw new Error(parsedContent.errors[1].message);
        } else if (parsedContent.errors.length > 1) {
          throw new Error('Multiple Errors occurred while parsing the file.');
        } else {
          throw new Error('The parsed file content is empty.');
        }
      }

      const parsedData = parsedContent.data.filter(row => row[0] !== 'sep='); // delete seperator metadata line
      if (parsedData[0].length === 1) {
        throw new Error('Error: The first line could not be split. This can happen, if the whole line is enclosed in " ".');
      }
      if (this.isMoodleLine(parsedData[0])) {
        const groups = parsedData.slice(1); // get all groups without the header
        resolve(this.parseParticipantsFromMoodleGroups(groups));
      } else if (this.isIliasLine(parsedData[0])) {
        const iliasParticipants = parsedData.slice(1); // without header
        resolve(this.parseParticipantsFromIlias(iliasParticipants));
      } else {
        // direct import: firstname;lastname;email;group
        const participantList = parsedData.slice(0);
        resolve(this.parseParticipantsDirectly(participantList));
      }
    });
  }

  isMoodleLine (line) {
    return (line[0] === 'Group ID' &&
            line[1] === 'Group Name' &&
            line[2] === 'Group Size' &&
            line[3] === 'Group Description') ||
          line.length > 6; // does not need header to classify
  }

  parseParticipantsFromMoodleGroups (groups) {
    const participants = [];
    for (const group of groups) {
      if (group[1] === '') {
        throw new Error('Group Name cannot be empty');
      }
      const groupSize = group[2];
      if (group.length !== 8 + groupSize * 5) { // 8 attributes before members, 5 attributes for every member
        throw new Error(`Group Size attribute (=${groupSize}) is not equal to actual size for group "${group[1]}".`);
      }

      // for every member in a group: create a new Participant object
      let groupIndex = 10; // firstname of first group member
      for (let participantIndex = 0; participantIndex < groupSize; participantIndex++) {
        participants.push(new Participant(undefined, undefined,
          group[groupIndex], // firstname
          group[groupIndex + 1], // lastname
          group[groupIndex + 2], // email
          group[1] // group name
        ));
        groupIndex += 5; // firstname of the next group member
      }
    }

    return participants;
  }

  isIliasLine (line) {
    return (line[0] === 'Rolle/Status' &&
        line[1] === 'Nachname' &&
        line[2] === 'Vorname' &&
        line[3] === 'Benutzername') ||
      line.length === 6;
  }

  parseParticipantsFromIlias (iliasParticipants) {
    const participants = [];
    let lineNumber = 1;
    for (const participantRow of iliasParticipants) {
      if (participantRow.length < 6) {
        throw new Error(`Participants must have the 6 attributes Rolle/Status, Nachname, Vorname, Benutzername, Email and Gruppenmitgliedschaften. File line: ${lineNumber}`);
      } else if (participantRow[5] === '') {
        throw new Error(`Group Name cannot be empty. File line: ${lineNumber}`);
      }

      participants.push(new Participant(undefined, undefined,
        participantRow[2], // firstname
        participantRow[1], // lastname
        participantRow[4], // email
        participantRow[5] // group name
      ));
      lineNumber++;
    }
    return participants;
  }

  parseParticipantsDirectly (participantList) {
    const participants = [];
    let lineNumber = 1;
    for (const participantRow of participantList) {
      if (participantRow.length < 4) {
        throw new Error(`Participants must have the 4 attributes Firstname, Lastname, Email and Group. File line: ${lineNumber}`);
      } else if (participantRow[3] === '') {
        throw new Error(`Group Name cannot be empty. File line: ${lineNumber}`);
      }

      participants.push(new Participant(undefined, undefined,
        participantRow[0], // firstname
        participantRow[1], // lastname
        participantRow[2], // email
        participantRow[3] // group name
      ));
      lineNumber++;
    }
    return participants;
  }
}
