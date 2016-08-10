'use strict'
const yaml = require('js-yaml')
const glob = require('glob')
const fs = require('fs')
const path = require('path')
const htmlToText = require('html-to-text')
const mm = require('marky-mark')
const crypto = require('crypto')
const co = require('co')
const fetch = require('node-fetch')
const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'))
const host = 'http://10.81.15.72:3000/api/docsearch'

let clean = function* () {
  let sdk = config.sdk.replace('-sdk', '')
  let res = yield fetchJson(host + '/clean', {
    sdk: sdk
  })
  if (res.ok) {
    console.log(`CLEAN ${sdk} DOC DONE`)
  } else {
    console.log(res.status, res.statusText)
  }
}

let upload = function* () {
  let posts = getAllPosts()
  let resArr = yield posts.map(function (post) {
    return fetchJson(host + '/documents', {
      document: post
    })
  })
  console.log('UPLOAD DONE (', resArr.length, 'Posts )')
}

let rebuild = function* () {
  let res = yield fetchJson(host + '/rebuild')
  if (res.ok) {
    console.log(`REBUILD DONE`)
  } else {
    console.log(res.status, res.statusText)
  }
}

// helpers
function getAllPosts () {
  let sourceDir = path.join(__dirname, 'source')
  let langs = config['language']
  let sdk = config['sdk'].replace('-sdk', '')
  let files = glob.sync(path.join(sourceDir, '**/*.md'))
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
    post.meta.sdk = sdk
    post.content = htmlToText.fromString(post.content)
    delete post.yaml
    delete post.markdown
    delete post.filenameExtension
    delete post.filename
    posts.push(post)
  })
  return posts
}

function genKey (time) {
  let key = 'AaUt0is3dIvfBuFczYCg2OH0A7kznMC'
  return crypto.createHash('md5').update(time + key).digest('hex')
}

function fetchJson (url, data) {
  let time = new Date().getTime().toString()
  let signature = genKey(time)
  let json = {
    time: time,
    signature: signature
  }
  for (let k in data) {
    json[k] = data[k]
  }
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
}

// run
co(clean)
  .then(() => co(upload))
  .then(() => co(rebuild))
