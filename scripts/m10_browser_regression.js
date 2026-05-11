const { chromium } = require('playwright');
const path = require('path');

async function resolveDeskBlockers(page) {
  await page.locator('[data-view="desk"]').click();
  for (let index = 0; index < 8; index += 1) {
    const buttons = page.locator('[data-resolve]:not([disabled])');
    const count = await buttons.count();
    if (!count) break;
    await buttons.first().click();
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const appPath = path.resolve(__dirname, '..', 'index.html');
  await page.goto(`file:///${appPath.replace(/\\/g, '/')}`);

  await page.locator('#startCareerButton').click();

  const requiredViews = [
    'desk', 'home', 'roster', 'depth', 'recruiting', 'portal', 'staff',
    'development', 'schedule', 'rankings', 'finance', 'facilities', 'history', 'analytics',
  ];

  for (const view of requiredViews) {
    await page.locator(`[data-view="${view}"]`).click();
    const title = (await page.locator('#sectionTitle').innerText()).trim();
    if (!title) throw new Error(`Missing title on ${view}`);
  }

  await page.locator('[data-view="recruiting"]').click();
  await page.locator('[data-recruit-filter="position"]').selectOption('QB');
  await page.locator('[data-recruit-filter="status"]').selectOption('Open');
  const recruitingTitle = await page.locator('#sectionTitle').innerText();
  if (!recruitingTitle.includes('Recruiting')) throw new Error('Recruiting filter navigation failed');

  await page.locator('[data-view="schedule"]').click();
  await page.locator('[data-set-tactic="Aggressive"]').first().click();
  await page.locator('[data-toggle-playbyplay="toggle"]').first().click();

  await page.locator('[data-view="analytics"]').click();
  await page.locator('[data-run-hardening="m9"]').first().click();
  const hardeningVisible = await page.locator('text=Hardening Results').isVisible();
  if (!hardeningVisible) throw new Error('Hardening panel not visible');

  await resolveDeskBlockers(page);
  const beforeDate = await page.locator('#careerDate').innerText();
  await page.locator('#continueButton').click();
  await page.waitForTimeout(700);
  const afterDate = await page.locator('#careerDate').innerText();
  if (beforeDate === afterDate) {
    throw new Error('Continue did not advance date after blocker resolution');
  }

  console.log('M10_BROWSER_REGRESSION_PASS');
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
