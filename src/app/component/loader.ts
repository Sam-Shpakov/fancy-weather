export function getLoader(): HTMLDivElement {
  let preloader = document.createElement('div');
  preloader.classList.add('preloader');
  let keyValue = `<div class="cssload-loader"><div class="cssload-inner cssload-one"></div><div class="cssload-inner cssload-two"></div><div class="cssload-inner cssload-three"></div></div>`;
  preloader.insertAdjacentHTML('beforeend', keyValue);
  return preloader;
}