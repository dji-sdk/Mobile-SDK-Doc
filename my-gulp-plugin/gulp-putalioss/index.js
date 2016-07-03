var through2  = require('through2'),
    AliOSS    = require('ali-oss').Wrapper,
    path      = require('path'),
    fs        = require('fs'),
    gutil     = require('gulp-util')

var oss, manifest;

/**
 * @param {prefix, [manifestPath = `.tmp/${prefix}-mainfest.json`], accessKeyId, accessKeySecret, [bucket], [endpoint], [region], [internal], [timeout]}
 * https://github.com/ali-sdk/ali-oss#ossoptions
 */
module.exports = function (options) {
  var options = options || {},
      currentDir = process.cwd(),
      prefix = options.prefix || '',
      manifestPath = path.join(currentDir, options.manifestPath || '.tmp'),
      manifestFile = path.join(manifestPath, prefix + '-manifest.json'),
      client = new AliOSS(options)

  fs.existsSync(manifestPath) || fs.mkdirSync(manifestPath)
  manifest = JSON.parse(fs.readFileSync(manifestFile, {flag: 'a+'}).toString() || '[]')

  return through2.obj(function (chunk, enc, cb) {
    if (chunk.isBuffer()) {
      var name = path.join(prefix, chunk.path.split('/').pop())
      if (chunkExists(name)) {
        cb(null, chunk)
      } else {
        client.put(name, chunk.path).then(function (val) {
          console.log('OK: %j', val.name)
          manifest.push(val.name)
          fs.writeFileSync(manifestFile, JSON.stringify(manifest))
          cb(null, chunk)
        }).catch (function (err) {
          console.log('error: %j', err)
          cb(null, chunk)
        });
      }
    } else {
      cb(null, chunk)
    }
  })
}

function chunkExists (name) {
  return manifest.indexOf(name) > -1
}
