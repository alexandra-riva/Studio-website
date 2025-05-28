const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    output: {
      filename: isProduction ? "main.[contenthash].js" : "main.js", 
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    devtool: isProduction ? false : "eval-source-map", 
    devServer: {
      watchFiles: ["./src/template.html"],
      open: true,
      hot: true, 
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        } : false, 
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};