import { test, expect } from '@playwright/test';

test.describe('New Session car/track selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByRole('button', { name: 'New Session' }).click();
    await expect(page.getByRole('region', { name: 'New Session' })).toBeVisible();
  });

  test('shows placeholder options in the Car and Track dropdowns by default', async ({
    page,
  }) => {
    const carSelect = page.getByLabel('Car');
    const trackSelect = page.getByLabel('Track');

    await expect(carSelect).toBeVisible();
    await expect(trackSelect).toBeVisible();

    await expect(carSelect).toHaveValue('');
    await expect(trackSelect).toHaveValue('');

    await expect(carSelect.locator('option', { hasText: 'Select a GT3 car…' })).toHaveCount(1);
    await expect(trackSelect.locator('option', { hasText: 'Select a track…' })).toHaveCount(1);
  });

  test('lists every mock car and track as selectable options', async ({ page }) => {
    const carSelect = page.getByLabel('Car');
    const trackSelect = page.getByLabel('Track');

    await expect(carSelect.locator('option', { hasText: 'Porsche 911 GT3 R' })).toHaveCount(1);
    await expect(carSelect.locator('option', { hasText: 'Ferrari 296 GT3' })).toHaveCount(1);

    await expect(
      trackSelect.locator('option', { hasText: 'Circuit de la Sarthe (Le Mans)' }),
    ).toHaveCount(1);
    await expect(trackSelect.locator('option', { hasText: 'Spa-Francorchamps' })).toHaveCount(1);
  });

  test('saves the selected car in local state and reveals its default characteristics', async ({
    page,
  }) => {
    const carSelect = page.getByLabel('Car');

    await carSelect.selectOption({ label: 'Porsche 911 GT3 R' });

    await expect(carSelect).toHaveValue('porsche-911-gt3');
    await expect(page.getByText('High rear traction')).toBeVisible();
    await expect(page.getByText('Light front end on turn-in')).toBeVisible();
    await expect(page.getByText('Sensitive to lift-off oversteer')).toBeVisible();
  });

  test('updates the characteristics list when the car selection changes', async ({ page }) => {
    const carSelect = page.getByLabel('Car');

    await carSelect.selectOption({ label: 'Porsche 911 GT3 R' });
    await expect(page.getByText('High rear traction')).toBeVisible();

    await carSelect.selectOption({ label: 'Ferrari 296 GT3' });

    await expect(carSelect).toHaveValue('ferrari-296-gt3');
    await expect(page.getByText('High rear traction')).not.toBeVisible();
    await expect(page.getByText('Balanced weight distribution')).toBeVisible();
    await expect(page.getByText('Agile mid-corner rotaton')).toBeVisible();
    await expect(page.getByText('Stable braking')).toBeVisible();
  });

  test('saves the selected track in local state', async ({ page }) => {
    const trackSelect = page.getByLabel('Track');

    await trackSelect.selectOption({ label: 'Spa-Francorchamps' });

    await expect(trackSelect).toHaveValue('spa-francorchamps');
  });

  test('retains selected car and track in local state after navigating away and back', async ({
    page,
  }) => {
    const carSelect = page.getByLabel('Car');
    const trackSelect = page.getByLabel('Track');

    await carSelect.selectOption({ label: 'Ferrari 296 GT3' });
    await trackSelect.selectOption({ label: 'Circuit de la Sarthe (Le Mans)' });

    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByRole('region', { name: 'Start Session' })).toBeVisible();

    await page.getByRole('button', { name: 'New Session' }).click();
    await expect(page.getByRole('region', { name: 'New Session' })).toBeVisible();

    await expect(page.getByLabel('Car')).toHaveValue('ferrari-296-gt3');
    await expect(page.getByLabel('Track')).toHaveValue('le-mans');
  });
});
