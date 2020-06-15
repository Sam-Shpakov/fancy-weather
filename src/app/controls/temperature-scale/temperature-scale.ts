export default class TemperatureScale {
  doChanges: Function;
  temperatureScale: HTMLDivElement;
  listScale: Array<string>;

  constructor(doChanges: Function, listScale: Array<string>) {
    this.doChanges = doChanges;
    this.listScale = listScale;
  }

  public render(scale: string): HTMLDivElement {
    this.temperatureScale = document.createElement('div');
    this.temperatureScale.classList.add('buttons-scale');
    this.listScale.forEach(element => {
      const scaleButton = document.createElement('button');
      scaleButton.classList.add(`button--${element.slice(1).toLowerCase()}`);
      scaleButton.classList.add('button');
      scaleButton.classList.add('inactive');
      scaleButton.innerHTML = element;
      this.temperatureScale.append(scaleButton);
    });
    this.temperatureScale.querySelector(`.button--${scale.slice(1).toLowerCase()}`).classList.remove('inactive');
    this.temperatureScale.addEventListener('click', (event) => this.handlerClick(event));
    return this.temperatureScale;
  }

  private handlerClick(event): void {
    if (this.isClickButtonScale(event)) {
      this.clickButtonScale(event);
    }
  }
  private isClickButtonScale(event): boolean {
    return (event.target.classList.contains('button--c') || event.target.classList.contains('button--f')) && event.target.classList.contains('inactive');
  }

  async clickButtonScale(event): Promise<void> {
    this.listScale.forEach(element => {
      this.temperatureScale.querySelector(`.button--${element.slice(1).toLowerCase()}`).classList.add('inactive');
    });
    event.target.classList.remove('inactive');
    await this.doChanges(event.target.innerHTML);
  }
}