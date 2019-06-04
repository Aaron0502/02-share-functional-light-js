const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AutoPrefixer = require("autoprefixer");

const isProductMode = process.env.NODE_ENV === "production";
const PROJECT_DIR = path.join(__dirname, "../");
module.exports = {
  entry: {
    app: ["@babel/polyfill", path.join(PROJECT_DIR, "src/app/index.js")]
  },
  output: {
    filename: "bundle.[hash].js",
    path: path.join(PROJECT_DIR, "/dist")
  },
  resolve: {
    alias: {
      "@": path.resolve(PROJECT_DIR, "./src"),
      "@App": path.resolve(PROJECT_DIR, "./src/app"),
      "@Image": path.resolve(PROJECT_DIR, "./src/assets/images"),
    },
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: "pre",
        include: path.join(PROJECT_DIR, "./"),
        exclude: path.join(PROJECT_DIR, "node_modules"),
        use: "eslint-loader"
      },
      {
        test: /\.(less)$/,
        use: [
          isProductMode ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                AutoPrefixer({
                  browsers: ["ie >= 9", "last 2 versions"]
                })
              ]
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'images/[name].[hash:7].[ext]',
          publicPath: '/'
        }
      },
      {
        test: /\.(css)$/,
        use: [
          isProductMode ? MiniCssExtractPlugin.loader : "style-loader",
          // "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                AutoPrefixer({
                  browsers: ["ie >= 9", "last 2 versions"]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.md$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
          outputPath: '/source',
          publicPath: '/'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(PROJECT_DIR, "src/index.html"),
      favicon: path.resolve(PROJECT_DIR, "./src/assets/favicon.ico")
    })
  ]
};