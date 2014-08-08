function BloggersController() {
  this.$pageContentWrapper = $('#page-content-wrapper');
  this.baseApiUrl = 'http://flatiron-magazine-cpk.herokuapp.com/api/v0/school_sessions?bloggers=true';
}

BloggersController.prototype.fetchSemesters = function() {
  var that = this;
  $.get(this.baseApiUrl, function(data) {
    that.appendSemesters(data);
  }, 'json');
}

BloggersController.prototype.appendSemesters = function(jsonSemesters) {
  var that = this,
      semester;
  $.map(jsonSemesters, function(jsonSemester, i) {
    semester = new Semester(jsonSemester);
    that.$pageContentWrapper.append(HandlebarsTemplates['bloggers/blogroll'](semester));
  });
}