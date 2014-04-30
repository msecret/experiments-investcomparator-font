// Copyright (c) 2014
// All Rights Reserved
// https://github.com/msecret/experiments-investcomparator-front
// Licensed Apache

require.config({
  baseUrl: '../js',
  insertRequire: ['invc'],
  name: 'invc/main',
  exclude: [
  ],
  out: '../js/compiled/invc.js',

  // Options
  optimize: 'uglify2',
  useStrict: true,
  wrap: true,

  paths: {
    invc: 'src'
  }
});
