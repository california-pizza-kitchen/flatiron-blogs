function createBloggers(jsonBloggers) {
  var blogger;
  $.map(jsonBloggers, function(jsonBlogger, i) {
    blogger = new Blogger(jsonBlogger);
    $('#page-content-wrapper').append(HandlebarsTemplates['bloggers/blogger_show'](blogger));
  });
}