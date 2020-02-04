// Set to -1 for limitless entries
let MAX_ENTRIES = -1;

let SEARCH_BY_TERM = true;
let SEARCH_BY_AUTHOR = false;
let SEARCH_BY_SCHOOL = false;

function search(query) {
	if (query != "") {
		query = query.toLowerCase();
		$.getJSON("data/dictionary.json", function(dictionary) {
			$("#page-content").prepend("<h1 class=\"search-term\">\"" + query + "\"</h1>");
			var terms = [];
			var authors = [];
			var schools = [];
			for (var id in dictionary) {
				var entry = dictionary[id];
				console.log(entry.term);
				var author_found = false;
				var school_found = false;
				for (var i = 0; i < entry.definition.length; i++) {
					if (entry.author[i].toLowerCase().includes(query)) {
						author_found = true;
					}
					if (entry.school[i].toLowerCase().includes(query)) {
						school_found = true;
					}
				}
				if (SEARCH_BY_TERM && entry.term.toLowerCase().includes(query)) {
					var inclusion = calc_inclusion(query, entry.term.toLowerCase());
					var entry_added = false;
					for (var i = 0; i < terms.length; i++) {
						var other_inclusion = calc_inclusion(query, dictionary[terms[i]].term.toLowerCase());
						if (inclusion > other_inclusion || (entry.timestamp > dictionary[terms[i]].timestamp && inclusion >= other_inclusion)) {
							terms.splice(i, 0, id);
							i = terms.length;
							entry_added = true;
						}
					}
					if (!entry_added) {
						terms.push(id);
					}
				} else if (SEARCH_BY_AUTHOR && author_found) {
					var entry_added = false;
					for (var i = 0; i < authors.length; i++) {
						if (entry.timestamp > dictionary[schools[i]].timestamp) {
							authors.splice(i, 0, id);
							i = authors.length;
							entry_added = true;
						}
					}
					if (!entry_added) {
						authors.push(id);
					}
				} else if (SEARCH_BY_SCHOOL && school_found) {
					var entry_added = false;
					for (var i = 0; i < schools.length; i++) {
						if (entry.timestamp > dictionary[schools[i]].timestamp) {
							schools.splice(i, 0, id);
							i = schools.length;
							entry_added = true;
						}
					}
					if (!entry_added) {
						schools.push(id);
					}
				}
			}
			var entries_added = 0;
			for (var entry in terms) {
				if (MAX_ENTRIES == -1 || entries_added < MAX_ENTRIES) {
					display_entry(terms[entry]);
					entries_added++;
				}
			}
			for (var entry in authors) {
				if (MAX_ENTRIES == -1 || entries_added < MAX_ENTRIES) {
					display_entry(authors[entry]);
					entries_added++;
				}
			}
			for (var entry in schools) {
				if (MAX_ENTRIES == -1 || entries_added < MAX_ENTRIES) {
					display_entry(schools[entry]);
					entries_added++;
				}
			}
		});
	}
}

function calc_inclusion(query, text) {
	var inclusion = 0;
	var textLength = text.length;
	while (text.includes(query)) {
		text = text.substring(text.indexOf(query) + query.length);
		console.log(text);
		inclusion += query.length;
	}
	return inclusion / textLength;
}