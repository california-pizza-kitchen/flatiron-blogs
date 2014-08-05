function Entry(json) {
  this.title = json["title"];
  this.url = json["url"];
  this.content = json["content"];
  this.schoolSession = json["school_session"];
  this.tags = json["tags"];
  this.blogger = json["blogger"];
}

Entry.prototype = {
  constructor: Entry
}