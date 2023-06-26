import { saveAs } from 'file-saver';
import Configuration from './model/Configuration';

export default class StoreConfiguration {
  #configuration = {};

  constructor (participants, roomSlots, settings) {
    this.parseConfigurationFromStore(participants, roomSlots, settings);
  }

  runFileSave () {
    const configString = JSON.stringify(this.#configuration, null, 1);
    const blob = new Blob([configString], { type: 'application/json' });
    saveAs(blob, 'config.json');
  }

  parseConfigurationFromStore (participants, roomSlots, settings) {
    this.#configuration = new Configuration();
    this.#configuration.parseSettings(settings);
    this.#configuration.parseParticipants(participants);
    this.#configuration.parseRoomSlots(roomSlots);
  }
}
