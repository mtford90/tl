var gulp = require('gulp'),
  _ = require('underscore'),
  runSequence = require('run-sequence'),
  glob = require('glob'),
  path = require('path'),
  async = require('async'),
  config = require('./gulpfile.config'),
  plugins = require('gulp-load-plugins')();

function relativeTo(root, files) {
  if (_.isArray(files))
    return files.map(function (f) {
      return path.relative(root, f);
    });
  else
    return path.relative(root, files);
}

function dot(output, it) {
  return gulp.src(config.path.dev.dot)
    .pipe(plugins.dot({
      it: it
    }))
    .pipe(plugins.rename(output))
    .pipe(gulp.dest('./'))
    .pipe(plugins.livereload({port: config.livereload}));
}

gulp.task('build:index', function () {
  var root = config.build,
    vendorjs = relativeTo(root, config.vendor.js),
    js = relativeTo(root, [config.path.build.bundle]);
  return dot(config.path.dev.index, {
    js: js,
    vendorjs: vendorjs,
    livereloadPort: config.livereload.port,
    css: relativeTo(root, [config.path.build.css]),
    vendorcss: relativeTo(root, config.vendor.css),
    test: false
  });
});

gulp.task('build:test', function (done) {
  var root = config.build,
    vendorjs = relativeTo(root, config.vendor.js),
    js = relativeTo(root, [config.path.build.bundle]);
  glob(config.glob.dev.spec, function (err, specs) {
    dot(config.path.dev.specIndex, {
      js: js,
      vendorjs: vendorjs,
      livereloadPort: config.livereload.port,
      spec: relativeTo(root, specs),
      test: true
    }).on('end', done);
  });
});

gulp.task('build:js', function () {
  return gulp.src([config.glob.dev.js, '!' + config.glob.dev.spec])
    .pipe(plugins.webpack(config.webpack))
    .pipe(plugins.rename('bundle.js'))
    .pipe(gulp.dest(config.dir.build.js))
    .pipe(plugins.livereload({port: config.livereload.port}));
});


gulp.task('watch:sass', function () {
  return gulp.watch(config.glob.dev.sass, ['build:sass']);
});

gulp.task('build:sass', function () {
  return gulp.src(config.glob.dev.sass)
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(config.dir.build.css))
    .pipe(plugins.rename(config.file.build.css))
    .pipe(plugins.livereload({port: config.livereload.port}));

});

gulp.task('serve', function () {
  plugins.connect.server({
    root: './build',
    port: config.connectPort
  });
});

gulp.task('livereload:listen', function () {
  plugins.livereload.listen({port: config.livereload.port});
});

gulp.task('watch:js', function () {
  return gulp.watch(config.glob.dev.js, ['build:js'])
});

gulp.task('watch', ['build', 'watch:js', 'watch:sass', 'livereload:listen', 'serve']);

gulp.task('dist:js:app', function () {
  return gulp.src(config.path.build.bundle)
    .pipe(plugins.uglify())
    .pipe(gulp.dest(config.dir.dist.js));
});

gulp.task('dist:js:vendor', function () {
  return gulp.src(config.vendor.js)
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(config.dir.dist.js));
});

gulp.task('dist:css:app', function () {
  return gulp.src(config.path.build.css)
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('dist:css:vendor', function () {
  return gulp.src(config.vendor.css)
    .pipe(plugins.concat('vendor.css'))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('dist:assets', function (done) {
  async.parallel(
    Object.keys(config.assets).map(function (folder) {
      return function (done) {
        var glob = config.assets[folder];
        return gulp.src(glob)
          .pipe(gulp.dest(config.dist + '/' + folder))
          .on('end', done);
      }
    }),
    done
  );
});

gulp.task('dist:css', ['dist:css:app', 'dist:css:vendor']);

gulp.task('dist:html', function () {
  return dot(config.path.dist.index, {
    js: relativeTo(config.dist, [config.path.dist.vendorjs, config.path.dist.js]),
    css: relativeTo(config.dist, [config.path.dist.css]),
    vendorcss: relativeTo(config.dist, [config.path.dist.vendorcss]),
    test: false
  });
});

gulp.task('dist:js', ['dist:js:app', 'dist:js:vendor']);

gulp.task('dist', ['build'], function (done) {
  runSequence(
    'dist:js',
    'dist:assets',
    'dist:css',
    'dist:html',
    done
  )
});

gulp.task('build', function (done) {
  runSequence(
    'build:js',
    'build:sass',
    'build:index',
    'build:test',
    done
  )
});