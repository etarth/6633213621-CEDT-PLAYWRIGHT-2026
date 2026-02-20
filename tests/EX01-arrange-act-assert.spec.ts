import { test, expect } from '@playwright/test';

test('login-valid', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('section#appointment')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Make Appointment', level: 2 })).toBeVisible();
  await expect(page.locator('#combo_facility')).toBeVisible();
  await expect(page.locator('#btn-book-appointment')).toBeVisible();
});

test('login-fail-password', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Login failed! Please ensure the username and password are valid.')).toBeVisible();
  await expect(page.locator('section#appointment')).not.toBeVisible();
});

test('login-fail-username', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').fill('InvalidUser');
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Login failed! Please ensure the username and password are valid.')).toBeVisible();
  await expect(page.locator('section#appointment')).not.toBeVisible();
});