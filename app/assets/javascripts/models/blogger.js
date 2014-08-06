function Blogger(json) {
  this.name = json["name"];
  this.schoolSession = json["school_session"];
  this.numberOfEntries = json["number_of_entries"];
  this.blogUrl = json["blog_url"];
  this.magazineUrl = json["url"];
  this.lastPublishedAt = json["last_published_at"];
  this.jsonUrl = json["_self"];
  this.slug = json["slug"];
  if (json["entries"]) {
    this.entries = this.makeEntries(json["entries"]);
  }
}

Blogger.prototype.makeEntries = function(jsonEntries) {
  var entries = $.map(jsonEntries, function(jsonEntry, i) {
    return new Entry(jsonEntry);
  });
  return entries;
}