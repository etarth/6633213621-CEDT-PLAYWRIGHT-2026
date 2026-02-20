import { test, expect } from '@playwright/test';

test('Login failed with wrong username', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('testt');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
});