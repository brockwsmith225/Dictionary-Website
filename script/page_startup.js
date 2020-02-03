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