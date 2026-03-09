import { Page } from '@playwright/test';

export class AppointmentPage {
  constructor(private page: Page) {}

  get section() {
    return this.page.locator('section#appointment');
  }

  get heading() {
    return this.page.getByRole('heading', { name: 'Make Appointment', level: 2 });
  }

  get facilitySelect() {
    return this.page.locator('#combo_facility');
  }

  get bookButton() {
    return this.page.locator('#btn-book-appointment');
  }

  async expectMakeAppointmentVisible() {
    await this.section.waitFor({ state: 'visible' });
  }

  async checkHospitalReadmission() {
    await this.page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
  }

  async selectProgram(name: 'Medicare' | 'Medicaid' | 'None') {
    await this.page.getByRole('radio', { name }).check();
  }

  async pickVisitDate(day: number) {
    await this.page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
    await this.page.getByRole('cell', { name: String(day) }).click();
  }

  async setComment(text: string) {
    await this.page.getByRole('textbox', { name: 'Comment' }).fill(text);
  }

  async clickBookAppointment() {
    await this.page.getByRole('button', { name: 'Book Appointment' }).click();
  }
}
