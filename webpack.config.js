const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

const PUBLIC_PATH = {
  development: 'http://localhost:4203/',
  production: 'https://soulhay.github.io/amor-lineribus-dashboard/',
};

module.exports = (env, argv) => {
  const mode = argv.mode === 'production' ? 'production' : 'development';

  return {
    entry: './src/index.js',
    mode,
    devServer: {
      port: 4203,
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
    output: {
      // Explicit rather than 'auto' so the remote's own chunks resolve against
      // the place it is deployed, not against the page that loads it.
      publicPath: PUBLIC_PATH[mode],
      uniqueName: 'dashboardRemote',
      scriptType: 'text/javascript',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: { extensions: ['.js', '.jsx'] },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
        { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'dashboardRemote',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'dashboardRemote' },
        exposes: { './Mount': './src/mount.js' },
        shared: {
          react: { singleton: true, requiredVersion: deps.react },
          'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        },
      }),
      new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],
  };
};
