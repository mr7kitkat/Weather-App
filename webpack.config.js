const path = require("path");

module.exports = {
  mode: "development",
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "scripts"),
    filename: "main.js",
  },
};
