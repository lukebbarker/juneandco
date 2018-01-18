/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var directory = process.env.NODE_ENV === 'development' ? 'dev' : 'public';

var config = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  entry: ['./src/index.js'],
  output: {
    filename: 'assets/bundle.js',
    path: path.resolve(__dirname, directory)
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['env', 'react', 'stage-2']
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath: '/',
              outputPath: 'assets/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(directory),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/img/favicon', to: '.' }
    ])
  ]
};

if (process.env.NODE_ENV === 'development') {
  config.entry.unshift('webpack/hot/only-dev-server');
  config.entry.unshift('webpack-dev-server/client?http://localhost:8080');
  config.devServer = {
    hot: true,
    inline: true,
    host: '0.0.0.0'
  };
  config.devtool = 'eval';
  config.module.rules = config.module.rules.concat([
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader?importLoaders=1',
          query: { sourceMap: true }
        },
        'postcss-loader'
      ]
    }
  ]);
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
} else {
  config.bail = true;
  config.profile = false;
  config.devtool = 'source-map';
  config.module.rules = config.module.rules.concat([
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader?importLoaders=1',
            query: { minimize: true }
          },
          'postcss-loader'
        ]
      })
    },
  ]);
  config.plugins = config.plugins.concat([
    new CompressionPlugin(),
    new ExtractTextPlugin('assets/styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      output: {
        comments: false
      }
    })
  ]);
}

module.exports = config;
/* eslint-enable */
