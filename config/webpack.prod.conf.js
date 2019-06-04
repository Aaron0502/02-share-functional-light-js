const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require("./webpack.base.conf.js");

const PROJECT_DIR = path.join(__dirname, "../");

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(PROJECT_DIR, "src/index.html"),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      favicon: path.resolve(PROJECT_DIR, "./src/assets/favicon.ico")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
      // chunkFilename: "[id].[hash:8].css"
    }),
    new OptimizeCSSAssetsPlugin({}),
  ]
});
