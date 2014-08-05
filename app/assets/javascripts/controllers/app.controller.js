$(function() {

  // Of type defined in entry.js
  var entries = [],
      bloggers = [];

  // $.get('http://flatiron-magazine-cpk.herokuapp.com/api/v0/entries', function(data) {
  //   createEntries(data);
  // }, 'json');

  $.get('http://flatiron-magazine-cpk.herokuapp.com/api/v0/bloggers', function(data) {
    createBloggers(data);
  }, 'json');

  function createEntries(jsonEntries) {
    $.map(jsonEntries, function(jsonEntry, i) {
      entries.push(new Entry(jsonEntry));
    });
  }

  function createBloggers(jsonBloggers) {
    $.map(jsonBloggers, function(jsonBlogger, i) {
      var blogger = new Blogger(jsonBlogger);
      $('body').append(HandlebarsTemplates['bloggers/blogger_show'](blogger));
    });
  }

});
