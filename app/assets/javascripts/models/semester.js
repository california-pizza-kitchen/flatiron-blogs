function Semester(json) {
  this.name = json["name"];
  this.slug = json["slug"];
  this.jsonUrl = json["_self"];
  this.bloggersCount = json["bloggers_count"];
  this.entriesCount = json["entries_count"];
  if (json["bloggers"]) {
    this.bloggers = this.makeBloggers(json["bloggers"]);
  }
  if (json["entries"]) {
    this.entries = this.makeEntries(json["entries"]);
  }
}

Semester.prototype.makeEntries = function(jsonEntries) {
  var entries = $.map(jsonEntries, function(jsonEntry, i) {
    return new Entry(jsonEntry);
  });
  return entries;
}

Semester.prototype.makeBloggers = function(jsonBloggers) {
  var bloggers = $.map(jsonBloggers, function(jsonBlogger, i) {
    return new Blogger(jsonBlogger);
  });
  return bloggers;
}