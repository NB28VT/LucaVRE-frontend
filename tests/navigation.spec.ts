import { test, expect } from '@playwright/test';

test.describe('Page navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('shows the Start Session page on initial load', async ({ page }) => {
    await expect(page.getByRole('region', { name: 'Start Session' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Setup Assistant' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'New Session' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Load Session' })).toBeVisible();
  });

  test('navigates to New Session and back to Start Session', async ({ page }) => {
    await page.getByRole('button', { name: 'New Session' }).click();

    await expect(page.getByRole('region', { name: 'New Session' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Start Session' })).not.toBeVisible();

    await page.getByRole('button', { name: 'Back' }).click();

    await expect(page.getByRole('region', { name: 'Start Session' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'New Session' })).not.toBeVisible();
  });

  test('navigates to Load Session and back to Start Session', async ({ page }) => {
    await page.getByRole('button', { name: 'Load Session' }).click();

    await expect(page.getByRole('region', { name: 'Load Session' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Start Session' })).not.toBeVisible();

    await page.getByRole('button', { name: 'Back' }).click();

    await expect(page.getByRole('region', { name: 'Start Session' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Load Session' })).not.toBeVisible();
  });
});
