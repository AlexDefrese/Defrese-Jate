const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      // database: './src/js/database.js',
      // editor: './src/js/editor.js',
      // header: './src/js/header.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // configure workbox plugins 
      new HtmlWebpackPlugin ({
        template: './index.html',
        title: 'JATE'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      // configure manifest file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'Takes notes with JavaScript syntax highlighting',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [ 96, 128, 192, 256, 384, 512 ],
            destination: path.join('assets', 'icons'),
          },
          {
            src: path.resolve('src/images/logo.png'),
            size: '1024x1024',
            destination: path.join('assets', 'icons'),
            purpose: 'maskable'
          }
        ],
      }),
    ],
    // add CSS loaders
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        
      ],
    },
  };
};
