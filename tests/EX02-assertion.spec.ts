import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('make-appointment-assertions', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Make Appointment', level: 2 })).toBeVisible();

  const facility = page.getByLabel('Facility');
  const options = ['Tokyo CURA Healthcare Center', 'Hongkong CURA Healthcare Center', 'Seoul CURA Healthcare Center'];
  for (const value of options) {
    await facility.selectOption(value);
    await expect(facility).toHaveValue(value);
  }

  const readmission = page.locator('#chk_hospotal_readmission');
  await readmission.check();
  await expect(readmission).toBeChecked();
  await readmission.uncheck();
  await expect(readmission).not.toBeChecked();

  await page.getByLabel('Medicaid').check();
  await expect(page.locator('#radio_program_medicaid')).toBeChecked();
  await page.getByLabel('None').check();
  await expect(page.locator('#radio_program_none')).toBeChecked();
  await page.getByLabel('Medicare').check();
  await expect(page.locator('#radio_program_medicare')).toBeChecked();

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const visitDate = `${dd}/${mm}/${yyyy}`;
  await page.locator('#txt_visit_date').fill(visitDate);
  await expect(page.locator('#txt_visit_date')).toHaveValue(visitDate);

  await page.getByRole('textbox', { name: 'Comment' }).fill('test comment');
  await expect(page.locator('#txt_comment')).toHaveValue('test comment');

  const bookBtn = page.getByRole('button', { name: 'Book Appointment' });
  await expect(bookBtn).toBeVisible();
  await expect(bookBtn).toBeEnabled();
});
