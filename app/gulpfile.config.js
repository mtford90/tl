module.exports = new (function () {
  this.src = './src';
  this.build = './build';
  this.dist = '../server/timezones/static/timezones';
  this.templates = '../server/timezones/templates';

  var jsGlob = '/js/**/*.js';
  var specGlob = '/js/**/*.spec.js';

  this.glob = {
    dev: {
      js: this.src + jsGlob,
      spec: this.src + specGlob,
      sass: this.src + '/scss/**/*.scss'
    },
    build: {
      js: this.build + jsGlob,
      spec: this.build + specGlob
    },
    dist: {
      css: this.dist + '/css/**/*.css'
    }
  };

  this.file = {
    build: {
      css: 'main.css'
    }
  };

  this.dir = {
    build: {
      css: this.build + '/css',
      js: this.build + '/js'
    },
    dist: {
      css: this.dist + '/css',
      js: this.dist + '/js'
    }
  };

  this.path = {
    dev: {
      dot: this.src + '/index.dot',
      index: this.build + '/index.html',
      specIndex: this.build + '/index.mocha.html'
    },
    build: {
      css: this.dir.build.css + '/' + this.file.build.css,
      bundle: this.dir.build.js + '/bundle.js',
      testBundle: this.dir.build.js + '/test-bundle.js'
    },
    dist: {
      js: this.dist + '/js/bundle.js',
      vendorjs: this.dist + '/js/vendor.js',
      css: this.dist + '/css/main.css',
      vendorcss: this.dist + '/css/vendor.css',
      index: this.templates + '/index.html'
    }
  };

  var BOWER = this.build + '/bower_components/';

  this.vendor = {
    js: [
      BOWER + 'es5-shim/es5-shim.js',
      BOWER + 'react/react-with-addons.js',
      BOWER + 'react-router/build/umd/ReactRouter.js',
      BOWER + 'immutable/dist/immutable.js',
      BOWER + 'moment/moment.js',
      BOWER + 'jquery/dist/jquery.js',
      BOWER + 'pouchdb/dist/pouchdb.js',
      BOWER + 'siesta/dist/siesta.js',
      BOWER + 'semantic-ui/dist/semantic.js',
      BOWER + 'react-semantify/dst/react-semantify.js',
      BOWER + 'rangy/rangy-core.js',
      BOWER + 'rangy/rangy-serializer.js',
      BOWER + 'underscore/underscore.js',
      BOWER + 'reflux/dist/reflux.js'
    ],
    css: [
      BOWER + 'font-awesome/css/font-awesome.css',
      BOWER + 'semantic-ui/dist/semantic.css'
    ]
  };

  this.connectPort = 9090;

  this.assets = {
    fonts: [
      BOWER + 'font-awesome/fonts/**',
      BOWER + 'semantic-ui/dist/themes/default/assets/fonts/**'
    ]
  };

  this.webpack = {
    bundle: {
      externals: {
        'react-router': 'ReactRouter',
        'react': 'React',
        'jQuery': '$',
        'immutable': 'Immutable',
        'underscore': '_',
        'reflux': 'Reflux'
      },
      devtool: '#eval-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    },
    test: {
      externals: {
        'react-router': 'ReactRouter',
        'react': 'React',
        'jQuery': '$',
        'immutable': 'Immutable',
        'underscore': '_'
      },
      devtool: '#eval-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    }

  };

  this.livereload = {
    port: 35740
  };
})();
