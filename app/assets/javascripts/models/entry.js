function Entry(json) {
  this.title = json["title"];
  this.blogUrl = json["blog_url"];
  this.magazineUrl = json["url"];
  this.schoolSession = json["school_session"];
  this.publishedDate = new Date(json["published_date"]);
  this.content = json["content"];
  this.jsonUrl = json["_self"];
  this.slug = json["slug"];
  if (json["name"]) {
    this.name = json["name"];
  }
  if (json["blogger"]) {
    this.blogger = new Blogger(json["blogger"]);
  }
  if (json["tags"]) {
    this.tags = this.addTags(json["tags"]);
  }
}

Entry.prototype.addTags = function(jsonTags) {
  var tags = $.map(jsonTags, function(jsonTag, i) {
    return new Tag(jsonTag);
  });
  return tags;
}

Entry.prototype.timeAgo = function() {
  return jQuery.timeago(this.publishedDate);
}
Entry.prototype.formattedDateTime = function() {
  var hours = this.publishedDate.getHours() % 12,
      minutes = this.publishedDate.getMinutes(),
      amPm = this.publishedDate.getHours() < 12 ? "AM" : "PM";
  hours = hours === 0 ? 12 : hours;
  return hours + ":" + minutes + " " + amPm + ", " + this.publishedDate.toLocaleDateString();
}