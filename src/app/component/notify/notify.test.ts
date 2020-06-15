import Notify from './notify';

describe('notify opens', () => {
  async function doChanges() {
    await wait(5000);
    expect(testContainer).toEqual('');
  }
  let content = 'test1';
  let typeContent = 'error';
  let max = 1;
  let test = new Notify();
  let testContainer = test.render();
  async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  it('Open message', () => {
    expect(testContainer.innerHTML).toEqual('');
    test.openMessage(content, typeContent);
    expect(testContainer.querySelector('.notify__text').innerHTML).toEqual(content);
  });

  it('Close message', () => {
    test.openMessage(content, typeContent);
    expect(testContainer.querySelector('.notify__text').innerHTML).toEqual(content);
    let buttonClick = testContainer.querySelector('.notify__close') as HTMLButtonElement;
    buttonClick.click();
    expect(testContainer.innerHTML).toEqual('');
  });

  it('Close message after 5 sec', () => {
    expect(testContainer.innerHTML).toEqual('');
    test.openMessage(content, typeContent);
    expect(testContainer.querySelector('.notify__text').innerHTML).toEqual(content);
    doChanges();
  });
});