var path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '',
        files: [
            'test/**/*.spec.js'
        ],

        preprocessors: {
            'test/**/*.js': ['webpack']
        },

        frameworks: ['jasmine'],

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage-istanbul-reporter'
        ],

        reporters: [
            'progress',
            'coverage-istanbul'
        ],

        coverageIstanbulReporter: {
            reports: ['html'], // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/master/lib
            dir: './coverage', // output directory
            fixWebpackSourcePaths: true // if using webpack and pre-loaders, work around webpack breaking the source path
        },

        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel',
                        exclude: path.resolve(__dirname, 'node_modules'),
                        query: {
                            presets: ['airbnb']
                        }
                    },
                    {
                        test: /\.json$/,
                        loader: 'json',
                    },
                ],
                postLoaders: [ { //delays coverage til after tests are run, fixing transpiled source coverage error
                    test: /\.js$/,
                    exclude: /(test|node_modules|bower_components)\//,
                    loader: 'istanbul-instrumenter' }
                ]
            },
            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
                'react/addons': true,
            }
        },

        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },

        babelPreprocessor: {
            options: {
                presets: ['airbnb']
            }
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
    })
};