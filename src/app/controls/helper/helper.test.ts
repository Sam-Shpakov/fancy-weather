import Helper from './helper';

describe('Helper', () => {
  function doMessage() {
    expect('do Something').toEqual('do Something');
  }
  let text = 'test';
  let max = 3;
  let test = new Helper(text, doMessage);
  let testContainer = test.getHelper();

  it('Open helper', () => {
    for (let i = 0; i < max; ++i) {
      testContainer.click();
    }
  });
});