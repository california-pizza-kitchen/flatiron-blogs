function Blogger(json) {
  this.name = json["name"];
  this.numberOfEntries = json["number_of_entries"];
  this.feedUrl = json["feed_url"];
  this.schoolSession = json["school_session"];
  this.entries = json["entries"];
}

Blogger.prototype = {
  constructor: Blogger
}