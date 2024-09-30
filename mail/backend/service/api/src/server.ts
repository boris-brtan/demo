import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { sendResponse } from './model/generated/mailer_pb'
import { Static, Type } from '@sinclair/typebox'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { send } from './client'

const MailSchema = Type.Object({
    subject: Type.String({ minLength: 5 }),
    sender: Type.String({ format: 'email' }),
    recipient: Type.String({ format: 'email' }),
    body: Type.String({ minLength: 10 }),
    cc: Type.Optional(Type.String({ format: 'email' })),
})

const mailOpts: RouteShorthandOptions = {
    schema: {
        body: MailSchema,
    },
    attachValidation: true,
}

const pingOpts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    pong: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

const server: FastifyInstance = Fastify({}).withTypeProvider<TypeBoxTypeProvider>()


server.get('/ping', pingOpts, async () => {
    return { pong: '>it works<' }
})

server.post<{ Body: Static<typeof MailSchema> }>('/api/v1/mail', mailOpts, async (request, reply) => {
    if (request.validationError) {
        return reply.code(400).send(request.validationError)
    }

    const result = await send(request.body)
    if ((result as sendResponse)?.getStatus?.()) {
        return reply.code(200).send({ processed: true })
    }

    return reply.code(400).send({ processed: false })
})

async function start() {
    try {
        await server.listen({ host: '0.0.0.0', port: 3000 })
        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port
        console.log(`REST api running at http://localhost:${port}/ping`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start()
