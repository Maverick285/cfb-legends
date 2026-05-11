import { test, expect } from '@playwright/test';

// Copy this file into the actual repo's tests/visual folder and adjust routes.
// These tests are intentionally objective visual gates, not AI opinion gates.

test.describe('College Football Legends visual smoke tests', () => {
  test('dashboard renders required regions and matches screenshot baseline', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/dashboard');

    await expect(page.getByTestId('app-header')).toBeVisible();
    await expect(page.getByTestId('main-content')).toBeVisible();
    await expect(page.getByTestId('continue-button')).toBeVisible();

    await expect(page).toHaveScreenshot('dashboard-1920.png', {
      animations: 'disabled',
      maxDiffPixels: 1500,
    });
  });

  test('no marked text is clipped', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/dashboard');

    const clipped = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('[data-no-clip]'));
      return elements
        .map((el) => {
          const e = el as HTMLElement;
          return {
            text: e.innerText,
            clipped: e.scrollWidth > e.clientWidth || e.scrollHeight > e.clientHeight,
          };
        })
        .filter((x) => x.clipped);
    });

    expect(clipped).toEqual([]);
  });

  test('primary panels do not overflow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/dashboard');

    const overflow = await page.evaluate(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const panels = Array.from(document.querySelectorAll('[data-panel]'));
      return panels
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            id: (el as HTMLElement).dataset.testid || el.id || el.className,
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            overflows: rect.left < 0 || rect.top < 0 || rect.right > vw || rect.bottom > vh,
          };
        })
        .filter((x) => x.overflows);
    });

    expect(overflow).toEqual([]);
  });
});
