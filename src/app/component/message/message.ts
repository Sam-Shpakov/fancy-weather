export default class Message {
  messageContainer: HTMLDivElement;
  content: Array<string>;
  constructor(content) {
    this.content = content;
    this.messageContainer = document.createElement('div');
  }

  public render(): HTMLDivElement {
    this.messageContainer.classList.add('message-container');
    let message = document.createElement('div');
    message.classList.add('message');

    let messageInfo = document.createElement('div');
    messageInfo.classList.add('message-info');
    message.append(messageInfo);
    this.messageContainer.append(message);

    let buttonClose = document.createElement('button');
    buttonClose.classList.add('message-info__button-close');
    buttonClose.innerHTML = '×';
    messageInfo.append(buttonClose);

    let infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');

    let infoHeader = document.createElement('h2');
    infoHeader.classList.add('info-header');
    infoHeader.innerHTML = this.content[0];
    infoContainer.append(infoHeader);

    let header = document.createElement('h3');
    header.classList.add('info-paragraph');
    header.innerHTML = this.content[1];
    infoContainer.append(header);

    let infoText1 = document.createElement('p');
    infoText1.classList.add('info-text');
    infoText1.innerHTML = this.content[2];
    infoContainer.append(infoText1);

    let infoText2 = document.createElement('p');
    infoText2.classList.add('info-text');
    infoText2.innerHTML = this.content[3];
    infoContainer.append(infoText2);

    let infoText3 = document.createElement('p');
    infoText3.classList.add('info-text');
    infoText3.innerHTML = this.content[4];
    infoContainer.append(infoText3);

    let infoParagraph = document.createElement('h3');
    infoParagraph.classList.add('info-paragraph');
    infoParagraph.innerHTML = this.content[5];
    infoContainer.append(infoParagraph);

    let infoText4 = document.createElement('p');
    infoText4.classList.add('info-text');
    infoText4.innerHTML = this.content[6];
    infoContainer.append(infoText4);

    messageInfo.append(infoContainer);
    this.messageContainer.addEventListener('click', (event) => this.handlerClick(event));

    return this.messageContainer;
  }

  public openMessage(): void {
    this.messageContainer.classList.add('open');
  }


  private closeMessage(): void {
    this.messageContainer.classList.remove('open');
  }


  public updateMessage(content): void {
    this.content = content;
    this.messageContainer.querySelector('.info-header').innerHTML = content[0];
    this.messageContainer.querySelectorAll('.info-paragraph')[0].innerHTML = content[1];
    this.messageContainer.querySelectorAll('.info-paragraph')[1].innerHTML = content[5];
    this.messageContainer.querySelectorAll('.info-text').forEach((element, index) => {
      if (index !== 3) {
        element.innerHTML = this.content[index + 2];
      } else {
        element.innerHTML = this.content[6];
      }
    });
  }

  private handlerClick(event): void {
    if (this.isClickButtonClose(event)) {
      this.clickButtonSpeak(event);
    }
  }

  private isClickButtonClose(event): boolean {
    return event.target.classList.contains('message-info__button-close') || event.target.classList.contains('message-container');
  }

  private clickButtonSpeak(event): void {
    this.closeMessage();
  }

}