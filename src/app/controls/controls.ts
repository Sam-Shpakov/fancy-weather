import RefreshButton from './refresh-button';
import MenuLanguage from './menu-language/menu-language';
import TemperatureScale from './temperature-scale/temperature-scale';
import Search from './search';
import Speaker from './speaker';
import Helper from './helper/helper';

export default class Controls {
  search: Search;
  refreshButton: RefreshButton;
  menuLanguage: MenuLanguage;
  speaker: Speaker;
  helper: Helper;
  temperatureScale: TemperatureScale;
  controlsContainer: HTMLDivElement;

  constructor(doChanges: Function, doChangeBackground: Function, doChangeLanguage: Function, doChangeScale: Function, doMessage: Function, listLanguage: Array<string>, listScale: Array<string>, textSpeak: string, textHelp: Array<string>) {
    this.search = new Search(doChanges);
    this.refreshButton = new RefreshButton(doChangeBackground);
    this.menuLanguage = new MenuLanguage(doChangeLanguage, listLanguage);
    this.temperatureScale = new TemperatureScale(doChangeScale, listScale);
    this.speaker = new Speaker(textSpeak);
    this.helper = new Helper(textHelp, doMessage);
  }

  public render(text: Array<string>, language: string, scale: string, volumeSpeaker: number): HTMLDivElement {
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.classList.add('controls-container');
    this.controlsContainer.append(this.getControlsButtons(scale, language, volumeSpeaker));
    this.controlsContainer.append(this.search.render(text));

    return this.controlsContainer;
  }

  private getControlsButtons(scale: string, language: string, volumeSpeaker: number): HTMLDivElement {
    const btns = document.createElement('div');
    btns.classList.add('controls-btns-container');
    btns.append(this.refreshButton.render());
    btns.append(this.menuLanguage.render(language));
    btns.append(this.temperatureScale.render(scale));
    btns.append(this.speaker.getSpeaker(language, volumeSpeaker));
    btns.append(this.helper.getHelper());
    return btns;
  }

}