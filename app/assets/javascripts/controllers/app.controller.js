$(function() {

  // Of type defined in entry.js
  var entries = [],
      bloggers = [];

  // $.get('http://flatiron-magazine-cpk.herokuapp.com/entries.json', function(data) {
  //   createEntries(data);
  // }, 'json');

  $.get('http://flatiron-magazine-cpk.herokuapp.com/bloggers.json', function(data) {
    createBloggers(data);
  }, 'json');

  function createEntries(jsonEntries) {
    $.map(jsonEntries, function(jsonEntry, i) {
      entries.push(new Entry(jsonEntry));
    });
  }

  function createBloggers(jsonBloggers) {
    $.map(jsonBloggers, function(jsonBlogger, i) {
      entries.push(new Blogger(jsonBlogger));
    });
  }

});
