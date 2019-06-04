const path = require('path');
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf.js");

const PROJECT_DIR = path.join(__dirname, '../');

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(PROJECT_DIR, '/dist'),
    port: 9000,
    open: true,
    inline: true,
    disableHostCheck: true,
  }
});
