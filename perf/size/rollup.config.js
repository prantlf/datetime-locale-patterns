import { nodeResolve } from '@rollup/plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'

export default [
  {
    input: 'size/date-and-time.js',
    output: {
      file: 'size/date-and-time.bundle.js'
    },
    plugins: [
      nodeResolve(),
      cleanup()
    ]
  },
  {
    input: 'size/date-fns.js',
    output: {
      file: 'size/date-fns.bundle.js'
    },
    plugins: [
      nodeResolve(),
      cleanup()
    ]
  },
  {
    input: 'size/luxon.js',
    output: {
      file: 'size/luxon.bundle.js'
    },
    plugins: [
      nodeResolve(),
      cleanup()
    ]
  },
]
