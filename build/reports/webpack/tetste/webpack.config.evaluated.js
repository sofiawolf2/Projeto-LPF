{
  mode: 'development',
  resolve: {
    modules: [
      'C:\\Users\\sofia\\Desktop\\tetste\\build\\js\\packages\\tetste\\kotlin-dce-dev',
      'node_modules'
    ]
  },
  plugins: [
    ProgressPlugin {
      profile: false,
      handler: [Function: handler],
      modulesCount: 5000,
      dependenciesCount: 10000,
      showEntries: true,
      showModules: true,
      showDependencies: true,
      showActiveModules: false,
      percentBy: undefined
    },
    TeamCityErrorPlugin {}
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'source-map-loader'
        ],
        enforce: 'pre'
      }
    ]
  },
  entry: {
    main: [
      'C:\\Users\\sofia\\Desktop\\tetste\\build\\js\\packages\\tetste\\kotlin-dce-dev\\tetste.js'
    ]
  },
  output: {
    path: 'C:\\Users\\sofia\\Desktop\\tetste\\build\\distributions',
    filename: [Function: filename],
    library: 'tetste',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  devtool: 'eval-source-map',
  ignoreWarnings: [
    /Failed to parse source map/
  ],
  devServer: {
    open: true,
    static: [
      'C:\\Users\\sofia\\Desktop\\tetste\\build\\processedResources\\js\\main'
    ]
  },
  stats: {
    warnings: false,
    errors: false
  }
}