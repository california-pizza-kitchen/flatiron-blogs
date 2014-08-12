function SemestersController () {
  this.$pageContentWrapper = $('#page-content-wrapper');
  this.baseApiUrl = 'http://flatiron-magazine-cpk.herokuapp.com/api/v0/school_sessions?concise=true&limit=20';
}

SemestersController.prototype.fetchSemesters = function() {
  var that = this;
  $.get(this.baseApiUrl, function(data) {
    that.appendSemesters(data);
  }, 'json');
}

SemestersController.prototype.appendSemesters = function(jsonSemesters) {
  var that = this,
      semester;
  $.map(jsonSemesters, function(jsonSemester, i) {
    semester = new Semester(jsonSemester);
    that.$pageContentWrapper.append(HandlebarsTemplates['semesters/semesterShow'](semester));
  });
}