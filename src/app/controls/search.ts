import Micro from './micro';
export default class Search {
  doChanges: Function;
  searchContainer: HTMLDivElement;
  micro: Micro;
  placeholder: string;
  incorrectData: string;
  nameButton: string;

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
    this.micro = new Micro();
  }

  public render(text: Array<string>): HTMLDivElement {
    this.searchContainer = document.createElement('div');
    this.searchContainer.classList.add('search-container');
    this.changeText(text);
    this.searchContainer.append(this.getInput());
    this.searchContainer.append(this.micro.getMicro(this.clickButtonSearch.bind(this)));
    this.searchContainer.append(this.getSearch());
    this.searchContainer.addEventListener('click', (event) => this.handlerClick(event));
    this.searchContainer.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));
    return this.searchContainer;
  }


  public changedSearch(text: Array<string>): void {
    this.changeText(text);
    let inputElement = this.searchContainer.querySelector('.search-input') as HTMLInputElement;
    let button = this.searchContainer.querySelector('.search-input__button') as HTMLInputElement;
    inputElement.placeholder = this.placeholder;
    inputElement.textContent = '';
    button.innerText = this.nameButton;
  }

  public clearSearch(): void {
    let inputElement = this.searchContainer.querySelector('.search-input') as HTMLInputElement;
    inputElement.value = '';
  }

  private changeText(text: Array<string>): void {
    this.incorrectData = text[0];
    this.placeholder = text[1];
    this.nameButton = text[2];
  }

  private handlerClick(event): void {
    if (this.isClickButtonMicro(event)) {
      this.clickButtonMicro();
    }

    if (this.isClickButtonSearch(event)) {
      this.clickButtonSearch();
    }
  }

  private handlerClickKeyboard(event): void {
    if (this.isClickEnterSearch(event)) {
      this.clickButtonSearch();
    }
  }

  isClickEnterSearch(event) {
    return event.keyCode === 13;
  }

  private isClickButtonSearch(event): boolean {
    return event.target.classList.contains('search-input__button');
  }

  private clickButtonSearch(): void {
    event.preventDefault();
    let inputElement = this.searchContainer.querySelector('.search-input') as HTMLInputElement;
    let value = inputElement.value;
    this.doChanges(value);
  }

  private isClickButtonMicro(event): boolean {
    return event.target.classList.contains('button-micro');
  }

  private clickButtonMicro(): void {
    if (this.micro.checkedisOnMicro(this.searchContainer)) {
      this.micro.onMicro(this.searchContainer.querySelector('.search-input'));
    } else {
      this.micro.offMicro();
    }
  }

  private getInput(): HTMLInputElement {
    const inputContainer = document.createElement('input');
    inputContainer.classList.add('search-input');
    inputContainer.type = 'text';
    inputContainer.name = 'search-city';
    inputContainer.placeholder = this.placeholder;
    inputContainer.required = true;
    return inputContainer;
  }

  private getSearch(): HTMLButtonElement {
    const buttonSearch = document.createElement('button');
    buttonSearch.classList.add('button');
    buttonSearch.classList.add('search-input__button');
    buttonSearch.type = 'button';
    buttonSearch.innerText = this.nameButton;
    return buttonSearch;
  }

}