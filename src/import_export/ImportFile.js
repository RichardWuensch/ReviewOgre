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
