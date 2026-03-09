import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AppointmentPage } from '../pages/AppointmentPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

test('make-appointment-success', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const appointmentPage = new AppointmentPage(page);
  const confirmationPage = new ConfirmationPage(page);

  await homePage.goto();
  await homePage.clickMakeAppointment();
  await loginPage.login('John Doe', 'ThisIsNotAPassword');

  await appointmentPage.expectMakeAppointmentVisible();
  await appointmentPage.checkHospitalReadmission();
  await appointmentPage.selectProgram('Medicaid');
  await appointmentPage.pickVisitDate(21);
  await appointmentPage.setComment('hbd');
  await appointmentPage.clickBookAppointment();

  await confirmationPage.expectConfirmationVisible();
  await expect(confirmationPage.heading).toBeVisible();
});
