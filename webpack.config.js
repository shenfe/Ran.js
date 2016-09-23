var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        path: 'dist',
        filename: '[name].js'
    },
    plugins: [commonsPlugin]
};
