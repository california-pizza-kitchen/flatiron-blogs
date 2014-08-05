function Blogger(json) {
  this.name = json["name"];
  this.schoolSession = json["school_session"];
  this.numberOfEntries = json["number_of_entries"];
  this.blogUrl = json["blog_url"];
  this.magazineUrl = json["url"];
  this.jsonUrl = json["_self"];
  this.entries = json["entries"];
}

Blogger.prototype = {
  constructor: Blogger
}