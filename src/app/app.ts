import '../style/style.scss';
import Controls from './controls/controls';
import Weather from './main/weather';
import Map from './main/map';
import { getLoader } from './component/loader';
import { getDate, getWeekDays, getSeason, getTimeofDay } from './component/week/week';
import { getFooter, updateFooter } from './component/footer';
import Message from './component/message/message';
import Notify from './component/notify/notify';
import { OnLoadAble, CityForecast, CityInfoCurrent, IMapOptions } from './models/models';



window.onload = () => {
  const app = new App();
  app.initApp();
  window.setInterval(app.weather.refreshTime, 1000);
};

class App {
  controls: Controls;
  weather: Weather;
  map: Map;
  message: Message;
  VOLUME_STEP: number;
  notify: Notify;
  root: HTMLDivElement;
  preloader: HTMLDivElement;
  KEYIMAGEAPI: string;
  KEYCURRENT: string;
  KEYFORECAST: string;
  KEYGEOlOCATION: string;
  MAPOPTIONS: IMapOptions;
  timezone: string;
  textLangEn: Array<string>;
  textLangRu: Array<string>;
  textLangBe: Array<string>;
  city: string;
  timesDay: string;
  volume: number;
  weatherDescription: string;
  textSpeak: string;
  showDays: number;
  contentFooter: Array<string>;
  textHelpEn: Array<string>;
  textHelpRu: Array<string>;
  textHelpBe: Array<string>;
  listLanguage: Array<string>;
  listScale: Array<string>;
  keyWords: Array<object>;
  constructor() {
    this.MAPOPTIONS = {
      KEYGEOCORDING: '57913d93c3a94107bcf4c29eb5f997c7',
      LAT: '55.752',
      LNG: '37.6156',
      KEYMAPAPI: 'AIzaSyBcBdvaJ9lvN0GrEy8Rl8FniJ521aokVMM',
    }
    this.VOLUME_STEP = 0.1;
    this.listScale = ['°F', '°C'];
    this.listLanguage = ['en', 'ru', 'be'];
    this.textSpeak = 'ERROR';
    this.contentFooter = [];
    this.textHelpBe = ['Інфармацыя', 'Спіс галасавых каманд:', `"Прырода" -  Запусціць галасавое апавяшчэнне`, '"Павышэнне" - Павелічэнне гучнасці', '"Паніжэнне" - Паменшыць гучнасць', 'Дадатковы функцыянал:', 'Бегавая дарожка з больш падрабязным прагнозам на тыдзень'];
    this.textHelpRu = ['Информация', 'Список голосовых команд:', '"Природа" - Запустить голосовое уведомление', '"Повышение" - Увеличить громкость', '"Понижение" - Уменьшить громкость', 'Дополнительный функционал:', 'Бегущая строка с более подробным прогнозом на неделю'];
    this.textHelpEn = ['Information', 'List of voice commands:', '"Nature" - Run voice notification', '"Increase" - Increase the volume', '"Decrease" - Decrease the volume', 'Additional functionality:', 'ticker with a more detailed forecast for week'];
    this.controls = new Controls(this.doChangesCityFromSearch.bind(this), this.doChangeBackground.bind(this), this.doChangeLanguage.bind(this), this.doChangeScale.bind(this), this.doMessage.bind(this), this.listLanguage, this.listScale, this.textSpeak, this.textHelpEn);
    this.weather = new Weather(this.doChangesCityFromSearch.bind(this));
    this.map = new Map();
    this.notify = new Notify();
    this.message = new Message(this.textHelpEn);
    this.KEYIMAGEAPI = 'GZ3T-OqnbT6kW0m8CccKw-ucz4MaeTsJ29r2rKflNoQ';
    this.KEYCURRENT = '20fe2091eb094bb1890cccc4ec32592f';
    this.KEYFORECAST = '324abe064a5d4a98a54f513199af142b';
    this.KEYGEOlOCATION = 'f7edfcc5ad81b0';
    this.timezone = 'Europe/Minsk';
    this.textLangEn = ['Incorrect data', 'Search city', 'Search'];
    this.textLangBe = ['Няслушныя дадзеныя', 'Знайсцi горад', 'Пошук'];
    this.textLangRu = ['Неверные данные', 'Найти город', 'Поиск'];
    this.city = 'Minsk';
    this.timesDay = 'night';
    this.weatherDescription = 'rain';
    this.showDays = 4;
    this.volume = 1;
    this.keyWords = [{ language: 'en', key: 'nature', increase: 'increase', decrease: 'decrease' }, { language: 'ru', key: 'природа', increase: 'повышение', decrease: 'понижение' }, { language: 'be', key: 'прырода', increase: 'павышэнне', decrease: 'паніжэнне' }];
  }


  public async initApp(): Promise<void> {
    this.initPreloader();
    this.initMessage();
    this.initNotify();
    this.initRoot();
    if (!localStorage.scale) {
      localStorage.setItem('scale', JSON.stringify(this.listScale[1]));
    }
    if (!localStorage.timezone) {
      localStorage.setItem('timezone', JSON.stringify(this.timezone));
    }
    this.root.append(this.controls.render(this.defineLanguage(), localStorage.language.substr(1, 2), localStorage.scale.substr(1, 2), this.volume));
    this.root.append(await this.getMain());
    this.map.updateLocation(this.MAPOPTIONS.LAT, this.MAPOPTIONS.LNG, localStorage.language.substr(1, 2));
    this.root.append(getFooter(this.contentFooter));
    await this.doChangeBackground();
    this.spinnerOff();
  }

  public async doChangesCityFromSearch(textCity): Promise<void> {
    if (!textCity) {
      this.notify.openMessage(`not entered city`, 'error');
      return;
    }
    this.spinnerOn();
    if (this.checkKeywordFromMicro(textCity)) {
      this.city = textCity;
      let result = await this.doChangesWeatherFromSearch();
      if (!result) {
        this.controls.speaker.updateSpeaker(this.textSpeak, localStorage.language.substr(1, 2), this.volume);
        this.map.updateLocation(this.MAPOPTIONS.LAT, this.MAPOPTIONS.LNG, localStorage.language.substr(1, 2));
      }
    }
    this.spinnerOff();
  }


  public async doChangeLanguage(language): Promise<void> {
    const languageJson = localStorage.language ? JSON.stringify(language) : JSON.stringify(this.listLanguage[0]);
    localStorage.setItem('language', languageJson);
    this.spinnerOn();
    this.controls.search.changedSearch(this.defineLanguage());
    await this.doChangesWeather();
    this.controls.speaker.updateSpeaker(this.textSpeak, localStorage.language.substr(1, 2), this.volume);
    this.spinnerOff();
  }

  public async doChangeScale(scale): Promise<void> {
    const scaleJson = localStorage.scale ? JSON.stringify(scale) : JSON.stringify(this.listScale[1]);
    localStorage.setItem('scale', scaleJson);
    this.spinnerOn();
    await this.doChangesWeather();
    this.controls.speaker.updateSpeaker(this.textSpeak, localStorage.language.substr(1, 2), this.volume);
    this.spinnerOff();
  }

  public doMessage(): void {
    this.message.openMessage();
  }

  private async getMain(): Promise<HTMLDivElement> {
    this.city = await this.getMyGeolocation();
    const main = document.createElement('div');
    main.classList.add('main-container');
    main.append(this.map.render());
    let forecast: CityForecast[] = [];
    const urlCurrent = `https://api.weatherbit.io/v2.0/current?&lat=${this.MAPOPTIONS.LAT}&lon=${this.MAPOPTIONS.LNG}&units=${this.getCodeScaleForSearch()}&lang=${localStorage.language.substr(1, 2)}&key=${this.KEYCURRENT}`;
    const urlForecast = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${this.MAPOPTIONS.LAT}&lon=${this.MAPOPTIONS.LNG}&days=8&units=${this.getCodeScaleForSearch()}&lang=${localStorage.language.substr(1, 2)}&key=${this.KEYFORECAST}`;
    try {
      let requests = [fetch(urlCurrent), fetch(urlForecast)];
      const responses = await Promise.all(requests);
      const data = await Promise.all(responses.map(r => r.json()));
      const daysWeek = getWeekDays(data[1].timezone, data[1].data.length);
      forecast = this.getInfoDays(data[1].data, daysWeek);
      this.getInfoFooterContent(daysWeek, data[1]);
      main.prepend(this.weather.render(this.getInfoCurrent(data[0].data[0]), forecast, this.city));
      this.controls.speaker.updateSpeaker(this.textSpeak, localStorage.language.substr(1, 2), this.volume);
    } catch (error) {
      this.notify.openMessage(`no connect`, 'error');
      console.log('Error', error);
    }
    return main;
  }

  private async doChangesWeather(): Promise<string> {
    try {
      let result = await this.getGeolocationCity(this.city);
      if (result === undefined) {
        return undefined;
      }
      this.city = result;
      let forecast: CityForecast[] = [];
      const words = `nature,${getSeason()}, ${getTimeofDay(localStorage.timezone.substring(1, localStorage.timezone.length - 1))},${this.weatherDescription}`;
      const urlCurrent = `https://api.weatherbit.io/v2.0/current?&lat=${this.MAPOPTIONS.LAT}&lon=${this.MAPOPTIONS.LNG}&units=${this.getCodeScaleForSearch()}&lang=${localStorage.language.substr(1, 2)}&key=${this.KEYCURRENT}`;
      const urlForecast = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${this.MAPOPTIONS.LAT}&lon=${this.MAPOPTIONS.LNG}&days=8&units=${this.getCodeScaleForSearch()}&lang=${localStorage.language.substr(1, 2)}&key=${this.KEYFORECAST}`;
      let requests = [fetch(urlCurrent), fetch(urlForecast)];
      const responses = await Promise.all(requests);
      const data = await Promise.all(responses.map(r => r.json()));
      const daysWeek = getWeekDays(data[1].timezone, data[1].data.length);
      forecast = this.getInfoDays(data[1].data, daysWeek);
      this.getInfoFooterContent(daysWeek, data[1]);
      updateFooter(this.contentFooter);
      this.weather.doChangedWeather(this.getInfoCurrent(data[0].data[0]), forecast, this.city);
    } catch (error) {
      document.querySelector('body').style.cssText = `background-image: url(../assets/img/bg2.png);`;
      this.notify.openMessage(`Disconnection `, 'error');
      console.log('Error', error);
    }
    return this.city;
  }

  private async doChangesWeatherFromSearch(): Promise<string> {
    try {
      let result = await this.getGeolocationCity(this.city);
      if (!result) {
        return;
      }
      this.city = result;
      let forecast: CityForecast[] = [];
      const words = `nature,${getSeason()}, ${getTimeofDay(localStorage.timezone.substring(1, localStorage.timezone.length - 1))},${this.weatherDescription}`;
      const urlImage = `https://api.unsplash.com/photos/random?orientation=landscape&query=${words}&client_id=${this.KEYIMAGEAPI}`;
      const urlCurrent = `https://api.weatherbit.io/v2.0/current?&lat=${this.MAPOPTIONS.LAT}&lon=${this.MAPOPTIONS.LNG}&units=${this.getCodeScaleForSearch()}&lang=${localStorage.language.substr(1, 2)}&key=${this.KEYCURRENT}`;
      const urlForecast = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${this.MAPOPTIONS.LAT}&lon=${this.MAPOPTIONS.LNG}&days=8&units=${this.getCodeScaleForSearch()}&lang=${localStorage.language.substr(1, 2)}&key=${this.KEYFORECAST}`;
      let requests = [fetch(urlCurrent), fetch(urlForecast), fetch(urlImage)];
      const responses = await Promise.all(requests);
      const data = await Promise.all(responses.map(r => r.json()));
      await this.addImageProcess(data[2].urls.full);
      const daysWeek = getWeekDays(data[1].timezone, data[1].data.length);
      forecast = this.getInfoDays(data[1].data, daysWeek);
      this.getInfoFooterContent(daysWeek, data[1]);
      updateFooter(this.contentFooter);
      this.weather.doChangedWeather(this.getInfoCurrent(data[0].data[0]), forecast, this.city);
    } catch (error) {
      document.querySelector('body').style.cssText = `background-image: url(../assets/img/bg2.png);`;
      this.notify.openMessage(`Disconnection `, 'error');
      console.log('Error', error);
    }
    return this.city;
  }

  private getInfoDays(data: any, daysWeek: Array<string>): Array<CityForecast> {
    return data.map((data, index) => { return this.getInfoForecast(daysWeek[index - 1], data) }).filter((data, index) => { return (index !== 0 && index < this.showDays) });
  }

  private getInfoCurrent(data: any): CityInfoCurrent {
    this.getInfoSpeak(data);

    switch (localStorage.language.substr(1, 2)) {
      case this.listLanguage[2]: {
        this.message.updateMessage(this.textHelpBe);
        return {
          temp: data.temp.toFixed(),
          app_temp: `АДЧУВАЕЦЦА ЯК: ${data.app_temp.toFixed()} ${localStorage.scale.substr(1, 2)}`,
          icon: `../assets/icon/${data.weather.icon}.svg`,
          datetime: getDate(data.timezone, localStorage.language.substr(1, 2)),
          description: data.weather.description,
          wind_spd: `ВЕЦЕР: ${data.wind_spd.toFixed()} м/с`,
          rh: `ВІЛЬГОТНАСЦЬ: ${data.rh}%`,
        };
      }
      case this.listLanguage[1]: {
        this.message.updateMessage(this.textHelpRu);
        return {
          temp: data.temp.toFixed(),
          app_temp: `ОЩУЩАЕТСЯ КАК: ${data.app_temp.toFixed()} ${localStorage.scale.substr(1, 2)}`,
          icon: `../assets/icon/${data.weather.icon}.svg`,
          datetime: getDate(data.timezone, localStorage.language.substr(1, 2)),
          description: data.weather.description,
          wind_spd: `ВЕТЕР: ${data.wind_spd.toFixed()} м/с`,
          rh: `ВЛАЖНОСТЬ: ${data.rh}%`,
        };
      }
      default: {
        this.message.updateMessage(this.textHelpEn);
        return {
          temp: data.temp.toFixed(),
          app_temp: `FEELS LIKE: ${data.app_temp.toFixed()} ${localStorage.scale.substr(1, 2)}`,
          icon: `../assets/icon/${data.weather.icon}.svg`,
          datetime: getDate(data.timezone, localStorage.language.substr(1, 2)),
          description: data.weather.description,
          wind_spd: `WIND: ${data.wind_spd.toFixed()} m/s`,
          rh: `HUMIDITY: ${data.rh}%`,
        };
      }
    }
  }

  private getInfoSpeak(data: any): void {
    this.textSpeak = '';
    this.weatherDescription = data.weather.description;
    switch (localStorage.language.substr(1, 2)) {
      case this.listLanguage[2]: {
        this.textSpeak = `${this.city}, ${data.weather.description}, 
        тэмпература ${data.temp.toFixed()} ${localStorage.scale.substr(1, 2)},  адчуваецца як: ${data.app_temp.toFixed()} ${localStorage.scale.substr(1, 2)}, вецер: ${data.wind_spd.toFixed()} м/с, вільготнасць: ${data.rh}%`;
        break;
      }
      case this.listLanguage[1]: {
        this.textSpeak = `${this.city}, ${data.weather.description}, 
        температура ${data.temp.toFixed()} ${localStorage.scale.substr(1, 2)},  ощущается как: ${data.app_temp.toFixed()}${localStorage.scale.substr(1, 2)}, ветер: ${data.wind_spd.toFixed()} м/с, влажность: ${data.rh}%`;
        break;
      }
      default: {
        this.textSpeak = `${this.city}, ${data.weather.description}, 
        temperature ${data.temp.toFixed()} ${localStorage.scale.substr(1, 2)},  feels like: ${data.app_temp.toFixed()} ${localStorage.scale.substr(1, 2)}, wind: ${data.wind_spd.toFixed()} м/с, humidity: ${data.rh}%`;
      }
    }
  }

  private getInfoForecast(day: string, data: any): CityForecast {
    return {
      datetime: day,
      temp: data.temp.toFixed(),
      icon: `../assets/icon/${data.weather.icon}.svg`,
    };
  }

  private getInfoFooterContent(days: Array<string>, data: any): void {
    this.contentFooter = [];
    switch (localStorage.language.substr(1, 2)) {
      case this.listLanguage[2]: {
        days.forEach((element, index) => {
          if (index < days.length - 1) {
            this.contentFooter.push(`${element}:`);
            this.contentFooter.push(`${data.data[index + 1].low_temp}  -  ${data.data[index + 1].high_temp} ${localStorage.scale.substr(1, 2)}`);
            this.contentFooter.push(`${data.data[index + 1].weather.description}`);
            this.contentFooter.push(`Вецер: ${data.data[index + 1].wind_cdir_full} -  ${data.data[index + 1].wind_spd.toFixed()} м/с`);
            this.contentFooter.push(`Вільготнасць: ${data.data[index + 1].rh}%`);
          }
        });
        break;
      }
      case this.listLanguage[1]: {
        days.forEach((element, index) => {
          if (index < days.length - 1) {
            this.contentFooter.push(`${element}:`);
            this.contentFooter.push(`${data.data[index + 1].low_temp}  -  ${data.data[index + 1].high_temp} ${localStorage.scale.substr(1, 2)}`);
            this.contentFooter.push(`${data.data[index + 1].weather.description}`);
            this.contentFooter.push(`Ветер: ${data.data[index + 1].wind_cdir_full} -  ${data.data[index + 1].wind_spd.toFixed()} м/с`);
            this.contentFooter.push(`Влажность: ${data.data[index + 1].rh}%`);
          }
        });
        break;
      }
      default: {
        days.forEach((element, index) => {
          if (index < days.length - 1) {
            this.contentFooter.push(`${element}:`);
            this.contentFooter.push(`${data.data[index + 1].low_temp}  -  ${data.data[index + 1].high_temp} ${localStorage.scale.substr(1, 2)}`);
            this.contentFooter.push(`${data.data[index + 1].weather.description}`);
            this.contentFooter.push(`Wind: ${data.data[index + 1].wind_cdir_full} -  ${data.data[index + 1].wind_spd.toFixed()} м/s`);
            this.contentFooter.push(`Humidity: ${data.data[index + 1].rh}%`);
          }
        });
      }
    }
  }

  private async doChangeBackground(): Promise<void> {
    const words = `nature,${getSeason()}, ${getTimeofDay(localStorage.timezone.substring(1, localStorage.timezone.length - 1))},${this.weatherDescription}`;
    const urlsConst = `https://api.unsplash.com/photos/random?orientation=landscape&query=${words}&client_id=${this.KEYIMAGEAPI}`;
    try {
      const res = await fetch(urlsConst);
      const data = await res.json();
      await this.addImageProcess(data.urls.full);
    } catch (error) {
      document.querySelector('body').style.cssText = `background-image: url(../assets/img/bg2.png);`;
      console.log('Error', error);
    }
  }

  private onloadPromise<T extends OnLoadAble>(obj: T): Promise<T> {
    return new Promise((resolve, reject) => {
      obj.onload = () => resolve(obj);
      obj.onerror = reject;
    });
  }

  private async addImageProcess(src): Promise<void> {
    let img = new Image();
    img.src = src;
    let imgpromise = this.onloadPromise(img);
    await imgpromise;
    document.querySelector('body').style.backgroundImage = `url(${src})`;
  }

  private initRoot(): void {
    const body = document.querySelector('body')!;
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');
    body.prepend(this.root);
  }

  private initPreloader(): void {
    const body = document.querySelector('body')!;
    body.prepend(getLoader());
  }
  private initMessage(): void {
    const body = document.querySelector('body')!;
    body.prepend(this.message.render());
  }

  private initNotify(): void {
    const body = document.querySelector('body')!;
    body.prepend(this.notify.render());
  }

  private async getMyGeolocation(): Promise<string> {
    const urlLocation = `https://ipinfo.io/json?token=${this.KEYGEOlOCATION}`;
    let city = '';
    try {
      const resLocation = await fetch(urlLocation);
      const dataLocation = await resLocation.json();
      const urlGeocoding = `https://api.opencagedata.com/geocode/v1/json?q=${dataLocation.city}%20${dataLocation.country}&key=${this.MAPOPTIONS.KEYGEOCORDING}&pretty=1&no_annotations=1&language=${localStorage.language.substr(1, 2)}`;
      const resGeocoding = await fetch(urlGeocoding);
      const dataGeocoding = await resGeocoding.json();
      city = dataGeocoding.results[0].formatted;
      [this.MAPOPTIONS.LAT, this.MAPOPTIONS.LNG] = [dataGeocoding.results[0].geometry.lat.toString(), dataGeocoding.results[0].geometry.lng.toString()];
    } catch (error) {
      this.notify.openMessage(`no connect`, 'error');
      console.log('Error', error);
    }
    return city;
  }

  private async getGeolocationCity(city: string): Promise<string> {
    try {
      const urlGeocoding = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${this.MAPOPTIONS.KEYGEOCORDING}&pretty=1&no_annotations=1&language=${localStorage.language.substr(1, 2)}`;
      const resGeocoding = await fetch(urlGeocoding);
      const dataGeocoding = await resGeocoding.json();
      city = dataGeocoding.results[0].formatted;
      [this.MAPOPTIONS.LAT, this.MAPOPTIONS.LNG] = [dataGeocoding.results[0].geometry.lat.toString(), dataGeocoding.results[0].geometry.lng.toString()];
      return city;
    } catch (error) {
      this.notify.openMessage(`Нет результатов для '${city}'`, 'error');
      console.log(error);
      return undefined;
    }
  }

  private getCodeScaleForSearch(): string {
    let scale = '';
    if (!localStorage.scale) {
      localStorage.setItem('scale', JSON.stringify(this.listScale[0]));
    }
    if (localStorage.scale.substr(2, 1) === 'F') {
      scale = 'I';
    }
    if (localStorage.scale.substr(2, 1) === 'C') {
      scale = 'M';
    }
    return scale;
  }

  private defineLanguage(): Array<string> {
    if (!localStorage.language) {
      localStorage.setItem('language', JSON.stringify(this.listLanguage[0]));
    }
    switch (localStorage.language.substr(1, 2)) {
      case this.listLanguage[2]: {
        return this.textLangBe;
      }
      case this.listLanguage[1]: {
        return this.textLangRu;
      }
      default: {
        return this.textLangEn;
      }
    }
  }

  private spinnerOn(): void {
    let preloader = document.querySelector('.preloader');
    if (preloader.classList.contains('done')) {
      preloader.classList.remove('done');
    }
  }

  private spinnerOff(): void {
    let preloader = document.querySelector('.preloader');
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
    }
    preloader.classList.add('open');
  }

  private checkKeywordFromMicro(textCity): boolean {
    if (localStorage.language.substr(1, 2) == this.listLanguage[0]) {
      switch (textCity) {
        case this.keyWords[0]['key']: {
          this.controls.search.clearSearch();
          this.controls.speaker.onSpeaker(this.textSpeak, localStorage.language.substr(1, 2), this.volume);
          return false;
        }
        case this.keyWords[0]['increase']: {
          this.controls.search.clearSearch();
          this.increaseVolume();
          this.notify.openMessage(`volume: ${(this.volume * 100).toFixed()}%  `, 'info');
          return false;
        }
        case this.keyWords[0]['decrease']: {
          this.controls.search.clearSearch();
          this.decreaseVolume();
          this.notify.openMessage(`volume: ${(this.volume * 100).toFixed()}%  `, 'info');
          return false;
        }
        default: {
          return true;
        }
      }
    }
    if (localStorage.language.substr(1, 2) == this.listLanguage[1] || localStorage.language.substr(1, 2) == this.listLanguage[2]) {
      switch (textCity) {
        case this.keyWords[1]['key']: {
          this.controls.search.clearSearch();
          this.controls.speaker.onSpeaker(this.textSpeak, localStorage.language.substr(1, 2), this.volume);
          return false;
        }
        case this.keyWords[1]['increase']: {
          this.controls.search.clearSearch();
          this.increaseVolume();
          this.notify.openMessage(`Громкость: ${(this.volume * 100).toFixed()}%  `, 'info');
          return false;
        }
        case this.keyWords[1]['decrease']: {
          this.controls.search.clearSearch();
          this.decreaseVolume();
          this.notify.openMessage(`Громкость: ${(this.volume * 100).toFixed()}%  `, 'info');
          return false;
        }
        default: {
          return true;
        }
      }
    }
  }

  private increaseVolume(): void {
    if (this.volume >= 0 && this.volume < 1) {
      this.volume += this.VOLUME_STEP;
      this.controls.speaker.updateSpeaker(this.textSpeak, localStorage.language.substr(1, 2), this.volume);
    }
  }

  private decreaseVolume(): void {
    if (this.volume > 0 && this.volume <= 1) {
      this.volume -= this.VOLUME_STEP;
      this.controls.speaker.updateSpeaker(this.textSpeak, localStorage.language.substr(1, 2), this.volume);
    }
  }

}