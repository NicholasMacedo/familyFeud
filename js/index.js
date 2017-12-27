$(".card").flip({
  axis: 'x',
  speed: 300
});

var correctBuzzer = document.createElement('audio');
correctBuzzer.setAttribute('src', 'http://www.qwizx.com/gssfx/usa/ff-clang.wav');

var wrongBuzzer = document.createElement('audio');
wrongBuzzer.setAttribute('src', 'http://www.qwizx.com/gssfx/usa/ff-strike.wav');

var answeredQuestions = [];
var numWrongAnswers = 0;
var numCorrectAnswers = 0;
var round = 1;

$(document).ready(function(){
  var questionNumber = Math.floor(Math.random() * 10)% allQuestions.length;
  while ($.inArray(questionNumber, answeredQuestions) != -1) {
    console.log("Skipped Question");
    questionNumber = Math.floor(Math.random() * 10)% allQuestions.length;
  }

  console.log(questionNumber);


  var question = allQuestions[questionNumber].question;
  var numAnswers = allQuestions[questionNumber].numAnswers;
  var answers = allQuestions[questionNumber].answers;
  var scores = allQuestions[questionNumber].scores;
  var strikes = 0;
  var familyTurn = sessionStorage.family1;

$("#theQuestion").html("Round " + round + "  - Question: " + question+" <br>Round Score: <span id=\"score\">0</span>");
$("#families").html("Family Feud: " + sessionStorage.family1 + " vs " + sessionStorage.family2);
$("#answerLabel").html("<b>"+familyTurn+"</b> Family Answer:");
$("#familyScores").html("Total Points: " + sessionStorage.family1 + ": " + sessionStorage.family1Score + "  |  " + sessionStorage.family2 + ": " + sessionStorage.family2Score );

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
        numCorrectAnswers += 1;
        if (numCorrectAnswers == answers.length) {

        }
    } else {
        strikes = strikes + 1;
        wrongAnswer();
    }
    $("#usrAnswer").trigger("reset");
    return false;
});

function multiplier(multip) {
  $(".multiplier").removeClass("active");
  $(multip).addClass("active");
}

if (round == 1) {
  multiplier("#single");
} else if (round == 2) {
  multiplier("#double");
} else {
  multiplier("#triple");
}

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
    $("#singleStrike").html("<img src=\"strike.png\" width=\"50\" height=\"50\">");
  } else if (strikes == 2) {
    $("h1").prepend("<div id=\"red-x\">X X</div>");
    $("#doubleStrike").html("<img src=\"strike.png\" width=\"50\" height=\"50\">");
  } else {
    $("h1").prepend("<div id=\"red-x\">X X X</div>");
    $("#trippleStrike").html("<img src=\"strike.png\" width=\"50\" height=\"50\">");
  }
  setTimeout(function() {
    $("#red-x").remove()
  }, 1000);
  wrongBuzzer.play();
  numWrongAnswers += 1;
  if (numWrongAnswers == 3) {
    if (familyTurn == sessionStorage.family1) {
        alert(sessionStorage.family2 + " can steal!");
        familyTurn = sessionStorage.family2;
        $("#answerLabel").html("<b>"+familyTurn+"</b> Family Answer:");
    } else {
        alert(sessionStorage.family1 + " can steal!");
        familyTurn = sessionStorage.family1;
        $("#answerLabel").html("<b>"+familyTurn+"</b> Family Answer:");
    }
  } else if (numWrongAnswers == 4){
      if (familyTurn == sessionStorage.family1) {
        sessionStorage.family2Score += parseInt($("#score").text())
      } else {
        sessionStorage.family1Score += parseInt($("#score").text())
      }
      $("#familyScores").html("Total Points: " + sessionStorage.family1 + ": " + sessionStorage.family1Score + "  |  " + sessionStorage.family2 + ": " + sessionStorage.family2Score );
  }
}

});