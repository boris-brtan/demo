import Fastify from 'fastify'
import apiV1 from './src/api/v1/index.js'
// import Timer from './src/timer.js'

const fastify = Fastify({
    logger: {
        level: process.env.LOG_LVL || 'warn',
    },
})

fastify.route({
    method: 'GET',
    url: '/api/v1/:url',
    preHandler: async (request, reply) => {
        reply.header('Access-Control-Allow-Origin', '*')
    },
    handler: apiV1,
})

const start = async () => {
    try {
        await fastify.listen(
            process.env.PORT || 1488,
            process.env.ADDR || '127.0.0.1'
        )
        // await Timer(fastify)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
