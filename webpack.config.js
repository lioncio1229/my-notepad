export default {
    devServer: {
        publicPath: '/',
        historyApiFallback: true,
        open: true,
        overlay: true,
        proxy: {
          '/api': 'http://localhost:3000'
        }
    }
};