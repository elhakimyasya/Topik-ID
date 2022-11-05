const path = require('path');
const autoprefixer = require('autoprefixer');
const terserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        // auth: './plugins/auth/scripts/script.js',
        // "materia-auth": './plugins/materia-auth/scripts/script.js',
        // midtrans: './plugins/midtrans/scripts/script.js',
        // drive: './plugins/drive/scripts/script.js',
        // main: './plugins/scripts.js',
        scripts: './src/assets/scripts/script.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                        },
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer()
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer Dart Sass
                            implementation: require('sass'),

                            // See https://github.com/webpack-contrib/sass-loader/issues/804
                            webpackImporter: false,
                            sassOptions: {
                                includePaths: ['./node_modules']
                            },
                        },
                    },
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new terserWebpackPlugin({
                extractComments: false,
                terserOptions: {
                    mangle: true,
                    compress: true,
                    format: {
                        comments: false,
                    },
                },
            })
        ],
        // splitChunks: {
        //     chunks: 'all',

        // },
    },
    output: {
        clean: true,
        path: path.resolve(__dirname, './plugins/dist'),
        filename: '[name].js'
    },
    watch: true
}