import { test, expect, Page } from '@playwright/test';
import { MonitorsPage, MonitorCreatePage, MonitorDetailPage } from '../../pages/monitors.page';
import { loginIfNeeded } from '../../utils/auth-helper';

/**
 * Wait for page content to be ready
 * Uses domcontentloaded + timeout instead of networkidle (which can timeout on polling pages)
 */
async function waitForPageReady(page: Page, timeout = 2000): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(timeout);
}

test.beforeEach(async ({ page }) => {
  await loginIfNeeded(page);
});

test.describe("[BUG] Synthetic monitors: `getVariable` / `getSecret` unavailable in monitor runs", () => {
  test('Create a variable', async ({ page }) => {
    const createPage = new MonitorCreatePage(page);
      await createPage.navigate();    
      await createPage.expectLoaded();
  });
});