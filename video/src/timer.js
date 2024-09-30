export default async (fastify) => {
    return setInterval(() => {
        fastify.log.info('5 sec interval ' + new Date())
    }, 5000)
}
// Object.values(temp1.querySelectorAll('tbody > tr'))
//     .map((tr)=>{
//         tds = tr.querySelectorAll('td')
//         proxy = [tds[0]?.innerText, tds[1]?.innerText].join(':')
//         speed = parseInt(tds[7]?.innerText) || Infinity
//         uptime = parseFloat(tds[9]?.innerText)
//         timeout = parseInt(tds[9]?.innerText)
//         if (uptime < 85 || speed === Infinity) return undefined
//         return {
//             proxy,
//             speed,
//             timeout
//         }
//     })
//     .filter(i=>i)
//     .sort((a, b) => a.timeout - b.timeout)
