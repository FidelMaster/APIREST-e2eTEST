/** Principal page */
export default class Page {
    /** url testing*/
    open (path: string) {
        return browser.url('http://automationpractice.com/index.php?controller=authentication&back=my-account')
    }
}
