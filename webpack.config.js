const path = require("path");

const { merge } = require("webpack-merge");
const webpack = require("webpack");

module.exports = (mode) => {
  const isDev = mode.development;
  const isPro = mode.production;

  const dev = {
    devtool: "inline-source-map",
  };

  const pro = {};

  const base = {
    mode: isDev ? "development" : "production",
    entry: {
      index: "./src/content_scripts/index.ts",
      background: "./src/background_scripts/index.ts",
    },
    output: {
      path: path.resolve(__dirname, "plugin"),
      filename: "[name].js",
    },
    externals: {
      uuid: "uuid",
    },
    resolve: {
      extensions: [".ts"],
      alias: {
        src: path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.ts$/, loader: "ts-loader" },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        FORMELEMENT: '"input,textarea,select,radio"',
      }),
    ],
  };

  return merge(base, isDev ? dev : pro);
};
