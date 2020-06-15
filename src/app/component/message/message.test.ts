import Message from './message';

describe('Message opens', () => {
  async function doChanges() {
    await wait(5000);
    expect(testContainer).toEqual('');
  }
  let content = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7'];
  let typeContent = 'error';
  let max = 1;
  let test = new Message(content);
  let testContainer = test.render();
  async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  it('Open message', () => {
    expect(testContainer.classList.contains('open')).toEqual(false);
    test.openMessage();
    expect(testContainer.classList.contains('open')).toEqual(true);
  });

  it('Close message click cross', () => {
    expect(testContainer.classList.contains('open')).toEqual(true);
    test.openMessage();
    expect(testContainer.classList.contains('open')).toEqual(true);
    let buttonClick = testContainer.querySelector('.message-info__button-close') as HTMLButtonElement;
    buttonClick.click();
    expect(testContainer.classList.contains('open')).toEqual(false);
  });
});