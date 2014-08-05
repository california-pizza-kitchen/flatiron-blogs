function Blogger(json) {
  this.name = json["name"];
  this.schoolSession = json["school_session"];
  this.numberOfEntries = json["number_of_entries"];
  this.blogUrl = json["blog_url"];
  this.magazineUrl = json["url"];
  this.jsonUrl = json["_self"];
  this.entries = this.makeEntries(json["entries"]);
  this.lastPublishedAt = json["last_published_at"];
}

Blogger.prototype.makeEntries = function(jsonEntries) {
  var entries = $.map(jsonEntries, function(jsonEntry, i) {
    return new Entry(jsonEntry);
  });
  return entries;
}