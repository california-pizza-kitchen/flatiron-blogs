function Tag(json) {
  this.tag = json["tag"];
  this.entriesCount = json["entries_count"];
  this.jsonUrl = json["_self"];
  if (json["entries"]) {
    this.entries = this.addEntries(json["entries"]);
  }
}

Tag.prototype.addEntries = function(jsonEntries) {
  var entries = $.map(jsonEntries, function(jsonEntry, i) {
    return new Entry(jsonEntry);
  });
  return entries;
}