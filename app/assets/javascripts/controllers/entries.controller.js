function EntriesController() {
  this.$pageContentWrapper = $('#page-content-wrapper');
  this.displayedEntries = 0;
  this.entriesToFetch = 5;
  this.threshold = 1000;
  this.baseApiUrl = 'http://flatiron-magazine-cpk.herokuapp.com/api/v0/entries';
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
  this.listenForScroll();
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

EntriesController.prototype.listenForScroll = function() {
  var that = this,
      distanceFromBottom;
  $(window).scroll(throttle(function() {
    distanceFromBottom = that.$pageContentWrapper.height() - window.pageYOffset;
    if (distanceFromBottom < that.threshold) {
      // Disable scroll listening for the duration of fetching and appending new data
      $(this).off("scroll");
      that.fetchEntries();
    }
  }, 500));
}

EntriesController.prototype.disableScroll = function() {
  $(window).off('scroll');
}
