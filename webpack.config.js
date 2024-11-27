const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    output: {
      filename: isProduction ? "main.[contenthash].js" : "main.js", // Cache busting in production
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    devtool: isProduction ? false : "eval-source-map", // Disable source maps in production
    devServer: {
      watchFiles: ["./src/template.html"],
      open: true, // Automatically open the browser
      hot: true, // Enable hot module replacement
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        } : false, // Disable minification in development
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