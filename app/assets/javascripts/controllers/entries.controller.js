function EntriesController() {
  this.$pageContentWrapper = $('#page-content-wrapper');
  this.displayedEntries = 0;
  this.entriesToFetch = 5;
  this.displayedSidebarEntries = 0;
  this.sidebarEntriesToFetch = 25;
  this.threshold = 1000;
  this.baseApiUrl = 'http://flatiron-magazine-cpk.herokuapp.com/api/v0/entries';
  this.$sidebar = $(".sidebar-nav");
  this.arrayOfSlugs = [];
  this.scrollEnabled = true;
}

EntriesController.prototype.initialize = function() {
  this.fetchSidebarEntries();
}

EntriesController.prototype.resetEntries = function() {
  this.displayedEntries = 0;
}

EntriesController.prototype.fetchEntries = function() {
  var that = this;
  $.get(this.fetchNextEntriesApiUrl(), function(data) {
    that.appendEntries(data);
  }, 'json');
}

EntriesController.prototype.fetchEntry = function(slug) {
  var that = this;
  $.get(this.baseApiUrl + '/' + slug, function(data) {
    that.appendEntry(data);
  });
}

EntriesController.prototype.appendEntries = function(jsonEntries) {
  var that = this;
  $.map(jsonEntries, function(jsonEntry, i) {
    that.appendEntry(jsonEntry);
  });
  // Re-enable scroll listening
  this.enableScroll();
}

EntriesController.prototype.appendEntry = function(jsonEntry) {
  var entry = new Entry(jsonEntry);
  this.$pageContentWrapper.append(HandlebarsTemplates['entries/entry_show'](entry));
  this.displayedEntries++;
}

EntriesController.prototype.fetchNextEntriesApiUrl = function() {
  var url = this.baseApiUrl + '?limit=' + this.entriesToFetch;
  if (this.displayedEntries > 0)  {
    url += '&offset=' + this.displayedEntries;
  }
  return url;
}

EntriesController.prototype.fetchSidebarEntries = function() {
  var that = this;
  $.get(this.fetchNextSidebarEntriesApiUrl(), function(data) {
    that.appendSidebarEntries(data);
  });
}

EntriesController.prototype.appendSidebarEntries = function(jsonEntries) {
  var that = this,
      entry;
  $.map(jsonEntries, function(jsonEntry, i) {
    entry = new Entry(jsonEntry);
    that.$sidebar.append(HandlebarsTemplates['entries/sidebar_entry'](entry));
    that.arrayOfSlugs.push(entry.slug);
    that.displayedSidebarEntries++;
  });
}

EntriesController.prototype.fetchNextSidebarEntriesApiUrl = function() {
  var url = this.baseApiUrl + '?concise=true&limit=' + this.sidebarEntriesToFetch;
  if (this.displayedSidebarEntries > 0)  {
    url += '&offset=' + this.displayedSidebarEntries;
  }
  return url;
}

EntriesController.prototype.listenForScroll = function() {
  var that = this,
      distanceFromBottom;
  $(window).scroll(function() {
    distanceFromBottom = that.$pageContentWrapper.height() - window.pageYOffset;
    if (distanceFromBottom < that.threshold) {
      // Disable scroll listening for the duration of fetching and appending new data
      that.disableScroll();
      that.fetchEntries();
    }
  });
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
        $( "a[href='" + slug + "']" ).addClass( "nav-active" );
      } else {
        $( "a[href='" + slug + "']" ).removeClass( "nav-active" );
      }
    }

    if ( $windowPos + $windowHeight === $documentHeight ) {
      if ( !$( ".sidebar-nav li:last-child a" ).hasClass( "nav-active" ) ) {
        var $highlightedSlug = $( ".nav-active" ).attr( "href" );
        $( "a[href='" + $highlightedSlug + "']" ).removeClass( "nav-active" );
        $( ".sidebar-nav li:last-child a" ).addClass( "nav-active" );
      }
    }
  });
}

EntriesController.prototype.enableScroll = function() {
  this.listenForScroll();
  this.selectLinkBeingRead();
}

EntriesController.prototype.disableScroll = function() {
  $(window).off('scroll');
}
