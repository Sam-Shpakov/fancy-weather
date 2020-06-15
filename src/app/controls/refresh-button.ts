export default class RefreshButton {
  doChanges: Function;
  refreshButton: HTMLButtonElement;

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
  }

  public render(): HTMLButtonElement {
    this.refreshButton = document.createElement('button');
    this.refreshButton.classList.add('button-refresh');
    this.refreshButton.classList.add('button');
    const spinnerButton = document.createElement('div');
    spinnerButton.classList.add('spinner');
    this.refreshButton.append(spinnerButton);
    this.refreshButton.addEventListener('click', (event) => this.handlerClick(event));

    return this.refreshButton;
  }

  private handlerClick(event): void {
    if (this.isClickButtonRefresh(event)) {
      this.clickButtonRefresh(event);
    }
  }

  private isClickButtonRefresh(event): boolean {
    return event.target.classList.contains('spinner') || event.target.classList.contains('button-refresh');
  }

  private async clickButtonRefresh(event): Promise<void> {
    this.refreshButton.querySelector('.spinner').classList.add('spinner-refresh');
    await this.doChanges();
    this.refreshButton.querySelector('.spinner').classList.remove('spinner-refresh');
  }
}