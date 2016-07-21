'use strict'

const yaml = require('js-yaml')
const glob = require('glob')
const fs = require('fs')
const path = require('path')
const mm = require('marky-mark')
const request = require('request')
const crypto = require('crypto');


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
    delete post.yaml
    delete post.markdown
    delete post.filenameExtension
    delete post.filename
    posts.push(post)
    // posts[lang] = posts[lang] || []
    // posts[lang].push(post)
  })
  return posts
}

function uploadPosts(posts) {
  // console.log(posts[0])
  // let content = ''
  // posts.map(function (post, conent) {
  let key = 'AaUt0is3dIvfBuFczYCg2OH0A7kznMC'
  let time = (new Date()).getTime()
  let signature = crypto.createHash('md5').update(time + key).digest('hex')
  posts.map(function (post) {
    
  })
  // fs.writeFileSync('./test.txt', content, 'utf8')

}