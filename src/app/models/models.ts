export interface OnLoadAble {
  onload: any;
  onerror: any;
}

export interface CityForecast {
  temp: string,
  icon: string,
  datetime: string,
}

export interface CityInfoCurrent {
  temp: string,
  app_temp: string,
  icon: string,
  datetime: string,
  description: string,
  wind_spd: string,
  rh: string,
}

export interface CityInfoCurrent {
  temp: string,
  app_temp: string,
  icon: string,
  datetime: string,
  description: string,
  wind_spd: string,
  rh: string,
}

export interface IMapOptions {
  KEYGEOCORDING: string;
  KEYMAPAPI: string;
  LAT: string;
  LNG: string;
}