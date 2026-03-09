import { Page } from '@playwright/test';

export class ConfirmationPage {
  constructor(private page: Page) {}

  get heading() {
    return this.page.getByRole('heading', { name: 'Appointment Confirmation' });
  }

  async expectConfirmationVisible() {
    await this.heading.waitFor({ state: 'visible' });
  }
}
