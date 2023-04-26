class ConfigStore {
  #authorIsNotary;
  // #abReview;

  setAuthorIsNotary (authorIsNotary) {
    this.#authorIsNotary = authorIsNotary;
  }

  getAuthorIsNotary () {
    return this.#authorIsNotary;
  }
}

export const ConfigurationStore = (function () {
  let instance = new ConfigStore();

  function getInstance () {
    return instance;
  }

  return {
    getSingleton: function () {
      if (!instance) {
        instance = getInstance();
      }
      return instance;
    }
  };
})();
