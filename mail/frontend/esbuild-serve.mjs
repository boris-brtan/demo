import * as esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'

const ctx = await esbuild.context({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outdir: 'public/asset',
    define: {
        'process.env.NODE_ENV': '"development"',
    },
    sourcemap: true,
    loader: {
        '.woff': 'file',
        '.woff2': 'file',
    },
    plugins: [sassPlugin()],
})

await ctx.watch()

const { host, port } = await ctx.serve({ servedir: 'public' })
console.log('open http://%s:%s/', host, port)
