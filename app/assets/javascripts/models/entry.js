function Entry(json) {
  this.title = json["title"];
  this.blogUrl = json["blog_url"];
  this.magazineUrl = json["url"];
  this.jsonUrl = json["_self"];
  this.schoolSession = json["school_session"];
  this.blogger = json["blogger"];
  this.content = json["content"];
  this.tags = json["tags"];
}

Entry.prototype = {
  constructor: Entry
}