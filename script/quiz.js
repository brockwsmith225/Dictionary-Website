let NUMBER_OF_ANSWERS = 4;

let answer = 0;
let correct = 0;
let total = 0;

$(function() {
	$("#percent").html(0.0);
	$("#correct").html(0);
	$("#total").html(0);
	new_question();
});

function new_question() {
	$.getJSON("data/dictionary.json", function(dictionary) {
		var ids = [];
		for (var id in dictionary) {
			ids.push(id);
		}
		var answers = [];
		var answer_terms = [];
		while (answers.length < NUMBER_OF_ANSWERS) {
			var ans = ids[Math.floor(Math.random() * ids.length)];
			while (answer_terms.includes(dictionary[ans].term)) ans = ids[Math.floor(Math.random() * ids.length)];
			answers.push(ans);
			answer_terms.push(dictionary[ans].term);
			$("#answer-" + answers.length).html(dictionary[ans].term);
		}
		answer = Math.ceil(Math.random() * 4);
		var entry = dictionary[answers[answer-1]];
		$("#question").html(entry.definition[Math.floor(Math.random() * entry.definition.length)]);
	});
	latexerize();
}

$("#submit").click(function() {
	var selection = $("input[name=answers]:checked").val();
	$("input[name=answers]:checked").prop("checked", false);
	if (selection == answer) {
		correct++;
	}
	total++;
	update_score();
	new_question();
});

function update_score() {
	$("#percent").html(Math.round(correct / total * 100, 1));
	$("#correct").html(correct);
	$("#total").html(total);
}
