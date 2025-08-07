const puppeteer = require("puppeteer");

const searchText = "Транспортир";

(async () => {
    const browser = await puppeteer.launch({
        bindAddress: "0.0.0.0",
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });
    try {
        await page.goto("https://wildberries.ru/", { waitUntil: "networkidle2" });
        console.log("Открыл вб");
        await page.waitForSelector('#app');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
        await page.type('#searchInput', searchText, { delay: 100 });
        await page.keyboard.press("Enter");

        await page.waitForSelector('.catalog-page',);

        for (let i = 0; i < 10; i++) {
            await page.hover('[data-testid="sort"] button.dropdown-filter__btn');
        }

        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));

        await page.evaluate(() => {

            const items = Array.from(document.querySelectorAll('.filter__item.j-catalog-sort .radio-with-text__text'));
            const target = items.find(el => el.textContent.trim() === 'По возрастанию цены');
            if (target) target.click();
        });

        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));

        const products = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.product-card.j-card-item')).slice(0, 10);
            return cards.map(card => {
                const name = card.querySelector('.product-card__name')?.innerText.trim() || '';
                const price = card.querySelector('.price__lower-price')?.innerText.trim() || '';
                return { name, price };
            });
        });

        console.log(products);
    } catch (error) {
        console.error("Ошибка: ", error)
    }

    await browser.close();
})(); 