import MenuLanguage from './menu-language';

describe('Scale test click on buttons', () => {
  function doChanges(t: string) {
    expect(testContainer.querySelector('.droplist-base>span').innerHTML).toEqual(t);
  }
  let listLanguage = ['en', 'ru', 'be'];
  let test = new MenuLanguage(doChanges, listLanguage);
  let testContainer = test.render(listLanguage[0]);

  it('Click on menu change language', () => {
    for (let i = 0; i < listLanguage.length; ++i) {
      let buttonClick = testContainer.querySelector('.droplist-base') as HTMLButtonElement;
      buttonClick.click();
      expect(testContainer.querySelector('.drop-down-menu').classList.contains('drop-down-menu--open')).toEqual(true);
      let buttonsMenu = testContainer.querySelector(`#${listLanguage[i]}`) as HTMLButtonElement;
      buttonsMenu.click();
      expect(buttonsMenu.classList.contains('inactive')).toEqual(false);
      test.doChanges(testContainer.querySelector('.droplist-base>span').innerHTML);
    }
  });
});