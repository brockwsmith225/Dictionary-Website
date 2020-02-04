$(function() {
	var params = new URLSearchParams(window.location.search);
	if (params.has("query")) {
		$("#query").val(params.get("query"));
		search(params.get("query"));
	} else if (params.has("term")) {
		display_entry(params.get("term"));
	} else if (params.has("author")) {
		display_entries_with_author(params.get("author"));
	} else if (params.has("school")) {
		display_entries_with_school(params.get("school"));
	} else {
		//display_recent_entries(5);
		display_random_entry();
	}
});
