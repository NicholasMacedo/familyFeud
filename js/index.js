$(".card").flip({
  axis: 'x',
  speed: 300
});

var correctBuzzer = document.createElement('audio');
correctBuzzer.setAttribute('src', 'http://www.qwizx.com/gssfx/usa/ff-clang.wav');

var wrongBuzzer = document.createElement('audio');
wrongBuzzer.setAttribute('src', 'http://www.qwizx.com/gssfx/usa/ff-strike.wav');

var question = 'Types of Cars';
var numAnswers = 5
var answers = ['a', "b", "c", "d", "e"];
var scores = ["10","20","30","40","50"];
var strikes = 0;


$("#theQuestion").html("Question: " + question);
$("#families").html(sessionStorage.family1 + " vs " + sessionStorage.family2);

$("#familyScores").html(sessionStorage.family1 + ": " + sessionStorage.family1Score + "  |  " + sessionStorage.family2 + ": " + sessionStorage.family2Score );

for (var i = 1; i < numAnswers+1; i++) {
  $("#front"+String(i)).html(i);
  $("#answer"+String(i)).html(answers[i-1]);
  $("#score"+String(i)).html(scores[i-1]);    
} 


$("#usrAnswer").submit(function() {
    var subAns = $('#usrAnswer').find('input[name="submittedAnswer"]').val().toLowerCase();
    if ($.inArray(subAns, answers) != -1) {
        console.log("Found Answer");
        var answerNum = $.inArray(subAns, answers) + 1;
        item("#" + String(answerNum));
    } else {
        strikes = strikes + 1;
        wrongAnswer();
    }
    $("#usrAnswer").trigger("reset");
    return false;
});

$(".multiplier").click(function() {
  $(".multiplier").removeClass("active");
  $(this).addClass("active");
});

// $("#flip-all").click(function() {
//   $(".card").flip(true);
// });

// $("#unflip-all").click(function() {
//   $(".card").flip(false);
//   $("#score").text(0);
// });

// $("#wrong-answer").click(function() {
//     wrongAnswer();
// });

function item (card) {
  $(card).flip(true);
  correctBuzzer.play();
  var toAdd = $(card).find(".score").text();
  //  alert(toAdd);
  if ($("#double").hasClass("active"))
    toAdd = toAdd * 2;
  else if ($("#triple").hasClass("active"))
    toAdd = toAdd * 3;
  $("#score").text(
    parseInt($("#score").text()) + parseInt(toAdd)
  );
  return false;
}

function wrongAnswer () {
  if (strikes == 1) {
    $("h1").prepend("<div id=\"red-x\">X</div>");
    $("#singleStrike").html("<img src=\"strike.png\" width=\"100\" height=\"100\">");
  } else if (strikes == 2) {
    $("h1").prepend("<div id=\"red-x\">X X</div>");
    $("#doubleStrike").html("<img src=\"strike.png\" width=\"100\" height=\"100\">");
  } else {
    $("h1").prepend("<div id=\"red-x\">X X X</div>");
    $("#trippleStrike").html("<img src=\"strike.png\" width=\"100\" height=\"100\">");
  }
  setTimeout(function() {
    $("#red-x").remove()
  }, 1000);
  wrongBuzzer.play();
}