import { saveAs } from 'file-saver';
import Configuration from './model/Configuration';

export default class StoreConfiguration {
  #configuration = {};

  constructor (participants, roomSlots, authorIsNotary) {
    this.parseConfigurationFromStore(participants, roomSlots, authorIsNotary);
  }

  runFileSave () {
    const configString = JSON.stringify(this.#configuration, null, 1);
    const blob = new Blob([configString], { type: 'application/json' });
    saveAs(blob, 'config.json');
  }

  parseConfigurationFromStore (participants, roomSlots, authorIsNotary) {
    this.#configuration = new Configuration();
    this.#configuration.parseConfigurationFromStore(authorIsNotary);
    this.#configuration.parseParticipantsFromStore(participants);
    this.#configuration.parseRoomSlotsFromStore(roomSlots);
  }
}
