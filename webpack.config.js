module.exports = {
    devtool: 'eval-source-map',

    entry: __dirname + "/src/app.js",
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js',
        // publicPath: __dirname + '/resume/',
    },
    devServer: {
        contentBase: "./",
        historyApiFallback: true,
        inline: true
    }
};