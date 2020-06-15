export default class Speaker {

  textSpeaker: string;
  responsiveVoice: any;
  buttonSpeaker: HTMLButtonElement;
  language: string;
  volumeSpeaker: number;

  constructor(text) {
    this.textSpeaker = text;
    this.buttonSpeaker = document.createElement('button');
  }

  public getSpeaker(language: string, volumeSpeaker: number): HTMLButtonElement {
    this.language = language;
    this.volumeSpeaker = volumeSpeaker;
    this.buttonSpeaker.classList.add('button-speaker');
    this.buttonSpeaker.classList.add('button');
    const spinnerButton = document.createElement('div');
    spinnerButton.classList.add('speaker');
    this.buttonSpeaker.append(spinnerButton);
    this.buttonSpeaker.addEventListener('click', (event) => this.handlerClick(event));
    return this.buttonSpeaker;
  }

  public updateSpeaker(text: string, language: string, volumeSpeaker: number) {
    this.language = language;
    this.textSpeaker = text;
    this.volumeSpeaker = volumeSpeaker;
  }

  public onSpeaker(text: string, language: string, volumeSpeaker: number): void {
    switch (language) {
      case 'ru': {
        if (!this.buttonSpeaker.querySelector('.speaker').classList.contains('active-speaker')) {
          responsiveVoice.speak(text, "Russian Male", { onend: this.endCallback, volume: volumeSpeaker });
          this.buttonSpeaker.querySelector('.speaker').classList.add('active-speaker');
        } else {
          this.buttonSpeaker.querySelector('.speaker').classList.remove('active-speaker');
          responsiveVoice.cancel();
        }
        break;
      }
      case 'be': {
        if (!this.buttonSpeaker.querySelector('.speaker').classList.contains('active-speaker')) {
          responsiveVoice.speak(text, "Russian Male", { onend: this.endCallback, volume: volumeSpeaker });
          this.buttonSpeaker.querySelector('.speaker').classList.add('active-speaker');
        } else {
          this.buttonSpeaker.querySelector('.speaker').classList.remove('active-speaker');
          responsiveVoice.cancel();
        }
        break;
      }
      default: {
        if (!this.buttonSpeaker.querySelector('.speaker').classList.contains('active-speaker')) {
          responsiveVoice.speak(text, "US English Female", { onend: this.endCallback, volume: volumeSpeaker });
          this.buttonSpeaker.querySelector('.speaker').classList.add('active-speaker');
        } else {
          this.buttonSpeaker.querySelector('.speaker').classList.remove('active-speaker');
          responsiveVoice.cancel();
        }
        break;
      }
    }
  }

  private endCallback(): void {
    document.querySelector('.speaker').classList.remove('active-speaker');
  }

  private handlerClick(event): void {
    if (this.isClickButtonSpeak(event)) {
      this.clickButtonSpeak(event);
    }
  }

  private isClickButtonSpeak(event): boolean {
    return event.target.classList.contains('speaker') || event.target.classList.contains('button-speaker');
  }

  private clickButtonSpeak(event): void {
    this.onSpeaker(this.textSpeaker, this.language, this.volumeSpeaker);
  }

}