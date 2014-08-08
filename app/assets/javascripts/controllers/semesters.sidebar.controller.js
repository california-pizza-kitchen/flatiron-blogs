function SemestersSidebarController () {
  this.$sidebar = $(".sidebar-nav");
  this.baseApiUrl = 'http://flatiron-magazine-cpk.herokuapp.com/api/v0/school_sessions?concise=true';
  this.arrayOfSlugs = [];
}

SemestersSidebarController.prototype.initialize = function() {
  this.fetchEntries();
  this.selectEntryBeingRead();
  this.selectClickedEntry();
}

SemestersSidebarController.prototype.resetEntries = function() {
  this.$sidebar.find('a').removeClass('nav-active');
  this.$sidebar.find('li').remove();
  this.arrayOfSlugs = [];
}

SemestersSidebarController.prototype.fetchEntries = function() {
  var that = this;
  $.get(this.baseApiUrl, function(data) {
    that.appendEntries(data);
  });
}

SemestersSidebarController.prototype.appendEntries = function(jsonEntries) {
  var that = this,
      entry;
  $.map(jsonEntries, function(jsonEntry, i) {
    entry = new Entry(jsonEntry);
    that.$sidebar.append(HandlebarsTemplates['semesters/semester_sidebar'](entry));
    that.arrayOfSlugs.push(entry.slug);
  });
}

SemestersSidebarController.prototype.selectEntryBeingRead = function() {
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

SemestersSidebarController.prototype.selectClickedEntry = function() {
  var that = this;
  this.$sidebar.on('click', 'a', function() {
    that.$sidebar.find( 'a' ).removeClass( 'nav-active' );
    $(this).addClass( 'nav-active' );
  });
}
