const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'reqwest', 'antd']
    },
    output: {
        path: path.join(__dirname, 'dist/lib'),
        filename: '[name].dll.js',
        library: '[name]'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, 'dist/lib', '[name]-manifest.json'),
            name: '[name]'
        })
    ]
};
