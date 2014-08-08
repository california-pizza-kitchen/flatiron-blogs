function BloggersSidebarController () {
  // this.displayedEntries = 0;
  // this.entriesToFetch = 10;
  this.$sidebar = $(".sidebar-nav");
  this.baseApiUrl = 'http://flatiron-magazine-cpk.herokuapp.com/api/v0/school_sessions?concise=true';
  this.arrayOfSlugs = [];
}

BloggersSidebarController.prototype.initialize = function() {
  this.fetchEntries();
  this.selectEntryBeingRead();
  this.selectClickedEntry();
}

BloggersSidebarController.prototype.resetEntries = function() {
  // $("#page-content-wrapper").unbind('inview');
  this.$sidebar.find('a').removeClass('nav-active');
  this.$sidebar.find('li').remove();
  this.arrayOfSlugs = [];
  // this.displayedEntries = 0;
}

BloggersSidebarController.prototype.fetchEntries = function() {
  var that = this;
  $.get(this.baseApiUrl, function(data) {
    console.log(data);
    that.appendEntries(data);
  });
}

BloggersSidebarController.prototype.appendEntries = function(jsonEntries) {
  var that = this,
      entry;
  $.map(jsonEntries, function(jsonEntry, i) {
    entry = new Entry(jsonEntry);
    that.$sidebar.append(HandlebarsTemplates['bloggers/bloggers_sidebar'](entry));
    that.arrayOfSlugs.push(entry.slug);
    // that.displayedEntries++;
  });
}

// BloggersSidebarController.prototype.fetchNextEntriesApiUrl = function() {
//   // var url = this.baseApiUrl + '?concise=true&limit=' + this.entriesToFetch;
//   if (this.displayedEntries > 0)  {
//     url += '&offset=' + this.displayedEntries;
//   }
//   return url;
// }

BloggersSidebarController.prototype.selectEntryBeingRead = function() {
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

BloggersSidebarController.prototype.selectClickedEntry = function() {
  var that = this;
  this.$sidebar.on('click', 'a', function() {
    that.$sidebar.find( 'a' ).removeClass( 'nav-active' );
    $(this).addClass( 'nav-active' );
  });
}
