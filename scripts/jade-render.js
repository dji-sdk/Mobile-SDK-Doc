/* global hexo */
'use strict';

var jade = require('jade')

function jadeCompile(data) {
  var options = hexo.config.jade || {}
  options.filename = data.path
  return jade.compile(data.text, options)
}

function jadeRenderer(data, locals) {
  return jadeCompile(data)(locals)
}

jadeRenderer.compile = jadeCompile

hexo.extend.renderer.register('jade', 'html', jadeRenderer, true)