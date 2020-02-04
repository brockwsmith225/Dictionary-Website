function display_entry(term_id) {
	$.getJSON("data/dictionary.json", function(dictionary) {
		var entry = dictionary[term_id];
		$("#page-content").append('<div id="' + term_id + '" class=\"entry\">'
			+ '<h1 class="term">' + entry.term + '</h1>'
			+ '<h2 class="part-of-speech">' + entry.part_of_speech + '.</h2>'
			+ '<h2 class="pronunciation">/ ' + entry.pronunciation + ' /</h2>'
			+ '<ol class="definitions"></ol></div>');
		for (var i = 0; i < entry.definition.length; i++) {
			$("#" + term_id + " .definitions").html($("#" + term_id + " .definitions").html() + "<li class=\"definition\">" + entry.definition[i] + "<span class=\"source\"><a href=\"?author=" + entry.author[i] + "\">" + entry.author[i] + "</a> / <a href=\"?school=" + entry.school[i] + "\">" + entry.school[i] + "</a></span></li>")
		}
		$(".math-jax").remove();
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.className = "math-jax"
		script.src = "vendor/mathjax/es5/tex-mml-chtml.js";   // use the location of your MathJax

		var config = 'MathJax.Hub.Config({' +
		           	'extensions: ["tex2jax.js"],' +
        			'jax: ["input/TeX", "output/HTML-CSS"],' +
        			'tex2jax: {' +
            			'inlineMath: [ ["$","$""], ["\\(","\\)"] ],' +
            			'displayMath: [ ["$$","$$""], ["\\[","\\]"] ],' +
        			'},' + 
        			'"HTML-CSS": { availableFonts: ["TeX"] }' +
		           	'});' +
		           	'MathJax.Hub.Startup.onload();';

		if (window.opera) {script.innerHTML = config}
		           else {script.text = config}

		document.getElementsByTagName("head")[0].appendChild(script);
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
		var entries = [];
		for (var id in dictionary) {
			var entry = dictionary[id];
			if (entries.length == 0) {
				entries.push(id);
			} else if (entry.timestamp >= dictionary[entries[entries.length-1]].timestamp) {
				if (entries.length < n) {
					entries.push(id);
				} else if (entry.timestamp > dictionary[entries[entries.length-1]].timestamp) {
					for (var i = 0; i < n; i++) {
						if (entry.timestamp > dictionary[entries[i]].timestamp) {
							entries.splice(i, 0, id);
							i = n;
						}
					}
					entries.pop();
				}
			}
		}
		var entries_added = 0;
		for (var entry in entries) {
			if (MAX_ENTRIES == -1 || entries_added < MAX_ENTRIES) {
				display_entry(entries[entry]);
				entries_added++;
			}
		}
	});
}

function display_entries_with_author(author) {
	$.getJSON("data/dictionary.json", function(dictionary) {
		$("#page-content").append("<h1 class=\"search-term\">\"" + author + "\"</h1>");
		var entries = [];
		for (var id in dictionary) {
			var entry = dictionary[id];
			if (entry.author == author) {
				var entry_added = false;
				for (var i = 0; i < entries.length; i++) {
					if (entry.timestamp > dictionary[entries[i]].timestamp) {
						entries.splice(i, 0, id);
						i = entries.length;
						entry_added = true;
					}
				}
				if (!entry_added) {
					entries.push(id);
				}
			}
		}
		var entries_added = 0;
		for (var entry in entries) {
			if (MAX_ENTRIES == -1 || entries_added < MAX_ENTRIES) {
				display_entry(entries[entry]);
				entries_added++;
			}
		}
	});
}

function display_entries_with_school(school) {
	$.getJSON("data/dictionary.json", function(dictionary) {
		$("#page-content").append("<h1 class=\"search-term\">\"" + school + "\"</h1>");
		var entries = [];
		for (var id in dictionary) {
			var entry = dictionary[id];
			if (entry.school == school) {
				var entry_added = false;
				for (var i = 0; i < entries.length; i++) {
					if (entry.timestamp > dictionary[entries[i]].timestamp) {
						entries.splice(i, 0, id);
						i = entries.length;
						entry_added = true;
					}
				}
				if (!entry_added) {
					entries.push(id);
				}
			}
		}
		var entries_added = 0;
		for (var entry in entries) {
			if (MAX_ENTRIES == -1 || entries_added < MAX_ENTRIES) {
				display_entry(entries[entry]);
				entries_added++;
			}
		}
	});
}