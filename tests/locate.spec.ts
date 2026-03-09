import { test, expect } from '@playwright/test';

test.describe('Locate element', async() => {
    test('Get unique element', async({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        // locate element
        await page.getByRole('link', { name: 'Make Appointment', exact: true }).click();
        await page.getByLabel('Username').fill('username');
        await page.locator('//*[@id="btn-login"]').click();
    })

    test('Locate eelement using index', async({ page }) => {

    })

})