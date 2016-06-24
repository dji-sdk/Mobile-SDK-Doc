;new Vue({
  el: '#toc',
  data: {
    titles: [],
    paddingTop: 50
  },
  ready: function () {
    this.initToc()
    this.initScrollFollow()
  },
  methods: {
    initToc: function () {
      var self = this,
        titlesDom = document.querySelectorAll('.article h2')

      for (var i = 0, l = titlesDom.length; i < l; i++) {
        var item = titlesDom[i]
        this.titles.push({
          hash: '#' + item.getAttribute('id'),
          text: item.innerText,
          titleDom: item,
          active: false
        })
      }
    },
    initScrollFollow: function () {
      var self = this
      $(window).on('scroll', function () {
        for (var i = 0, length = self.titles.length; i < length; i++) {
          if (i == length - 1) {
            if ($(self.titles[i].titleDom).position().top - $(window).scrollTop() < self.paddingTop) {
              self.highlight(self.titles[i])
            }
          } else {
            if ($(self.titles[i].titleDom).position().top - $(window).scrollTop() <= self.paddingTop
              &&
              $(self.titles[i + 1].titleDom).position().top - $(window).scrollTop() > self.paddingTop) {
              self.highlight(self.titles[i])
            }
          }
        }
      })
    },
    jump: function (t, e) {
      e.preventDefault()
      this.scrollTo(t.titleDom, function () {
        window.history.pushState(null, null, t.hash)
      })
    },
    scrollTo: function (target, cb) {
      cb = cb || function() {}
      $('html, body').stop().animate({scrollTop: Math.ceil($(target).position().top - this.paddingTop)}, cb);
    },
    highlight: function (target) {
      if (!target.active) {
        for (var i = 0, length = this.titles.length; i < length; i++) {
          if (this.titles[i] == target) {
            this.titles[i].active = true
          } else {
            this.titles[i].active = false
          }
        }
      }
    }
  }
})