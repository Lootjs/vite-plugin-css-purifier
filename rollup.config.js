import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { dts } from "rollup-plugin-dts";

export default [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/css-purifier.js',
            format: 'esm'
        },
        plugins: [
            typescript(),
            commonjs({
                include: /node_modules/
            }),
            terser()
        ],
        external: ['@fullhuman/postcss-purgecss'],
    },
    {
        input: "./src/index.ts",
        output: { file: "dist/css-purifier.d.ts", format: "es" },
        plugins: [dts()],
    }
];
