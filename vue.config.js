module.exports = {
    devServer: {
        open: true,
        https: false,
        proxy: {
            '/app': {
                target: 'http://localhost:8099',
                changeOrigin: true,
                pathRewrite: {
                    '^/app': ''
                }
            }
        }
    }
}