import json from '@rollup/plugin-json'
import cleanup from 'rollup-plugin-cleanup'
import { minify } from 'rollup-plugin-swc-minify'

export default [
  {
    input: 'lib/index.js',
    output: {
      file: 'lib/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    external: './all.json',
    plugins: [
      cleanup()
    ]
  },
  {
    input: 'lib/index.js',
    output: [
      {
        file: 'lib/index.min.js',
        format: 'umd',
        name: 'dateTimeLocalePatterns',
        sourcemap: true,
        plugins: [
          minify()
        ]
      }
    ],
    plugins: [
      json()
    ]
  },
  {
    input: 'lib/code.js',
    output: [
      {
        file: 'lib/code.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'lib/code.min.js',
        format: 'umd',
        name: 'dateTimeLocalePatterns',
        sourcemap: true,
        plugins: [
          minify()
        ]
      }
    ],
    plugins: [
      cleanup()
    ]
  },
  {
    input: 'lib/short.js',
    output: {
      file: 'lib/short.min.js',
      format: 'umd',
      name: 'dateTimeLocalePatternsShort',
      sourcemap: true,
      plugins: [
        minify()
      ]
    },
    plugins: [
      json()
    ]
  }
]
