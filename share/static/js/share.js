$(function() {

    // Sliding 'more' actions
    $('.share-bar a.more').click(function() {
      if ($("ul.share-bar-more").hasClass('closed')) {
        $('ul.share-bar-more').removeClass('closed');
        $('ul.share-bar-more').addClass('open');
        $('.share-bar').animate({
          "width": "100%"
        }), 2000;
      } else {
        $('ul.share-bar-more').removeClass('open');
        $('ul.share-bar-more').addClass('closed');
        $('.share-bar').animate({
          "width": "340px"
        }), 2000;
      }
    });

});

(function($) {

  // Share plugin
  $.fn.share = function(options) {
    var container;
    var opts = $.extend({}, $.fn.share.defaults, options);
    var loaded = new Array();
    var url = document.location;
    var url_override = false;
    if (opts.url !== undefined) {
        url = opts.url;
        url_override = true;
    }

    return this.each(function() {

      // Twitter
      if(opts.provider == "twitter") {
        container = $(this).replaceWith('<a class="share-twitter-button button" href="https://twitter.com/share?url='+ url +'" target="_blank"></a>');
        if (!url_override) {
            $.getJSON('http://urls.api.twitter.com/1/urls/count.json?url='+url+'&callback=?', function(data) {
                container.append('<div class="share-twitter-count count">' + data.count + '</div>');
            });
        }
      }

      // Facebook
      if(opts.provider == "facebook") {
        container = $(this).replaceWith('<a class="share-facebook-button button" href="http://www.facebook.com/share.php?u='+ url +'" target="_blank"></a>');
        if (!url_override) {
        $.getJSON('http://graph.facebook.com/'+url, function(data) {
            container.append('<div class="share-facebook-count count">' + data.shares + '</div>');
        });
        }
      }

      // Pinterest
      if(opts.provider == "pinterest") {
        container = $(this).replaceWith('<a class="share-pinterest-button button" href="http://pinterest.com/pin/create/button/?url='+ url +'" target="_blank"></a>');
        $.getJSON('http://api.pinterest.com/v1/urls/count.json?callback=receiveCount&url=' + url, function(data) {
            container.append('<div class="share-pinterest-count count">' + data.shares + '</div>');
        });
      }

    });
  }

  $.fn.share.defaults = {}

})(jQuery);
