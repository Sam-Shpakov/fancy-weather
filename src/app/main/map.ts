export default class Map {

  mapContainer: HTMLDivElement;
  KEYMAPAPI: string;

  constructor() {
    this.KEYMAPAPI = 'AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE';
  }

  public async render(lat: string, lng: string): Promise<HTMLDivElement> {
    this.mapContainer = document.createElement('div');
    this.mapContainer.classList.add('map-container');
    this.mapContainer.append(await this.getMap(lat, lng));
    this.mapContainer.append(this.getCoordinates(lat, lng));
    this.updateLocation(lat, lng);

    return this.mapContainer;
  }

  public updateLocation(lat: string, lng: string): void {
    let mapIframe = this.mapContainer.querySelector('.map-iframe') as HTMLIFrameElement;
    mapIframe.src = `https://www.google.com/maps/embed/v1/view?center=${lat},${lng}&zoom=11&key=${this.KEYMAPAPI}&language=${localStorage.language.substr(1, 2)}`;
    let coordinates = this.mapContainer.querySelectorAll('.map-container__coordinates>p') as  NodeListOf<HTMLParagraphElement>;
    coordinates[0].innerText = lat;
    coordinates[1].innerText = lng;
  }


  private async getMap(lat: string, lng: string): Promise<HTMLDivElement> {
    const mapContainer = document.createElement('div');
    mapContainer.classList.add('map-container__map');
    const mapIframe = document.createElement('iframe');
    mapIframe.classList.add('map-iframe');
    mapIframe.src = `https://www.google.com/maps/embed/v1/view?center=${lat},${lng}&zoom=11&key=${this.KEYMAPAPI}&language=${localStorage.language.substr(1, 2)}`;
    mapContainer.append(mapIframe);
    return mapContainer;
  }

  private getCoordinates(lat: string, lng: string): HTMLDivElement {
    const coordinatesContainer = document.createElement('div');
    coordinatesContainer.classList.add('map-container__coordinates');
    const xCoordinates = document.createElement('p');
    xCoordinates.innerText = lat;
    coordinatesContainer.append(xCoordinates);
    const yCoordinates = document.createElement('p');
    yCoordinates.innerText = lng;
    coordinatesContainer.append(yCoordinates);
    return coordinatesContainer;
  }


}