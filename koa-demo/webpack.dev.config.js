const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: './src/js/index.js',
        detail: './src/js/detail.js',
        // vendors:['react','react-dom', 'reqwest', 'antd']
    },
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM',
    //
    // },
    output: {
        publicPath: '/',
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './views/index.html',
            template: './src/views/index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: './views/about.html',
            template: './src/views/about.html',
            chunks: [],
        }),
        new HtmlWebpackPlugin({
            filename: './views/detail.html',
            template: '!!raw-loader!' + 'src/views/detail.ejs',
            chunks: ['detail']
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/lib/vendor-manifest.json')
        }),
        // new UglifyJSPlugin(),
        new ExtractTextPlugin("css/[name].css"),
    ]
};