import fetch from 'node-fetch'

export default async (request, reply) => {
    const id = request.params.url.split('/')?.reverse()[0]
    const m3u8 = await (await fetch(`https://www.rtvs.sk/json/archive5f.json?id=${id}`)).json()

    if (m3u8?.clip.sources[0].src) {
        reply.header('cache-control', 'public, max-age=2592000, s-maxage=2592000')
        return m3u8?.clip.sources[0].src
    }

    reply.code(400)
    return 'try again later ...'
}
