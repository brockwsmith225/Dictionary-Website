$(function() {
	var params = new URLSearchParams(window.location.search);
	if (params.has("query")) {
		$("#query").val(params.get("query"));
		search(params.get("query"));
	} else if (params.has("term")) {
		display_entry(params.get("term"));
	} else {
		display_recent_entries(5);
	}
});

function search(query) {
	console.log(query);
}

function display_entry(term_id) {
	console.log(term_id);
	$.getJSON("data/dictionary.json", function(dictionary) {
		var entry = dictionary[term_id];
		$("body").append('<div id="' + term_id + '" class=\"entry\">'
			+ '<h1 class="term">' + entry.term + '</h1>'
			+ '<h2 class="part-of-speech">' + entry.part_of_speech + '.</h2>'
			+ '<h2 class="pronunciation">/ ' + entry.pronunciation + ' /</h2>'
			+ '<ol class="definitions"></ol></div>');
		for (var i = 0; i < entry.definition.length; i++) {
			$("#" + term_id + " .definitions").html($("#" + term_id + " .definitions").html() + "<li class=\"definition\">" + entry.definition[i] + "<span class=\"source\">" + entry.source_person[i] + " / " + entry.source_school[i] + "</span></li>")
		}
		$("#entry").show();
	});
}

function display_random_entry() {
	$.getJSON("data/dictionary.json", function(dictionary) {
		var ids = [];
		for (var id in dictionary) {
			ids.push(id);
		}
		display_entry(ids[Math.floor(Math.random() * ids.length)]);
	});
}

function display_recent_entries(n) {
	$.getJSON("data/dictionary.json", function(dictionary) {
		var most_recent_entries = [];
		for (var id in dictionary) {
			var entry = dictionary[id];
			if (most_recent_entries.length == 0) {
				most_recent_entries.push(id);
			} else if (entry.timestamp >= dictionary[most_recent_entries[most_recent_entries.length-1]].timestamp) {
				if (most_recent_entries.length < n) {
					most_recent_entries.push(id);
				} else if (entry.timestamp > dictionary[most_recent_entries[most_recent_entries.length-1]].timestamp) {
					for (var i = 0; i < n; i++) {
						if (entry.timestamp > dictionary[most_recent_entries[i]].timestamp) {
							most_recent_entries.splice(i, 0, id);
						}
					}
					most_recent_entries.pop();
				}
			}
		}
		console.log(most_recent_entries);
		for (var entry in most_recent_entries) {
			display_entry(most_recent_entries[entry]);
		}
	});
}