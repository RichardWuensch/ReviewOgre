export default class ConverterForPrinting {
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
  * Get the Date from the Date()
  * @param {date} date
  * @returns {string} - in format 'yyyy-mm-dd'
  */
  getYYYYmmDDforRevagerLite (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return date.getFullYear() + '-' + ((month < 10) ? ('0' + month) : month) + '-' + ((day < 10) ? ('0' + day) : day);
  }

  /**
  * Get the Time from the Date()
  * @param {date} time
  * @returns {string} - in format 'HH:MM'
  */
  getTimeHHmm (time) {
    const hour = time.getHours();
    const min = time.getMinutes();
    return ((hour < 10) ? ('0' + hour) : hour) + ':' + ((min < 10) ? ('0' + min) : min);
  }

  /**
  * Makes the participant to a simple string with the nessecary attributes
  * @param {participant} participant
  * @returns {string} - in format 'FirstName LastName Email Group group'
  */
  getParticipantAttributsForPrinting (participant) {
    return participant.getFirstName() + ' ' + participant.getLastName() + ' ' + participant.getEmail() + ' Gruppe ' + participant.getGroup();
  }
}
