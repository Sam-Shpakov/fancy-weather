export default class Helper {

  textHelper: Array<string>;
  doMessage: Function;
  responsiveVoice: any;
  constructor(text, doMessage) {
    this.textHelper = text;
    this.doMessage = doMessage;
  }


  public getHelper(): HTMLButtonElement {
    const buttonHelper = document.createElement('button');
    buttonHelper.classList.add('button-helper');
    buttonHelper.classList.add('button');
    const spinnerButton = document.createElement('div');
    spinnerButton.classList.add('helper');
    buttonHelper.append(spinnerButton);
    buttonHelper.addEventListener('click', (event) => this.handlerClick(event));
    return buttonHelper;
  }

  private handlerClick(event): void {
    if (this.isClickButtonHelp(event)) {
      this.clickButtonHelp(event);
    }
  }

  private isClickButtonHelp(event): boolean {
    return event.target.classList.contains('helper') || event.target.classList.contains('button-helper');
  }

  private clickButtonHelp(event): void {
    this.doMessage();
  }

}