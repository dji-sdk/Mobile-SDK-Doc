(function () {
  if (!$('.documentation-page').length) return false

  var sidebar = $('.documentation-page .site-sidebar')
  var sidebarInner = $('.site-sidebar .scrollable')
  var currentTitle = sidebarInner.find('a.active:first-child')
  var sidebarFooter = $('.site-footer')
  var sidebarNav = sidebar.find('.nav')
  // var sidebarSearch = sidebar.find('.doc-search')
  // var sidebarSearchH = sidebarSearch.height() + parseInt(sidebarSearch.css('padding-bottom'))
  var sidebarSearchH = 0
  var footer = $('.site-footer')
  var w = $(window)
  var body = $('body')
  var subnav = $('.sub-nav')
  var subToggle = sidebar.find('.sub-toggle')
  var fixToggleDistance = $('.sub-nav').data('offset-top')
  var titles = sidebar.find('dl > dd > a')
  // var toc = $('.site-main .toc')


  var initHashScroll = function () {
    // first time scroll
    var hash = window.location.hash.toLowerCase()
    if (!!hash) {
      window.location.hash = ''
      setTimeout(function () {
        window.history.pushState(null, null, hash)
        scrollTo($(hash))
      }, 1)
    }
  
    // click #hash to scroll
    $('a[href^="#"]').click(function (e) {
      e.preventDefault()
      var target = $(e.target)
      var hash = target.attr('href').toLowerCase()
      scrollTo($(hash), function() {
        window.history.pushState(null, null, hash)
      })
    })
  }

  var initSidebar = function () {
    // fix & resize sidbear
    window.addEventListener('scroll', function () {
      if (w.scrollTop() > 60) {
        sidebar.addClass('fixed')
      } else if (sidebar.hasClass('fixed')) {
        sidebar.removeClass('fixed')
      }
      resizeSidebar()
    }, false)
    window.addEventListener('resize', function () {
      resizeSidebar()
    }, false)
    resizeSidebar()
  }

  var initSubMenuClick = function () {
    // sub menu toggle click event
    titles.filter('.sub-toggle').on('click', function (e) {
      var target = $(this)
      if (target.hasClass('active')) {
        target.removeClass('active')
      } else {
        titles.find('.sub-toggle').removeClass('active')
        target.addClass('active')
      }
    })
  }

  // init sidebar scroll poistion to active title
  var initSidebarScroll = function () {
    if (currentTitle[0] == sidebarInner.find('a')[0]) return false;
    var top = sidebarInner.scrollTop() + currentTitle.position().top - sidebarInner.position().top
    setTimeout(function () {
      sidebarInner.scrollTop(top)
    }, 0)
  }

  // make .article table scrollable
  var initArticleTable = function () {
    var table = $('.article table').not('.highlight table')
    table.wrap('<div class="table-wrap"></div>')
  }

  // helpers
  var resizeSidebar = function() {
    var marginB = 40
    var winScroll = w.scrollTop()
    var newH = 0
    var winHeight = w.height()
    var docHeight = $('.documentation-page .site-main').height()
    var footerArise = winHeight - (sidebarFooter.position().top - winScroll)
    if (document.documentElement.scrollHeight < document.documentElement.clientHeight) {
      newH = $('body').height() - sidebarNav.position.top - marginB
    } else {
      if (sidebar.hasClass('fixed')) {
        newH = winHeight - sidebarNav.position().top - sidebar.position().top - marginB
      } else {
        newH = winHeight - sidebarNav.position().top + winScroll - marginB
      }
      if (footerArise >= 0) {
        newH -= footerArise
      }
    }
    sidebarNav.css({
      height: newH
    })
  }

  var scrollTo = function (target, cb) {
    cb = cb || function() {}
    $('html, body').stop().animate({scrollTop: Math.ceil($(target).position().top - 50)}, cb);
  }


  sidebarNav.css({ height: 0 })
  initHashScroll()
  initSidebar()
  initSidebarScroll()
  initArticleTable()
})();
