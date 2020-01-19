'use strict';

var url = require('url')

var host = process.env.HOST || ''

hexo.extend.helper.register('url', function(path) {
  var newPath = path || ''
  if (this.page.lang != 'en') {
    newPath = '/' + this.page.lang + '/' + path.replace(/^\//, '')
  }
  var newUrl = url.resolve(host, newPath)
  return newUrl
})

hexo.extend.helper.register('dev_forum_url', function(lang) {
  var lang = lang || this.page.lang
  var url = 'http://forum.dev.dji.com/'
  return url + lang
})

hexo.extend.helper.register('active_class', function(pagePath, itemPath) {
  var pagePath = pagePath || ''
  var itemPath = itemPath || ''
  return pagePath.replace(/^\/|\/$/, '') == itemPath.replace(/^\/|\/$/, '') ? 'active' : ''
})

hexo.extend.helper.register('active_sub_toggle', function(pagePath, items) {
  var pagePath = (pagePath || '').replace(/^\/|\/$/, '')
  for (var i = 0, length = items.length; i < length; i++) {
    if (pagePath == items[i].path.replace(/^\/|\/$/, '')) {
      return 'active'
    }
  }
  return ''
})

hexo.extend.helper.register('date_format', function(date) {
  return new Date(date).toISOString().slice(0, 10)
})
