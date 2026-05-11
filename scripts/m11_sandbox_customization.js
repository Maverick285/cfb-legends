const { chromium } = require('playwright');
const path = require('path');

async function setRangeValue(page, selector, value) {
  await page.$eval(
    selector,
    (el, nextValue) => {
      el.value = String(nextValue);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    },
    value,
  );
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const appPath = path.resolve(__dirname, '..', 'index.html');
  await page.goto(`file:///${appPath.replace(/\\/g, '/')}`);

  await page.locator('#experienceModeSelect').selectOption('Sandbox');
  await page.locator('#rulesPresetSelect').selectOption('arcadeFireworks');

  await setRangeValue(page, '#recruitingApInput', 12);
  await setRangeValue(page, '#retentionApInput', 8);
  await setRangeValue(page, '#portalExceptionInput', 4);
  await setRangeValue(page, '#scoringEnvInput', 130);
  await setRangeValue(page, '#volatilityInput', 140);
  await setRangeValue(page, '#tacticalImpactInput', 125);
  await setRangeValue(page, '#injuryCadenceInput', 135);
  await setRangeValue(page, '#nilVolatilityInput', 145);
  await setRangeValue(page, '#progressionPaceInput', 120);

  await page.locator('#startCareerButton').click();

  const coachStrip = await page.locator('#coachLabel').innerText();
  if (!coachStrip.includes('(Sandbox)')) {
    throw new Error(`Expected Sandbox mode label in coach strip, got: ${coachStrip}`);
  }

  await page.locator('[data-view="recruiting"]').click();
  const recruitingText = await page.locator('#content').innerText();
  if (!/Action budget\s+12\/12|Recruiting Actions\s*\(12 AP left\)/.test(recruitingText)) {
    throw new Error('Custom recruiting AP did not apply to Recruiting Board.');
  }

  await page.locator('[data-view="portal"]').click();
  const portalText = await page.locator('#content').innerText();
  if (!portalText.includes('Activate (4 advances)')) {
    throw new Error('Custom portal exception advances did not apply to portal controls.');
  }

  await page.locator('[data-view="finance"]').click();
  const financeText = await page.locator('#content').innerText();
  if (!/NIL market volatility\s+145/.test(financeText)) {
    throw new Error('Custom NIL volatility did not apply to market pressure model.');
  }

  await page.locator('[data-view="development"]').click();
  const developmentText = await page.locator('#content').innerText();
  if (!/Injury cadence\s+135/.test(developmentText) || !/Progression pace\s+120/.test(developmentText)) {
    throw new Error('Custom injury cadence or progression pace did not apply to development signals.');
  }

  await page.locator('[data-view="schedule"]').click();
  await page.locator('[data-set-tactic="Aggressive"]').first().click();
  await page.locator('#continueButton').click();

  console.log('M12_SANDBOX_CUSTOMIZATION_PASS');
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
