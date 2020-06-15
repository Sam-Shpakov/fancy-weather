export default class Notify {
  notifyContainer: HTMLDivElement;
  content: Array<string>;
  constructor() {
    this.notifyContainer = document.createElement('div');
  }

  public render(): HTMLDivElement {
    return this.notifyContainer;
  }

  public async openMessage(content: string, typeContent: string): Promise<void> {
    this.notifyContainer.classList.add('notify');
    this.notifyContainer.classList.add(`notify_${typeContent}`);
    let notify = document.createElement('div');
    notify.classList.add('notify__text');
    notify.innerHTML = content;
    this.notifyContainer.append(notify);
    let notifyClose = document.createElement('button');
    notifyClose.classList.add(`notify__close`);
    notifyClose.classList.add(`notify__close_${typeContent}`);
    notifyClose.innerHTML = '×';
    this.notifyContainer.append(notifyClose);
    this.notifyContainer.addEventListener('click', (event) => this.handlerClick(event));
    await this.wait(5000);
    this.closeMessage();
  }

  public async wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  private closeMessage(): void {
    this.notifyContainer.classList.remove('notify');
    this.notifyContainer.innerHTML = '';
  }


  private handlerClick(event): void {
    if (this.isClickButtonClose(event)) {
      this.clickButtonSpeak(event);
    }
  }

  private isClickButtonClose(event): boolean {
    return event.target.classList.contains('notify__close');
  }

  private clickButtonSpeak(event): void {
    this.closeMessage();
  }

}