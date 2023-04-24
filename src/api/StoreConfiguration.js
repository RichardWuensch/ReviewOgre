import { saveAs } from 'file-saver';
import Configuration from './model/Configuration';

export default class StoreConfiguration {
  #configuration = {};

  constructor (configuration) {
    this.parseConfiguration(configuration);
  }

  runFileSave () {
    const configString = JSON.stringify(this.#configuration, null, 1);
    const blob = new Blob([configString], { type: 'application/json' });
    saveAs(blob, 'config.json');
  }

  parseConfiguration (configuration) {
    this.#configuration = new Configuration();
    this.#configuration.setAuthorIsNotary(configuration.authorIsNotary);
    this.#configuration.parseParticipants(configuration.participants);
    this.#configuration.parseRoomSlots(configuration.roomSlots);
  }
}
