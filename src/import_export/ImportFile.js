/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/

export default class ImportFile {
  constructor (expectedFileType) {
    this.expectedFileType = expectedFileType;
  }

  async runFileLoad (event) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(selectedFile);

    if (selectedFile.type === this.expectedFileType) {
      return new Promise((resolve) => {
        reader.onload = (event) => {
          const fileContent = event.target.result;
          resolve(fileContent);
        };
      });
    } else {
      throw new Error('Filetype differs from expected filetype ' + this.expectedFileType + '. Actual filetype: ' + selectedFile.type);
    }
  }
}
