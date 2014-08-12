function EntriesController() {
  this.$pageContentWrapper = $('#page-content-wrapper');
  this.entriesToFetch = 4;
  this.threshold = 1000;
  this.baseApiUrl = 'http://flatiron-magazine-cpk.herokuapp.com/api/v0/entries';
  this.fetchedEntries = 0;
  this.displayedEntries = 0;
  this.viewedEntries = [];
}

EntriesController.prototype.resetEntries = function() {
  this.fetchedEntries = 0;
  this.displayedEntries = 0;
  this.viewedEntries = [];
}

EntriesController.prototype.fetchEntries = function() {
  var that = this;
  $.get(this.fetchNextEntriesApiUrl(), function(data) {
    that.appendEntries(data);
    that.showNextEntry();
  }, 'json');
}

EntriesController.prototype.fetchEntry = function(slug) {
  var that = this;
  $.get(this.baseApiUrl + '/' + slug, function(data) {
    that.appendEntry(data);
    that.showNextEntry();
  });
}

EntriesController.prototype.appendEntries = function(jsonEntries) {
  var that = this;
  $.map(jsonEntries, function(jsonEntry, i) {
    that.appendEntry(jsonEntry);
  });
  // Re-enable scroll listening
  this.listenForScroll();
}

EntriesController.prototype.appendEntry = function(jsonEntry) {
  var entry = new Entry(jsonEntry),
      htmlEntry = HandlebarsTemplates['entries/entryShow'](entry);
  if (entry.slug !== "premature-ajaxulation") {
    this.$pageContentWrapper.append($(htmlEntry).hide());
    this.fetchedEntries++;
  }
}

EntriesController.prototype.showNextEntry = function() {
  this.$pageContentWrapper.find('div.entry:hidden:first').show();
  this.displayedEntries++;
}

EntriesController.prototype.fetchNextEntriesApiUrl = function() {
  var url = this.baseApiUrl + '?limit=' + this.entriesToFetch;
  if (this.displayedEntries > 0)  {
    url += '&offset=' + this.displayedEntries;
  }
  return url;
}

EntriesController.prototype.listenForScroll = function() {
  var that = this,
      distanceFromBottom;
  this.$pageContentWrapper.on('inview', 'div.entry', throttle(function(e, isInView, inViewX, inViewY) {
    if (isInView && inViewY === "bottom") {
      var $entry = $(this),
          entryId = $entry.attr('id');
      if (that.viewedEntries.indexOf(entryId) < 0) { // Entry has not yet been viewed
        if (that.displayedEntries < that.fetchedEntries) {
          that.showNextEntry();
        } else {
          that.disableScroll(); // Disable scroll listening until DOM modification is done
          that.viewedEntries.push(entryId);
          that.fetchEntries();
        }
      }

      history.pushState(null, null, "/" + entryId);
      sidebarController.highlight(entryId);
    }
  }, 200));
}

EntriesController.prototype.disableScroll = function() {
  this.$pageContentWrapper.off('inview');
}
