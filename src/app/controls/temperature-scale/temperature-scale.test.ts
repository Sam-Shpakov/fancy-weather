import TemperatureScale from './temperature-scale';

describe('Scale test click on buttons', () => {
  function doChanges(t) {
    scaleContainer.querySelectorAll('.button').forEach((element) => {
      if (!element.classList.contains('inactive')) {
        expect(element.innerHTML).toEqual(t);
      }
    });
  }
  let listScale = ['°F', '°C'];
  let max = 3;
  let temperatureScale = new TemperatureScale(doChanges, listScale);
  let scaleContainer = temperatureScale.render(listScale[0]);

  it('Click on inactive button', () => {
    for (let i = 0; i < max; ++i) {
      let buttonClick = scaleContainer.querySelector('.inactive') as HTMLButtonElement;
      buttonClick.click();
      expect(buttonClick.classList.contains('inactive')).toEqual(false);
      temperatureScale.doChanges(buttonClick.innerHTML);
    }
  });
});