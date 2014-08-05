$(function() {

  // Of type defined in entry.js
  var entries = [],
      bloggers = [];

  $.get('http://flatiron-magazine-cpk.herokuapp.com/api/v0/entries', function(data) {
    createEntries(data);
  }, 'json');

  // $.get('http://flatiron-magazine-cpk.herokuapp.com/api/v0/bloggers', function(data) {
  //   createBloggers(data);
  // }, 'json');

  function createEntries(jsonEntries) {
    var entry;
    $.map(jsonEntries, function(jsonEntry, i) {
      entry = new Entry(jsonEntry);
      entries.push(entry);
      $('#page-content-wrapper').append(HandlebarsTemplates['entries/entry_show'](entry));
    });
  }

  function createBloggers(jsonBloggers) {
    var blogger;
    $.map(jsonBloggers, function(jsonBlogger, i) {
      blogger = new Blogger(jsonBlogger);
      $('#page-content-wrapper').append(HandlebarsTemplates['bloggers/blogger_show'](blogger));
    });
  }

});
