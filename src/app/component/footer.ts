export function getFooter(content: Array<string>): HTMLDivElement {
    let footer = document.createElement('div');
    footer.classList.add('footer-container');

    let ticker = document.createElement('div');
    ticker.classList.add('ticker');
    content.forEach((element, index) => {
        let tickerItem = document.createElement('p');
        tickerItem.classList.add('ticker__item');
        tickerItem.innerText = element;
        ticker.append(tickerItem);
    });

    footer.append(ticker);

    return footer;
}

export function updateFooter(content: Array<string>): void {
    let footer = document.querySelector('.footer-container');
    let tickers = footer.querySelectorAll('.ticker__item');
    tickers.forEach((element, index) => {
        element.innerHTML = content[index];
    });
}