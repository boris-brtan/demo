import { ChainablePromiseElement } from 'webdriverio'

import Page from './page'

class LoginPage extends Page {

    private async setInputValue(label: string, value: string) {
        await $('label=' + label).click()
        return await $(':focus').setValue(value)
    }

    public async login (username: string, password: string) {
        await this.setInputValue('Username', username)
        await this.setInputValue('Password', password)
        await $('button=Login').click()
    }

    /**
     * @override
     */
    public open () {
        return super.open('/login')
    }
}

export default new LoginPage()
