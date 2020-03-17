module.exports = {
    publicPath:
    process.env.NODE_ENV === 'production' ? '/uanl-repo-search/' : '/',
    configureWebpack: {
        devtool: 'source-map'
    }
};
