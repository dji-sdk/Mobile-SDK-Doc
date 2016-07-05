var through2  = require('through2'),
    AliOSS    = require('ali-oss').Wrapper,
    path      = require('path'),
    fs        = require('fs'),
    gutil     = require('gulp-util')

/**
 * @param {prefix, [manifestPath = `.tmp/${prefix}-mainfest.json`], accessKeyId, accessKeySecret, [bucket], [endpoint], [region], [internal], [timeout]}
 * https://github.com/ali-sdk/ali-oss#ossoptions
 */
module.exports = function (options) {
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
        client.put(name, chunk.path).then(function (val) {
          gutil.log(gutil.colors.green('[OK]'), val.name)
          manifest.push(val.name)
          fs.writeFileSync(manifestFile, JSON.stringify(manifest))
          cb(null, chunk)
        }).catch (function (err) {
          gutil.log(gutil.colors.red('[Err]'), err)
          cb(null, chunk)
        });
      }
    } else {
      cb(null, chunk)
    }
  })
}
