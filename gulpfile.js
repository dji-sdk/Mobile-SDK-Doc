var gulp          = require('gulp'),
    useref        = require('gulp-useref'),
    del           = require('del'),
    runSequence   = require('run-sequence'),
    rev           = require('gulp-rev'),
    revReplace    = require('gulp-rev-replace'),
    replace       = require('gulp-replace'),
    filter        = require('gulp-filter'),
    path          = require('path'),
    fs            = require('fs')
    
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
})


// ali oss helpers

// putalioss
var through2  = require('through2'),
    AliOSS    = require('ali-oss').Wrapper,
    mime      = require('mime')

/**
 * @param {prefix, [manifestPath = `.tmp/${prefix}-mainfest.json`], accessKeyId, accessKeySecret, [bucket], [endpoint], [region], [internal], [timeout]}
 * https://github.com/ali-sdk/ali-oss#ossoptions
 */
var putalioss = function (options) {
  return through2.obj(function (chunk, enc, cb) {
    var currentDir = process.cwd(),
        prefix = options.prefix || '',
        manifestPath = path.join(currentDir, options.manifestPath || '.tmp'),
        manifestFile = path.join(manifestPath, prefix + '-manifest.json'),
        client = new AliOSS(options)

    fs.existsSync(manifestPath) || fs.mkdirSync(manifestPath)
    var manifest = JSON.parse(fs.readFileSync(manifestFile, {flag: 'a+'}).toString() || '[]')

    if (chunk.isBuffer()) {
      var name = path.join(prefix, chunk.path.replace(chunk.base, ''))
      if (manifest.indexOf(name) > -1) {
        cb(null, chunk)
      } else {
        var _opt = {
          mime: mime.lookup(chunk.path)
        }
        client.put(name, chunk.path, _opt).then(function (val) {
          console.log('[OK]', val.name)
          manifest.push(val.name)
          fs.writeFileSync(manifestFile, JSON.stringify(manifest))
          cb(null, chunk)
        }).catch (function (err) {
          console.log('[Err]', err)
          cb(null, chunk)
        });
      }
    } else {
      cb(null, chunk)
    }
  })
}
