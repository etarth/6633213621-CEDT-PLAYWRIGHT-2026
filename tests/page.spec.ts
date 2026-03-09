import { test, expect } from '@playwright/test';

test('Page related command', async({ page })=> {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    const title = await page.title();
    expect(title).toBe('CURA Healthcare Service');

    await page.getByRole('link', { name: 'Make Appointment', exact: true }).click();
    await page.waitForLoadState('networkidle');

    const url = await page.url();    
    expect(url).toContain('profile.php#login');
})