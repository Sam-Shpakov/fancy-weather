export default class Micro {
  recognition: any;
  language: string;
  doChanges: Function;

  constructor() {
    const SpeechRecognitionConstructor = window.SpeechRecognition || (<any>window).webkitSpeechRecognition;
    this.recognition = new SpeechRecognitionConstructor();
  }

  public getMicro(doChanges): HTMLButtonElement {
    const buttonMicro = document.createElement('button');
    buttonMicro.classList.add('button-micro');
    this.doChanges = doChanges;
    return buttonMicro;
  }

  public onMicro(input): void {
    const SpeechRecognitionConstructor = window.SpeechRecognition || (<any>window).webkitSpeechRecognition;
    this.recognition = new SpeechRecognitionConstructor();
    document.querySelector('.button-micro').classList.add('active');
    this.recognition.start();
    let word = '';
    this.recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      word = transcript.toLowerCase();
      input.value = word;
      if (word[word.length - 1] === '.') {
        word = word.substring(0, word.length - 1);
      }
      input.value = word;
      this.getSearch(word);
    });

  }

  public checkedisOnMicro(searchContainer: HTMLDivElement): boolean {
    return !searchContainer.querySelector('.button-micro').classList.contains('active')
  }


  public offMicro(): void {
    document.querySelector('.button-micro').classList.remove('active');
    this.recognition.stop();
    this.recognition.removeEventListener('end', this.recognition.start);
  }

  private getSearch(text): void {
    this.offMicro();
    document.querySelector('.button-micro').classList.remove('active');
    this.doChanges(text);
  }
}