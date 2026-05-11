const { chromium } = require("playwright");
const path = require("path");
async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  const appPath = path.resolve(__dirname, "..", "index.html");
  const url = "file:///" + appPath.split("\\").join("/");
  await page.goto(url);
  await page.locator("#startCareerButton").click();
  await page.locator('[data-view="desk"]').click();
  for (let i = 0; i < 12; i++) {
    const buttons = page.locator('[data-resolve]:not([disabled])');
    const count = await buttons.count();
    if (!count) break;
    await buttons.first().click();
    await page.waitForTimeout(200);
  }
  const remaining = await page.locator('[data-resolve]:not([disabled])').count();
  const btnText = await page.locator("#continueButton").innerText();
  console.log("Remaining blockers: " + remaining);
  console.log("Continue button: " + btnText);
  const beforeDate = await page.locator("#careerDate").innerText();
  await page.locator("#continueButton").click();
  await page.waitForTimeout(1500);
  const afterDate = await page.locator("#careerDate").innerText();
  console.log("Before: " + beforeDate + " After: " + afterDate);
  console.log("Errors: " + JSON.stringify(errors.slice(0, 5)));
  await browser.close();
}
run().catch((e) => { console.error(e); process.exit(1); });
