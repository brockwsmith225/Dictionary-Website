let NUMBER_OF_ANSWERS = 4;

let answer = "";
let correct = 0;
let total = 0;

$(function() {
	$("#percent").html(0.0);
	$("#correct").html(0);
	$("#total").html(0);
	new_question();
});

function new_question() {
	$("input[name=term]").val("");
	$.getJSON("data/dictionary.json", function(dictionary) {
		var ids = [];
		for (var id in dictionary) {
			ids.push(id);
		}
		var entry = dictionary[ids[Math.floor(Math.random() * ids.length)]];
		while (entry.term.includes("\\")) entry = dictionary[ids[Math.floor(Math.random() * ids.length)]];
		answer = entry.term;
		$("#question").html(entry.definition[Math.floor(Math.random() * entry.definition.length)]);
	});
	latexerize();
}

$("#submit").click(function() {submit();});
$("input[name=term]").keypress(function(event) {
	if (event.keyCode && event.keyCode == '13') submit();
});

function submit() {
	var selection = $("input[name=term]").val();
	if (selection.length > 0) {
		if (selection.toLowerCase() == answer.toLowerCase()) {
			correct++;
		}
		total++;
		update_score();
		new_question();
	}
}

function update_score() {
	$("#percent").html(Math.round(correct / total * 100, 1));
	$("#correct").html(correct);
	$("#total").html(total);
}
