$(function() {

  var entriesController = new EntriesController();
  entriesController.initialize();

});

function EntriesController() {
  this.$pageContentWrapper = $('#page-content-wrapper');
  this.displayedEntries = 0;
  this.entriesToFetch = 5;
  this.threshold = 1000;
  this.baseApiUrl = 'http://flatiron-magazine-cpk.herokuapp.com/api/v0/entries?limit=' + this.entriesToFetch;
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
    that.addEntries(data);
  }, 'json');
}

EntriesController.prototype.addEntries = function(jsonEntries) {
  var that = this,
      entry;
  $.map(jsonEntries, function(jsonEntry, i) {
    entry = new Entry(jsonEntry);
    that.$pageContentWrapper.append(HandlebarsTemplates['entries/entry_show'](entry));
  });
  this.displayedEntries += jsonEntries.length;
  this.listenForScroll();
}

EntriesController.prototype.apiFetchUrl = function() {
  var url = this.baseApiUrl;
  if (this.displayedEntries > 0)  {
    url += '&offset=' + this.displayedEntries;
  }
  return url;
}