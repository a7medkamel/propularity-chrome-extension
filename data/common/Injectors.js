(function (WL) {

  var addString = 'Add to Wunderlist';
  var buttonId = 'addToWunderlistButton';

  function gmailQuickAdd () {

    // these classes may change, not sure how long they last on gmail
    var $mainContainer = $('#\\:ro');
    var $validChild = $mainContainer.children('div:visible');
    var $headerButtons = $validChild.find('.G-Ni');
    var $targetContainer = $($headerButtons.get(3));

    var $clone = $targetContainer.contents().clone();

    $clone.empty().addClass('gmail')
      .attr('id', buttonId)
      .attr('data-tooltip', addString)
      .attr('aria-label', addString)
      .attr('aria-haspopup', 'false')
      .text('Wunderlist');

    var $span = $('<span/>').addClass('wunderlist-icon');
    $clone.prepend($span);

    $targetContainer.append($clone);

    $('#' + buttonId).on('click', function () {

      var data = {};

      data.config = WL.config;
      data.title = window.title;
      WL.showOverlay(data);
    });
  }

  function outlookQuickAdd () {

    var $cloneTarget = $('#Archive').parent();
    var $clone = $cloneTarget.clone();

    $clone.find('a').addClass('outlook')
      .attr('id', buttonId)
      .attr('title', addString)
      .attr('aid', 'wunderlist')
      .text('Wunderlist');

    var $span = $('<span/>').addClass('wunderlist-icon');
    $clone.find('a').prepend($span);

    $cloneTarget.before($clone);

    $('#' + buttonId).on('click', function () {

      var data = {};

      data.config = WL.config;
      data.title = $('.ReadMsgSubject').text();
      data.note = $('.ReadMsgBody').text();
      WL.showOverlay(data);
    });
  }

  function yahooQuickAdd () {

    var $cloneTarget = $('.btn-spam:visible');
    var $clone = $cloneTarget.clone().attr('id', 'wunderlist-container')
      .removeClass('btn-spam');

    $clone.find('a').attr('id', buttonId)
      .addClass('yahoo')
      .attr('title', addString)
      .attr('data-action', '')
      .text('Wunderlist');

    $('.btn-msg-actions:visible').after($clone);

    $('#' + buttonId).on('click', function () {

      var data = {};

      data.config = WL.config;
      data.title = $('.info > h3').text();
      data.note = $('.msg-body.inner').text();
      WL.showOverlay(data);
    });
  }

  function amazonQuickAdd () {

    var $targetContainer = $('.buyingDetailsGrid');
    var $button = $('<div/>').addClass('amazon')
      .attr('id', buttonId)
      .text(addString);

    var $icon = $('<span/>').addClass('wunderlist-icon');

    $button.prepend($icon);

    $targetContainer.prepend($button);

    $('#' + buttonId).on('click', function (ev) {

      ev.stopPropagation();
      ev.preventDefault();

      var data = {};

      data.config = WL.config;
      data.title = $('meta[name="title"]').text();
      data.note = $('link[rel="canonical"]').text();
      data.specialList = 'wishlist';
      WL.showOverlay(data);
      return false;
    }).on('submit', function () {

      return false;
    });
  }

  function imdbQuickAdd () {

    var $targetContainer = $('#img_primary');
    var $button = $('<div/>').addClass('imdb btn2 large primary')
      .attr('id', buttonId)
      .text(addString);

    var $icon = $('<span/>').addClass('wunderlist-icon');

    $button.prepend($icon);

    $targetContainer.append($button);

    $('#' + buttonId).on('click', function (ev) {

      ev.stopPropagation();
      ev.preventDefault();

      var data = {};
      data.config = WL.config;

      var stars = $.trim($('.star-box-giga-star').text());
      stars = stars.length ? ' [' + stars + ']' : '';

      data.title = $('h1 .itemprop').text() + stars;
      data.note = $('link[rel="canonical"]').attr('href') + "\n\n" + $.trim($('p[itemprop="description"]').text());
      data.specialList = 'movies';

      WL.showOverlay(data);
      return false;
    }).on('submit', function () {

      return false;
    });
  }

  function injectQuickAddLink () {

    var host = window.location.hostname;
    var hash = window.location.hash;
    var search = window.location.search;

    var $button = $('#' + buttonId);
    if ($button.length) {

      $button.remove();
    }

    if (/mail\.google\.com/.test(host) && hash.split('/')[1]) {

      gmailQuickAdd();
    }
    else if (/mail\.live\.com/.test(host) && (/&mid=/.test(hash) || /&mid=/.test(search))) {

      outlookQuickAdd();
    }
    else if (/mail\.yahoo\.com/.test(host)) {

      yahooQuickAdd();
    }
    else if (/amazon\./.test(host)) {

      amazonQuickAdd();
    }
    else if (/imdb\./.test(host)) {

      imdbQuickAdd();
    }
  }

  var lastLocation = window.location.hostname + window.location.search + window.location.hash;
  function checkLocation () {

    var host = window.location.hostname;
    var hash = window.location.hash;
    var search = window.location.search;

    if (lastLocation !== host + search + hash) {

      lastLocation = host + search + hash;
      injectQuickAddLink();
    }
  }

  $(function () {

    var timeout = 100;
    var host = window.location.hostname;

    if (/mail\.google\.com/.test(host)) {

      timeout = 5000;
    }

    // takes a while for the dom to be really ready on gmail
    window.setTimeout(injectQuickAddLink, timeout);
    // simulate onhashchange for websites that are messing with pushstate and history
    window.setTimeout(function () {

      window.setInterval(checkLocation, 100);
    }, timeout);
  });

})(window.WL);