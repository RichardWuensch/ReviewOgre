import { saveAs } from 'file-saver';
import Configuration from './model/Configuration';

export default class StoreConfiguration {
  #configuration = {};

  constructor () {
    this.parseConfigurationFromStore();
  }

  runFileSave () {
    const configString = JSON.stringify(this.#configuration, null, 1);
    const blob = new Blob([configString], { type: 'application/json' });
    saveAs(blob, 'config.json');
  }

  parseConfigurationFromStore () {
    this.#configuration = new Configuration();
    this.#configuration.parseConfigurationFromStore();
    this.#configuration.parseParticipantsFromStore();
    this.#configuration.parseRoomSlotsFromStore();
  }
}
