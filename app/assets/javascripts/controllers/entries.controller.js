function EntriesController() {
  this.$pageContentWrapper = $('#page-content-wrapper');
  this.displayedEntries = 0;
  this.entriesToFetch = 5;
  this.threshold = 1000;
  this.baseApiUrl = 'http://flatiron-magazine-cpk.herokuapp.com/api/v0/entries?limit=' + this.entriesToFetch;
  this.$sidebar = $(".sidebar-nav");
  this.arrayOfSlugs = [];
  this.scrollEnabled = true;
}

EntriesController.prototype.initialize = function() {
  this.fetchEntries();
}

EntriesController.prototype.listenForScroll = function() {
  var that = this,
      distanceFromBottom;
  $(window).scroll(function() {
    distanceFromBottom = that.$pageContentWrapper.height() - window.pageYOffset;
    if (distanceFromBottom < that.threshold) {
      $(this).off('scroll');
      that.fetchEntries();
    }
  });
}

EntriesController.prototype.fetchEntries = function() {
  var that = this;
  $.get(this.apiFetchUrl(), function(data) {
    if (data instanceof Array) {
      that.appendEntries(data);
    } else if (data instanceof Object) {
      that.appendEntry(data);
    }
  }, 'json');
}

EntriesController.prototype.appendEntries = function(jsonEntries) {
  var that = this;
  $.map(jsonEntries, function(jsonEntry, i) {
    // console.log(jsonEntry);
    that.appendEntry(jsonEntry);
  });
  if (this.scrollEnabled) {
    this.listenForScroll();
    this.selectLinkBeingRead();
  }
}

EntriesController.prototype.appendEntry = function(jsonEntry) {
  var entry = new Entry(jsonEntry);
  this.$pageContentWrapper.append(HandlebarsTemplates['entries/entry_show'](entry));
  this.$sidebar.append(HandlebarsTemplates['entries/sidebar_entry'](entry));
  this.arrayOfSlugs.push(entry.slug);
  this.displayedEntries++;
}

EntriesController.prototype.apiFetchUrl = function() {
  var url = this.baseApiUrl;
  if (this.displayedEntries > 0)  {
    url += '&offset=' + this.displayedEntries;
  }
  return url;
}

EntriesController.prototype.selectLinkBeingRead = function() {
  var that = this;

  $( window ).scroll(function() {
    var $windowPos = $( window ).scrollTop(),
        $windowHeight = $( window ).height(),
        $documentHeight = $( document ).height();

    for ( var i = 0; i < that.arrayOfSlugs.length; i++ ) {
      var slug = that.arrayOfSlugs[i],
          $divPos = $( "#" + slug ).offset().top - 60,
          $divHeight = $( "#" + slug ).height();
      if ( $windowPos >= $divPos && $windowPos < ( $divPos + $divHeight ) ) {
        $( "a[href='#" + slug + "']" ).addClass( "nav-active" );
      } else {
        $( "a[href='#" + slug + "']" ).removeClass( "nav-active" );
      }
    }

    if ( $windowPos + $windowHeight === $documentHeight ) {
      if ( !$( ".sidebar-nav li:last-child a" ).hasClass( "nav-active" ) ) {
        var $highlightedSlug = $( ".nav-active" ).attr( "href" );
        $( "a[href='#" + $highlightedSlug + "']" ).removeClass( "nav-active" );
        $( ".sidebar-nav li:last-child a" ).addClass( "nav-active" );
      }
    }
  });
};
