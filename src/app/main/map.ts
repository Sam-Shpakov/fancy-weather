interface OnLoadAble {
  onload: any;
  onerror: any;
}
export default class Map {

  mapContainer: HTMLDivElement;
  KEYMAPAPI: string;


  constructor() {
    this.KEYMAPAPI = 'pk.eyJ1Ijoic2theW1hbnQiLCJhIjoiY2tiMGc2dGJhMDdzajJ4bWVtcnFrdHI5ZyJ9.JVI3u1rZALDoFrEjvcwZcg';
  }

  public render(): HTMLDivElement {
    this.mapContainer = document.createElement('div');
    this.mapContainer.classList.add('map-container');

    this.mapContainer.append(this.getMap());
    this.mapContainer.append(this.getCoordinates());
    return this.mapContainer;
  }

  public async updateLocation(lat: string, lng: string, language: string): Promise<void> {
    mapboxgl.accessToken = this.KEYMAPAPI;
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: 10
    });

    let marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);
    let coordinatesContainer = this.mapContainer.querySelectorAll('.map-container__coordinates>p') as NodeListOf<HTMLParagraphElement>;
    const coordinates = this.updateCoordinates(lat, lng, language);
    coordinatesContainer[0].innerText = coordinates[0];
    coordinatesContainer[1].innerText = coordinates[1];
  }


  private getMap(): HTMLDivElement {
    const mapMask = document.createElement('div');
    mapMask.classList.add('map-container__mask');
    let mapContainer = document.createElement('div');
    mapContainer.id = 'map';
    mapMask.append(mapContainer);
    return mapMask;
  }

  private getCoordinates(): HTMLDivElement {
    const coordinatesContainer = document.createElement('div');
    coordinatesContainer.classList.add('map-container__coordinates');
    const xCoordinates = document.createElement('p');
    coordinatesContainer.append(xCoordinates);
    const yCoordinates = document.createElement('p');
    coordinatesContainer.append(yCoordinates);
    return coordinatesContainer;
  }

  private updateCoordinates(lat: string, lng: string, language: string): Array<string> {
    switch (language) {
      case 'be': {
        const coordinates = [`Шырата: ${lat.substr(0, 2)}° ${lat.substr(3, 2)}'`, `Даўгата: ${lng.substr(0, 2)}° ${lng.substr(3, 2)}'`];

        return coordinates;
      }
      case 'ru': {
        const coordinates = [`Широта: ${lat.substr(0, 2)}° ${lat.substr(3, 2)}'`, `Долгота: ${lng.substr(0, 2)}° ${lng.substr(3, 2)}'`];
        return coordinates;
      }
      default: {
        const coordinates = [`Latitude: ${lat.substr(0, 2)}° ${lat.substr(3, 2)}'`, `Longitude: ${lng.substr(0, 2)}° ${lng.substr(3, 2)}'`];
        return coordinates;
      }
    }
  }




}