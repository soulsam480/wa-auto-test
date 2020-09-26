const { create, Client } = require("@open-wa/wa-automate");
// or
// import { create, Client } from '@open-wa/wa-automate';
const puppeteer = require("puppeteer");
async function run(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: "screenshot.png" });
  browser.close();
}

const launchConfig = {
  autoRefresh: true,
  cacheEnabled: true,
  sessionId: "hr",
};

function start(client) {
  client.onAnyMessage((message) => {
    /*     const from = message.from;
     */ const text = message.body;
    if (text.match("https://meet.google.com")) {
      run(text);
    }
  });
}

create(launchConfig)
  .then(start)
  .catch((err) => console.log(err));
