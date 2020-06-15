import { getDate } from '../component/week/week';

interface CityForecast {
  temp: string,
  icon: string,
  datetime: string,
}

interface CityInfoCurrent {
  temp: string,
  app_temp: string,
  icon: string,
  datetime: string,
  description: string,
  wind_spd: string,
  rh: string,
}
export default class Weather {

  doChanges: Function;
  weatherContainer: HTMLDivElement;

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
  }

  public render(currentWeather: CityInfoCurrent, days: Array<CityForecast>, city: string): HTMLDivElement {
    this.weatherContainer = document.createElement('div');
    this.weatherContainer.classList.add('weather-container');
    this.initWeatherToday(currentWeather, city);
    this.initWeatherDays(days, city);

    return this.weatherContainer;
  }

  public refreshTime(): void {
    if (document.querySelector('.weather-container__date-time')) {
      if (localStorage.timezone) {
        document.querySelector('.weather-container__date-time').innerHTML = getDate(localStorage.timezone.substring(1, localStorage.timezone.length - 1), localStorage.language.substr(1, 2));
      } else {
        document.querySelector('.weather-container__date-time').innerHTML = getDate('Europe/Minsk', localStorage.language.substr(1, 2));
      }
    }
  }

  public doChangedWeather(day: CityInfoCurrent, days: Array<CityForecast>, city: string): void {
    this.weatherContainer.querySelector('.weather-container__location').innerHTML = city;
    this.weatherContainer.querySelector('.weather-container__date-time').innerHTML = day.datetime;
    this.weatherContainer.querySelector('.weather-container__temperature-today').innerHTML = day.temp;
    let image = this.weatherContainer.querySelector('.weather-container__weather-icon') as HTMLImageElement;
    image.alt = day.description;
    image.src = day.icon;
    let weatherData = this.weatherContainer.querySelectorAll('.weather-container__weather-data>p');
    weatherData[0].innerHTML = day.description;
    weatherData[1].innerHTML = day.app_temp;
    weatherData[2].innerHTML = day.wind_spd;
    weatherData[3].innerHTML = day.rh;
    let forecastDay = this.weatherContainer.querySelectorAll('.forecast__day');
    let forecastTemperature = this.weatherContainer.querySelectorAll('.forecast__temperature');
    let forecastIcon = this.weatherContainer.querySelectorAll('.forecast__icon');
    days.forEach((element, index) => {
      forecastDay[index].innerHTML = element['datetime'];
      forecastTemperature[index].innerHTML = element['temp'];
      forecastIcon[index].innerHTML = element['icon'];
    });
  }

  private initWeatherToday(day: CityInfoCurrent, city: string): void {
    const location = document.createElement('p');
    location.classList.add('weather-container__location');
    location.innerText = city;
    this.weatherContainer.append(location);


    const dateTime = document.createElement('p');
    dateTime.classList.add('weather-container__date-time');
    dateTime.innerText = day.datetime;
    this.weatherContainer.append(dateTime);

    const temperatureToday = document.createElement('p');
    temperatureToday.classList.add('weather-container__temperature-today');
    temperatureToday.innerText = day.temp;
    this.weatherContainer.append(temperatureToday);

    const weatherIcon = document.createElement('img');
    weatherIcon.classList.add('weather-container__weather-icon');
    weatherIcon.alt = day.description;
    weatherIcon.src = day.icon;
    this.weatherContainer.append(weatherIcon);

    const weatherData = document.createElement('div');
    weatherData.classList.add('weather-container__weather-data');
    const weatherData1 = document.createElement('p');
    weatherData1.innerText = day.description;
    weatherData.append(weatherData1);
    const weatherData2 = document.createElement('p');
    weatherData2.innerText = day.app_temp;
    weatherData.append(weatherData2);
    const weatherData3 = document.createElement('p');
    weatherData3.innerText = day.wind_spd;
    weatherData.append(weatherData3);
    const weatherData4 = document.createElement('p');
    weatherData4.innerText = day.rh;
    weatherData.append(weatherData4);
    this.weatherContainer.append(weatherData);
  }

  private initWeatherDays(days: Array<CityForecast>, city: string): void {
    days.forEach(element => {
      const forecast = document.createElement('div');
      forecast.classList.add('forecast');

      const day = document.createElement('p');
      day.classList.add(`forecast__day`);
      day.innerText = element['datetime'];
      forecast.append(day);

      const temperature = document.createElement('p');
      temperature.classList.add(`forecast__temperature`);
      temperature.innerText = element['temp'];
      forecast.append(temperature);

      const icon = document.createElement('img');
      icon.classList.add(`forecast__icon`);
      icon.src = element['icon'];
      forecast.append(icon);

      this.weatherContainer.append(forecast);
    });
  }
}