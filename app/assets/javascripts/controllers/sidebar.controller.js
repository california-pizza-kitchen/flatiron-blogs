function SidebarController () {
  this.displayedEntries = 0;
  this.entriesToFetch = 25;
  this.$sidebar = $(".sidebar-nav");
  this.baseApiUrl = 'http://flatiron-magazine-cpk.herokuapp.com/api/v0/entries';
  this.arrayOfSlugs = [];
}

SidebarController.prototype.initialize = function() {
  this.fetchEntries();
  this.selectClickedEntry();
}

SidebarController.prototype.resetEntries = function() {
  this.$sidebar.find('li').remove();
  this.arrayOfSlugs = [];
  this.displayedEntries = 0;
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
    that.$sidebar.append(HandlebarsTemplates['entries/entrySidebar'](entry));
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

SidebarController.prototype.highlight = function(id) {
  this.$sidebar.find('li a').removeClass('nav-active');
  this.$sidebar.find('li a[href="/' + id + '"]').addClass('nav-active');
}

SidebarController.prototype.selectClickedEntry = function() {
  var that = this;
  this.$sidebar.on('click', 'a', function() {
    that.$sidebar.find( 'li a' ).removeClass( 'nav-active' );
    $(this).addClass( 'nav-active' );
  });
}
