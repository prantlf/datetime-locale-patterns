# DateTime Formatting Performance 

## Speed

    ❯ node speed
    Formatting a short pattern with...
      date-and-time x 309,018 ops/sec ±0.71% (95 runs sampled)
      date-and-time compiled x 465,304 ops/sec ±0.74% (95 runs sampled)
      date-fns x 219,725 ops/sec ±0.14% (97 runs sampled)
      luxon x 144,975 ops/sec ±0.62% (91 runs sampled)
      luxon created x 174,242 ops/sec ±0.89% (92 runs sampled)
    Fastest was date-and-time compiled.

    Formatting a medium pattern with...
      date-and-time x 262,369 ops/sec ±0.60% (89 runs sampled)
      date-and-time compiled x 388,032 ops/sec ±0.81% (95 runs sampled)
      date-fns x 181,168 ops/sec ±0.63% (88 runs sampled)
      luxon x 145,382 ops/sec ±0.76% (92 runs sampled)
      luxon created x 174,300 ops/sec ±0.43% (95 runs sampled)
    Fastest was date-and-time compiled.

    Formatting a long pattern with...
      date-and-time x 228,825 ops/sec ±0.45% (94 runs sampled)
      date-and-time compiled x 343,029 ops/sec ±0.92% (90 runs sampled)
      date-fns x 159,483 ops/sec ±0.93% (91 runs sampled)
      luxon x 119,887 ops/sec ±1.00% (90 runs sampled)
      luxon created x 143,351 ops/sec ±1.29% (92 runs sampled)
    Fastest was date-and-time compiled.

    Formatting a full pattern with...
      date-and-time x 195,126 ops/sec ±0.88% (90 runs sampled)
      date-and-time compiled x 304,845 ops/sec ±0.79% (89 runs sampled)
      date-fns x 134,185 ops/sec ±2.10% (93 runs sampled)
      luxon x 113,567 ops/sec ±0.60% (88 runs sampled)
      luxon created x 134,272 ops/sec ±1.12% (91 runs sampled)
    Fastest was date-and-time compiled.

## Size

    ❯ npm run size
    size/date-and-time.bundle.js   12K
    size/date-fns.bundle.js        49K
    size/luxon.bundle.js          121K
