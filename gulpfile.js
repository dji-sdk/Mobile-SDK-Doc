var gulp = require('gulp')
var ossup = require('gulp-oss-up')
var newer = require('gulp-newer')
var useref = require('gulp-useref')
var clean = require('gulp-clean')
var exec = require('child_process').exec
var runSequence = require('run-sequence')
var rev = require('gulp-rev')
var revReplace = require('gulp-rev-replace')
var replace = require('gulp-replace')
var filter = require('gulp-filter')
var through = require('through2')
var fs = require('fs')


// cdn options
var cdn_host = process.env.CDN_HOST
// aliyun options
var aliyunOptions = {
  'accessKeyId': process.env.ACCESS_KEY_ID,
  'accessKeySecret': process.env.ACCESS_KEY_SECRET,
  'bucket': process.env.BUCKET
}

// clean 
gulp.task('clean', () => {
  return gulp.src(['dist'])
    .pipe(clean())
})

// build
gulp.task('build', () => {
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
      prefix: cdn_host
    }))
    .pipe(gulp.dest('dist'))
})

// upload files to aliyun
gulp.task('oss-css', () => {
  var cssOptions = cloneObj(aliyunOptions)
  cssOptions.objectDir = 'stylesheets'
  return gulp.src('dist/stylesheets/doc-*.css')
    .pipe(newFile('dist/stylesheets', 'dist-bak/stylesheets'))
    .pipe(ossup(cssOptions))
    .pipe(gulp.dest('dist-bak/stylesheets/'))
})

gulp.task('oss-js', () => {
  var jsOptions = cloneObj(aliyunOptions)
  jsOptions.objectDir = 'javascripts'
  return gulp.src('dist/javascripts/doc-*.js')
    .pipe(newFile('dist/javascripts', 'dist-bak/javascripts'))
    .pipe(ossup(jsOptions))
    .pipe(gulp.dest('dist-bak/javascripts/'))
})

gulp.task('oss-img', () => {
  var imgOptions = cloneObj(aliyunOptions)
  imgOptions.objectDir = 'images'
  return gulp.src('dist/images/**/*')
    .pipe(newFile('dist/images', 'dist-bak/images'))
    .pipe(ossup(imgOptions))
    .pipe(gulp.dest('dist-bak/images/'))
})
gulp.task('oss-font', () => {
  var fontOptions = cloneObj(aliyunOptions)
  fontOptions.objectDir = 'fonts'
  return gulp.src('dist/fonts/**/*')
    .pipe(newFile('dist/fonts', 'dist-bak/fonts'))
    .pipe(ossup(fontOptions))
    .pipe(gulp.dest('dist-bak/fonts/'))
})

gulp.task("after", () => {
  return gulp.src([
      'dist/images', 
      'dist/fonts', 
      'dist/javascripts', 
      'dist/stylesheets'])
    .pipe(clean())
})

gulp.on('stop', () => { process.exit(0) })

// utils
var cloneObj = (obj) => JSON.parse(JSON.stringify(obj))

var newFile = (path, bakPath) => {
  return through.obj((chunk, enc, cb) => {
    var bakFile = chunk.path.replace(path, bakPath)
    cb(null, fs.existsSync(bakFile) ? null : chunk)
  })
}

gulp.task('default', (cb) => {
  runSequence(
    'clean',
    'build',
    ['oss-js', 'oss-css', 'oss-font', 'oss-img'],
    'after',
    cb
  );
});
