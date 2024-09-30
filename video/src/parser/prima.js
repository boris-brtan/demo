import { spawnSync } from 'child_process'
import fetch from 'node-fetch'

export default async (request, reply) => {
    const id = (await (await fetch(request.params.url)).text()).match(/embedded.+id=(.+?)"/)[1]
    const url = `https://api.play-backend.iprima.cz/prehravac/init-embed?embed=true&productId=${id}`

    const m3u8 = spawnSync(
        'curl',
        [
            '-H', `referer: https://api.play-backend.iprima.cz/prehravac/embedded?id=${id}`,
            '-H', `cookie: PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7IlBTRVNTSU9OSUQiOiJlMmU4ODEzOS1iZTYyLTQyZjAtOWNlMy05MzFjOTA3NjU5Y2MifSwibmJmIjoxNjEwNDY5NzM0LCJpYXQiOjE2MTA0Njk3MzR9.wHPBFSiq3rLllaH_xaVeVho3FVCQDoSkhePAa1Kq0-8`,
            url,
        ]
    )

    const m3u8Url = m3u8.stdout.toString().match(/[^"]+\.m3u8/)?.[0].replace(/\\\//g, '/')
    if (m3u8Url) {
        reply.header('cache-control', 'public, max-age=86400, s-maxage=86400')
        return m3u8Url
    }

    reply.code(400)
    return 'try again later ...'
}
