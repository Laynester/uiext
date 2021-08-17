module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js'
        }
    },
    css: {
        extract: { 
            ignoreOrder: true,
            filename: 'css/[name].css', 
          },
    },
    chainWebpack: config => {
        config.plugin('html')
          .tap(args => {
            args[0].minify = false
            return args
          })
      }
}