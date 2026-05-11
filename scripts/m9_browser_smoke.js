const { chromium } = require('playwright');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const appPath = path.resolve(__dirname, '..', 'index.html');
  await page.goto(`file:///${appPath.replace(/\\/g, '/')}`);

  const startButton = page.locator('#startCareerButton');
  await startButton.click();

  const navTargets = [
    'desk',
    'home',
    'roster',
    'depth',
    'recruiting',
    'portal',
    'staff',
    'development',
    'schedule',
    'rankings',
    'finance',
    'facilities',
    'history',
    'analytics',
  ];

  for (const target of navTargets) {
    await page.locator(`[data-view="${target}"]`).click();
    const title = await page.locator('#sectionTitle').innerText();
    if (!title || !title.trim()) {
      throw new Error(`Missing section title after navigating to ${target}`);
    }
  }

  await page.locator('[data-view="schedule"]').click();
  await page.locator('[data-set-tactic="Aggressive"]').first().click();
  await page.locator('[data-toggle-playbyplay="toggle"]').first().click();

  await page.locator('[data-view="analytics"]').click();
  await page.locator('[data-run-hardening="m9"]').first().click();

  const hardeningHeading = page.locator('text=Hardening Results');
  if (!(await hardeningHeading.isVisible())) {
    throw new Error('Hardening results panel did not render.');
  }

  console.log('M9_BROWSER_SMOKE_PASS');
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
