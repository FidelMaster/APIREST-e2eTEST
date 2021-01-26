
import LoginPage from '../pages/login.page';
import SecurePage from '../pages/secure.page';

import chai = require('chai');

//const chaiWebdriver = require('chai-webdriver');
const validusername = 'test@nicasource.com';
const validpassword = 'test123';

const incorrectUsername = 'nicaso';
const incorrectPassword = 'mga2029';
 
describe('Verify input are empty', () => {
    
    it('email input is empty', () => {
        LoginPage.open();
        const emailInput = LoginPage.inputUsername.getText();
        
        chai.expect(emailInput).empty;
    });

    it('password input is empty', () => {
        LoginPage.open();
        const passwordInput = LoginPage.inputPassword.getText();
        chai.expect(passwordInput).empty;
    });

});

 

//Login Suite
describe('Login functionality test suite', () => {

    it('should login with valid credentials', () => {
        LoginPage.open();
        LoginPage.login(validusername, validpassword);
       expect(SecurePage.flashAlert).toBeExisting();
      // expect(SecurePage.flashAlert).toHaveTextContaining('Authentication succed.');
    });
});





