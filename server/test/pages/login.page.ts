import Page from './page';

/* Login Methods*/
class LoginPage extends Page {
    /* Selectors */
    get inputUsername () { return $('#email') }
    get inputPassword () { return $('#passwd') }
    get btnSubmit () { return $('button[id="SubmitLogin"]') }

    /* test auth */
    login (username: string, password: string) {
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnSubmit.click(); 
    }

    /** Calling browser method*/
    open () {
        return super.open('login');
    }
}

export default new LoginPage();
