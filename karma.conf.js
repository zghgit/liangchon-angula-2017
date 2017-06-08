// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'coverage-istanbul']
              : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
    aaa = [
        {
            "key": "手提式",
            "value": [
                {
                    "key": "专业型",
                    "value": [
                        {
                            "id": "100",
                            "name": "引擎鼓风",
                            "image": "img/goods1.png"
                        },
                        {
                            "id": "101",
                            "name": "引擎割草",
                            "image": "img/goods2.png"
                        },
                        {
                            "id": "102",
                            "name": "引擎链锯",
                            "image": "img/goods3.png"
                        }
                    ]
                },
                {
                    "key": "民用型",
                    "value": [
                        {
                            "id": "200",
                            "name": "引擎链锯",
                            "image": "img/goods3.png"
                        }
                    ]
                },
                {
                    "key": "其他型",
                    "value": [
                        {
                            "id": "300",
                            "name": "修边机",
                            "image": "img/goods1.png"
                        }
                    ]
                }


            ]
        }
    ]
};

