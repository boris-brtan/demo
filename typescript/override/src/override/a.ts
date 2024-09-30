// import { a as originalA } from '../ld/a'
import { a as baseA, A as BaseA } from '#base/a'

export * from '#base/a';

export const a = () => {
    return baseA() + ' b'
}

export class A extends BaseA {
    async log2() {
        console.log('Logged 2!!!')
    }
}
