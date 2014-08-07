function SidebarController () {
  this.displayedEntries = 0;
  this.entriesToFetch = 25;
  this.$sidebar = $(".sidebar-nav");
  this.baseApiUrl = 'http://flatiron-magazine-cpk.herokuapp.com/api/v0/entries';
  this.arrayOfSlugs = [];
}

SidebarController.prototype.initialize = function() {
  this.fetchEntries();
  this.selectEntryBeingRead();
  this.selectClickedEntry();
}

SidebarController.prototype.reset = function() {

}

SidebarController.prototype.fetchEntries = function() {
  var that = this;
  $.get(this.fetchNextEntriesApiUrl(), function(data) {
    that.appendEntries(data);
  });
}

SidebarController.prototype.appendEntries = function(jsonEntries) {
  var that = this,
      entry;
  $.map(jsonEntries, function(jsonEntry, i) {
    entry = new Entry(jsonEntry);
    that.$sidebar.append(HandlebarsTemplates['entries/sidebar_entry'](entry));
    that.arrayOfSlugs.push(entry.slug);
    that.displayedEntries++;
  });
}

SidebarController.prototype.fetchNextEntriesApiUrl = function() {
  var url = this.baseApiUrl + '?concise=true&limit=' + this.entriesToFetch;
  if (this.displayedEntries > 0)  {
    url += '&offset=' + this.displayedEntries;
  }
  return url;
}

SidebarController.prototype.selectEntryBeingRead = function() {
  var sidebar = this.$sidebar,
      slug;
  $( '#page-content-wrapper' ).on('inview', 'div.entry', function(event, isInView) {
    if (isInView) {
      slug = $(this).attr('id');
      sidebar.find('a').removeClass('nav-active');
      sidebar.find('a[href="' + slug + '"]').addClass('nav-active');
    }
  });
}

SidebarController.prototype.selectClickedEntry = function() {
  var that = this;
  this.$sidebar.on('click', 'a', function() {
    that.$sidebar.find( 'a' ).removeClass( 'nav-active' );
    $(this).addClass( 'nav-active' );
  });
}
