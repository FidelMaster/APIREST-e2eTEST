import Page from './page';
 
class SecurePage extends Page {
    /** search the alert*/
    get flashAlert () { return $('.alert') }
}

export default new SecurePage();
