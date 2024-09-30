import { spawnSync } from 'child_process'

export default async (request, reply) => {
    const proxy = [ // @TODO: implement update list via Timer
        'socks4://128.0.179.142:4153',
        'socks4://85.92.58.162:1080',
    ]

    const proxyTimeout = 1.5
    const tries = 8
    let embed,m3u8

    for (let i = 0; i < tries; i++) {
        embed = spawnSync('curl', ['--connect-timeout', proxyTimeout, '-x', proxy[i % 2], request.params.url])
        if (embed.status === 0) {
            break
        }
    }
    for (let i = 0; embed.status === 0 && i < tries; i++) {
        m3u8 = spawnSync(
            'curl',
            [
                '--connect-timeout', proxyTimeout,
                '-x', proxy[i % 2],
                embed.stdout.toString().match(/[^"]+\/embed\/[^"]+/)?.[0],
            ]
        )
        const m3u8Url = m3u8.stdout.toString().match(/[^"]+\.m3u8/)?.[0].replace(/\\\//g, '/')
        if (m3u8Url) {
            reply.header('cache-control', 'public, max-age=10800, s-maxage=10800')
            return m3u8Url
        }
    }
    reply.code(400)
    return 'try again later ...'
}
