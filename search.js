'use strict'

const yaml = require('js-yaml')
const glob = require('glob')
const fs = require('fs')
const path = require('path')
const mm = require('marky-mark')
const request = require('request')
const crypto = require('crypto')

const options = yaml.safeLoad(fs.readFileSync( path.join(__dirname, '_config.yml'), 'utf8'))
const posts = getAllPosts()
uploadPosts(posts)

// helpers
function getAllPosts () {
  const sourceDir = path.join(__dirname, 'source')
  const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'))
  const langs = config['language']
  const files = glob.sync(path.join(sourceDir, '**/*.md'))
  let posts = []
  files.map(function (file) {
    let lang = 'en'
    langs.map(function (_lang) {
      if (file.match(path.join(sourceDir, _lang))) {
        lang = _lang
      }
    })
    let post = mm.parseFileSync(file)
    post.locale = lang
    post.url = path.join('/', path.relative(sourceDir, file).replace(/\.md$/, '.html'))
    delete post.yaml
    delete post.markdown
    delete post.filenameExtension
    delete post.filename
    posts.push(post)
  })
  return posts
}

function uploadPosts (posts) {
  posts.map(function (post) {
    let time = new Date().getTime().toString()
    let signature = genKey(time)
    request({
      url: 'http://api-developer.dbeta.me/api/documents',
      method: 'POST',
      json: {
        time: time,
        signature: signature,
        document: post
      }
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('DONE', post.url)
      } else {
        console.log('ERROR', error, post.url)
      }
    })
  })
}

function genKey (time) {
  let key = 'AaUt0is3dIvfBuFczYCg2OH0A7kznMC'
  return crypto.createHash('md5').update(time + key).digest('hex')
}