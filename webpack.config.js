const path = require("path");
const HtmlWebpackPlugiin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/index.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new HtmlWebpackPlugiin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ]
};