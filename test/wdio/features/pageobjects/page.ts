export default class Page {

    public open (path = '') {
        return browser.url('https://the-internet.herokuapp.com' + path)
    }
}
