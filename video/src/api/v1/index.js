import Nova from '../../parser/nova.js'
import Prima from '../../parser/prima.js'
import RTVS from '../../parser/rtvs.js'

export default async (request, reply) => {
    switch (true) {
        case request.params?.url.search(RegExp('^https://novaplus.nova.cz/')) === 0:
            return await Nova(request, reply)
        case request.params?.url.search(RegExp('^https://www.rtvs.sk/')) === 0:
            return await RTVS(request, reply)
        case request.params?.url.search(RegExp('^https://[^.]+.iprima.cz/')) === 0:
            return await Prima(request, reply)
        default:
            reply.code(400)
            return '!!! Fuck-Off !!!'
    }
}
