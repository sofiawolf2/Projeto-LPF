let config = {
  mode: 'development',
  resolve: {
    modules: [
      "node_modules"
    ]
  },
  plugins: [],
  module: {
    rules: []
  }
};

// entry
config.entry = {
    main: ["C:\\Users\\sofia\\Desktop\\tetste\\build\\js\\packages\\tetste\\kotlin-dce-dev\\tetste.js"]
};

config.output = {
    path: "C:\\Users\\sofia\\Desktop\\tetste\\build\\distributions",
    filename: (chunkData) => {
        return chunkData.chunk.name === 'main'
            ? "tetste.js"
            : "tetste-[name].js";
    },
    library: "tetste",
    libraryTarget: "umd",
    globalObject: "this"
};

// resolve modules
config.resolve.modules.unshift("C:\\Users\\sofia\\Desktop\\tetste\\build\\js\\packages\\tetste\\kotlin-dce-dev")

// source maps
config.module.rules.push({
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
});
config.devtool = 'eval-source-map';
config.ignoreWarnings = [/Failed to parse source map/]

// dev server
config.devServer = {
  "open": true,
  "static": [
    "C:\\Users\\sofia\\Desktop\\tetste\\build\\processedResources\\js\\main"
  ]
};

// Report progress to console
// noinspection JSUnnecessarySemicolon
;(function(config) {
    const webpack = require('webpack');
    const handler = (percentage, message, ...args) => {
        const p = percentage * 100;
        let msg = `${Math.trunc(p / 10)}${Math.trunc(p % 10)}% ${message} ${args.join(' ')}`;
        msg = msg.replace("C:\\Users\\sofia\\Desktop\\tetste\\build\\js", '');;
        console.log(msg);
    };

    config.plugins.push(new webpack.ProgressPlugin(handler))
})(config);

// noinspection JSUnnecessarySemicolon
;(function(config) {
    const tcErrorPlugin = require('kotlin-test-js-runner/tc-log-error-webpack');
    config.plugins.push(new tcErrorPlugin())
    config.stats = config.stats || {}
    Object.assign(config.stats, config.stats, {
        warnings: false,
        errors: false
    })
})(config);
// save evaluated config file
;(function(config) {
    const util = require('util');
    const fs = require('fs');
    const evaluatedConfig = util.inspect(config, {showHidden: false, depth: null, compact: false});
    fs.writeFile("C:\\Users\\sofia\\Desktop\\tetste\\build\\reports\\webpack\\tetste\\webpack.config.evaluated.js", evaluatedConfig, function (err) {});
})(config);

module.exports = config
