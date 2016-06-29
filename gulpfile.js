var gulp = require('gulp'),
    ossup = require('gulp-oss-up'),
    newer = require('gulp-newer'),
    useref = require('gulp-useref'),
    clean = require('gulp-clean'),
    exec = require('child_process').exec,
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    replace = require('gulp-replace'),
    filter = require('gulp-filter'),
    through = require('through2'),
    fs = require('fs'),
    manifest = {}

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
gulp.task('init-manifest', () => {
  var content = fs.readFileSync('./manifest.json', {flag: 'a+'}).toString()
  manifest = JSON.parse(content || '{}');
  return gulp
})

gulp.task('oss-css', () => {
  var cssOptions = cloneObj(aliyunOptions)
  cssOptions.objectDir = 'stylesheets'
  return gulp.src('dist/stylesheets/doc-*.css')
    .pipe(checkManifest('stylesheets'))
    .pipe(ossup(cssOptions))
    .pipe(gulp.dest('dist-bak/stylesheets/'))
})

gulp.task('oss-js', () => {
  var jsOptions = cloneObj(aliyunOptions)
  jsOptions.objectDir = 'javascripts'
  return gulp.src('dist/javascripts/doc-*.js')
    .pipe(checkManifest('javascripts'))
    .pipe(ossup(jsOptions))
    .pipe(gulp.dest('dist-bak/javascripts/'))
})

gulp.task('oss-img', () => {
  var imgOptions = cloneObj(aliyunOptions)
  imgOptions.objectDir = 'images'
  return gulp.src('dist/images/**/*')
    .pipe(checkManifest('images'))
    .pipe(ossup(imgOptions))
    .pipe(gulp.dest('dist-bak/images/'))
})

gulp.task('oss-font', () => {
  var fontOptions = cloneObj(aliyunOptions)
  fontOptions.objectDir = 'fonts'
  return gulp.src('dist/fonts/**/*')
    .pipe(checkManifest('fonts'))
    .pipe(ossup(fontOptions))
    .pipe(gulp.dest('dist-bak/fonts/'))
})

gulp.task('update-manifest', () => {
  fs.writeFileSync('manifest.json', JSON.stringify(manifest))
  return gulp
})

gulp.task('clean-assets', () => {
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

var checkManifest = (type) => {
  return through.obj((chunk, enc, cb) => {
    manifest[type] || (manifest[type] = [])
    if (manifest[type].indexOf(chunk.path) > -1) {
      cb(null, null)
    } else {
      manifest[type].push(chunk.path)
      cb(null, chunk)
    }
  })
}

gulp.task('default', (cb) => {
  console.log(process.env.NODE_ENV)
  
  var tasks = []
  switch (process.env.NODE_ENV) {
    case 'production':
      tasks = [
        'clean',
        'build',
        'init-manifest',
        ['oss-js', 'oss-css', 'oss-font', 'oss-img'],
        'update-manifest',
        'clean-assets',
        cb
      ]
      break
    default:
      tasks = [
        'clean',
        'build'
      ]
  }
  runSequence.apply(this, tasks)
});
