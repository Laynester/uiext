module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        output: {
            filename: 'uiext/[name].js',
            chunkFilename: 'uiext/[name].js'
        }
    },
    css: {
        extract: { 
            ignoreOrder: true,
            filename: 'uiext/[name].css', 
          },
    }
}