var gulp          = require('gulp'),
    ossup         = require('gulp-oss-up'),
    newer         = require('gulp-newer'),
    useref        = require('gulp-useref'),
    del           = require('del'),
    runSequence   = require('run-sequence'),
    rev           = require('gulp-rev'),
    revReplace    = require('gulp-rev-replace'),
    replace       = require('gulp-replace'),
    filter        = require('gulp-filter')

var putalioss     = require('./my-gulp-plugin/gulp-putalioss')
    
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var cdnHost = process.env.CDN_HOST || '',
    aliyunOptions = {
      'accessKeyId': process.env.ACCESS_KEY_ID || '',
      'accessKeySecret': process.env.ACCESS_KEY_SECRET || '',
      'bucket': process.env.BUCKET || '',
      'region': process.env.REGION || ''
    }

// clean 
gulp.task('clean', function () {
  return del(['dist'])
})

// build
gulp.task('build', function () {
  var imgFilter = filter('public/images/**/*', {restore: true});
  var fontFilter = filter('public/fonts/**/*', {restore: true});
  var jsFilter = filter('public/javascripts/doc-*.js', {restore: true});
  var cssFilter = filter('public/stylesheets/doc-*.css', {restore: true});
  var htmlFilter = filter('public/**/*.html', {restore: true});
  return gulp.src('public/**')
    .pipe(htmlFilter)
    .pipe(useref({searchPath: 'public'}))
    .pipe(gulp.dest('public'))
    .pipe(replace(/src="(\.\.\/)*images/g, 'src="/images'))
    .pipe(htmlFilter.restore)
    .pipe(imgFilter)
    .pipe(rev())
    .pipe(imgFilter.restore)
    .pipe(fontFilter)
    .pipe(rev())
    .pipe(fontFilter.restore)
    .pipe(cssFilter)
    .pipe(rev())
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
    .pipe(rev())
    .pipe(jsFilter.restore)
    .pipe(revReplace({
      canonicalUris: true,
      prefix: cdnHost
    }))
    .pipe(gulp.dest('dist'))
})

// upload files to aliyun

gulp.task('oss-css', function () {
  var cssOptions = cloneObj(aliyunOptions)
  cssOptions.prefix = 'stylesheets'
  return gulp.src('dist/stylesheets/doc-*.css')
    .pipe(putalioss(cssOptions))
})

gulp.task('oss-js', function () {
  var jsOptions = cloneObj(aliyunOptions)
  jsOptions.prefix = 'javascripts'
  return gulp.src('dist/javascripts/doc-*.js')
    .pipe(putalioss(jsOptions))
})

gulp.task('oss-img', function () {
  var imgOptions = cloneObj(aliyunOptions)
  imgOptions.prefix = 'images'
  return gulp.src('dist/images/**/*')
    .pipe(putalioss(imgOptions))
})

gulp.task('oss-font', function () {
  var fontOptions = cloneObj(aliyunOptions)
  fontOptions.prefix = 'fonts'
  return gulp.src('dist/fonts/**/*')
    .pipe(putalioss(fontOptions))
})

gulp.task('clean-assets', function () {
  return del([
    'dist/images',
    'dist/fonts',
    'dist/javascripts',
    'dist/stylesheets'])
})

if (!development()) {
  gulp.on('stop', function () { process.exit(0) })
}

// helpers
function cloneObj (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function development () {
  return process.env.NODE_ENV === 'development'
}

gulp.task('default', function (cb) {
  if (!development()) {
    runSequence(
      'clean',
      'build',
      ['oss-js', 'oss-css', 'oss-font', 'oss-img'],
      'clean-assets',
      cb
    )
  }
});
