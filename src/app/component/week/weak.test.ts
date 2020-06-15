import { getDate, getSeason, getTimeofDay } from './week';

describe('check getDate', () => {

  let listLanguage = ['en', 'ru', 'be'];
  let timezones = ["Europe/Minsk", "Europe/London", "America/New_York"];
  it('Click on inactive button', () => {
    for (let j = 0; j < timezones.length; ++j) {
      for (let i = 0; i < listLanguage.length; ++i) {
        expect(getDate(timezones[j], listLanguage[i])).toEqual(standard(timezones[j], listLanguage[i]));
      }
    }
  });
});

describe('check getSeason', () => {
  let max = 1;
  const date = new Date();
  let MonthArrayEn = new Array('winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter');
  it('Click on inactive button', () => {
    for (let j = 0; j < max; ++j) {
      expect(getSeason()).toEqual(MonthArrayEn[date.getMonth()]);
    }
  });
});

describe('check getSeason', () => {
  let max = 1;
  let timezone = "Europe/Minsk";
  let indiaTime = new Date().toLocaleString("en-US", { timeZone: timezone });
  const date = new Date(indiaTime);
  let dayArrayEn = new Array('night', 'night', 'night', 'night', 'night', 'morning', 'morning', 'morning', 'morning', 'morning', 'day', 'day', 'day', 'day', 'day', 'day', 'evening', 'evening', 'evening', 'evening', 'evening', 'evening', 'evening', 'night');
  it('Click on inactive button', () => {
    for (let j = 0; j < max; ++j) {
      expect(getTimeofDay(timezone)).toEqual(dayArrayEn[date.getHours()]);
    }
  });
});



function standard(timezone: string, language: string): string {
  let indiaTime = new Date().toLocaleString("en-US", { timeZone: timezone });
  const date = new Date(indiaTime);
  let daysRu = new Array('ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ');
  let MonthArrayRu = new Array('января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря');
  let daysEn = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
  let MonthArrayEn = new Array('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december');
  let daysBe = new Array('Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб');
  let MonthArrayBe = new Array('cтудзеня', 'лютага', 'сакавiка', 'красавiка', 'мая', 'червеня', 'лiпеня', 'жнiвня', 'верасня', 'кастрычнiка', 'лiстапада', 'снежня');
  const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
  const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
  const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
  if (language) {
    if (language === 'en') {
      return daysEn[date.getDay()] + ' ' + date.getDate() + ' ' + MonthArrayEn[date.getMonth()] + ' ' + hours + ':' + minutes + ':' + seconds;
    }
    if (language === 'ru') {
      return daysRu[date.getDay()] + ' ' + date.getDate() + ' ' + MonthArrayRu[date.getMonth()] + ' ' + hours + ':' + minutes + ':' + seconds;
    }
    if (language === 'be') {
      return daysBe[date.getDay()] + ' ' + date.getDate() + ' ' + MonthArrayBe[date.getMonth()] + ' ' + hours + ':' + minutes + ':' + seconds;
    }
  } else {
    return daysEn[date.getDay()] + ' ' + date.getDate() + ' ' + MonthArrayEn[date.getMonth()] + ' ' + hours + ':' + minutes + ':' + seconds;
  }
}
