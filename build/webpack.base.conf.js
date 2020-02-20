const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const PATHS = {
    source: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.source
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: `${PATHS.source}/js/postcss.config.js`
                            }
                        }
                    }
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.pug$/,
                oneOf: [
                    {
                        resourceQuery: /^\?vue/,
                        use: ['pug-plain-loader']
                    },
                    {
                        use: ['pug-loader']
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            '~': PATHS.source,
            'vue$': 'vue/dist/vue.js',
        }
    },
    plugins: [
            new MiniCssExtractPlugin({
                filename: `${PATHS.assets}css/[name].css`
            }),
            new CopyWebpackPlugin([
                {
                    from: `${PATHS.source}/${PATHS.assets}images`,
                    to: `${PATHS.assets}images`
                },
                {
                    from: `${PATHS.source}/static`,
                    to: ''
                }
            ]),
            new HtmlWebpackPlugin({
                hash: false,
                template: `${PATHS.source}/pug/index.pug`,
            }),
            new VueLoaderPlugin(),
        ],
}