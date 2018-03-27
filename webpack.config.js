const path = require('path')
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader') // for https://github.com/webpack/webpack/issues/3460
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('./package.json')

/*
NOTE: js and typescript module names shouldn't have a .js extention,
however, all other types of modules should.
NOTE: ts entrypoints should be mirrored in tsconfig.json
*/
const MODULES = {
  'dist/cgm_de_scheduler': './src/main.ts',
  'dist/cgm_de_scheduler.css': './src/main.scss',
  // 'tmp/automated-tests': './tests/automated/index.js'
}

const BANNER =
  '<%= title %> v<%= version %>\n' +
  'Docs & License: <%= homepage %>\n' +
  '(c) <%= copyright %>'

module.exports = {

  entry: MODULES,

  externals: {
    jquery: {
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery',
      root: 'jQuery'
    },
    moment: 'moment',
    cgm_de_fullcalendar: {
      commonjs: 'cgm_de_fullcalendar',
      commonjs2: 'cgm_de_fullcalendar',
      amd: 'cgm_de_fullcalendar',
      root: 'CGM_DE_FullCalendar'
    }
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      // use our slimmed down version
      // still need to npm-install the original though, for typescript transpiler
      'tslib': path.resolve(__dirname, 'src/tslib-lite.js'),

      // when tests access core test libs, don't use NPM package, use checkout
      'cgm_de_fullcalendar/tests': path.resolve(__dirname, 'cgm_de_fullcalendar/tests')
    }
  },

  module: {
    loaders: [
      {
        test: /\.(ts|js)$/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract([ 'css-loader' ])
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract([ 'css-loader', 'sass-loader' ])
      }
    ]
  },

  plugins: [
    new CheckerPlugin(),
    new ExtractTextPlugin({
      filename: '[name]', // the module name should already have .css in it!
      allChunks: true
    }),
    new webpack.BannerPlugin(BANNER)
  ],

  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/
  },

  output: {
    libraryTarget: 'umd',
    filename: '[name].js',
    path: __dirname,
    devtoolModuleFilenameTemplate: 'webpack:///' + packageConfig.name + '[resource-path]'
  }

}
