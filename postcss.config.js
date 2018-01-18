module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-apply'),
    require('postcss-assets')({
      "basePath": "src/",
      "cachebuster": true,
      "loadPaths": ["img/"],
      "relative": true
    }),
    require('postcss-pxtorem')({
      unitPrecision: 10,
      propWhiteList: [],
      replace: false,
      selectorBlackList: [],
      minPixelValue: 5
    }),
    require('postcss-cssnext')({
      browsers: ['> 2%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
    }),
    require('postcss-hexrgba'),
    require('postcss-reporter')({
      clearMessages: true
    })
  ]
};
