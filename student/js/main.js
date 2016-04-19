var testNumber = 1;
var testNumberDiv = document.getElementById("test-question-number");
var choices = document.getElementById("test-choices");
var sumAnswer = 0;
var questions = {
  1: ["I don't usually feel sad",
      "I feel sad sometimes",
      "I feel sad often",
      "I feel sad all the time"],
  2: ["I don't worry about the future",
        "I worry about the future",
        "I have nothing to look forward to",
        "The future is hopeless and won't improve"],
  3: ["I don't feel like a failure",
        "I've failed more than the average person",
        "There has been nothing but failures in my life",
        "I'm a complete failure as a person"],
  4: ["I still enjoy things as I used to",
      "I don't enjoy things the way I used to",
      "I don't get satisfaction out of anything lately",
      "I'm unsatisfied and bored with everything"],
  5: ["I don't feel particularly guilty",
      "I feel guilty a good part of the time",
      "I feel quite guilty most of the time",
      "I feel guilty all the time"],
  6: ["I don't feel I'm being punished",
      "I feel I may be punished",
      "I expect to be punished",
      "I feel I am being punished"],
  7: ["I don't feel disappointed with myself",
      "I am disappointed with myself",
      "I am disgusted with myself",
      "I hate myself"],
  8: ["I don't feel I am worse than anyone else",
      "I am critical of my weaknesses and mistakes",
      "I blame myself all the time for my faults",
      "I blame myself for everything bad that happens"],
  9: ["I don't think of killing myself",
      "I've thought of killing myself",
      "I'd like to kill myself",
      "I'd kill myself if I had the chance"],
  10: ["I don't cry any more than usual",
      "I cry more than I used to",
      "I cry all the time now",
      "I can't cry even if I wanted to anymore"],
  11: ["I'm no more irritated by things than I ever was",
      "I am more irritated than usual now",
      "I'm irritated a good deal of the time",
      "I'm always irritated"],
  12: ["I have not lost interest in other people",
      "I am less interested in people now",
      "I have lost most interest in people",
      "I have lost all my interest in people"],
  13: ["I make decisions as well as I did",
      "I put off making decisions more than I used to",
      "I have difficulty making decisions now",
      "I can't make decisions at all anymore"],
  14: ["I don't think I look worse than I used to",
      "I'm worried I'm starting to look unattractive",
      "I'm starting to change and look unattractive",
      "I believe that I look ugly"],
  15: ["I can work as well as I did before",
      "It takes extra effor to start doing something",
      "I have to push myself hard to do anything",
      "I can't do any work at all"],
  16: ["I can sleep as well as usual",
      "I don't sleep as well as I used to",
      "I wake up earlier and can't sleep afterwards",
      "I wake up much earlier than usual and can't sleep after"],
  17: ["I don't get more tired than usual",
      "I get tired more easily than I used to",
      "I get tired from doing almost anything",
      "I am too tired to do anything"],
  18: ["My appetite is no worse than usual",
      "My appetite is not as good as it used to be",
      "My appetite is much worse now",
      "I have no appetite at all anymore"],
  19: ["I haven't lost much weight if any",
      "I have lost more than five pounds suddenly",
      "I have more than ten pounds suddenly",
      "I have lost more than fifteen pounds suddenly"],
  20: ["I'm not worried about my health",
      "I'm a bit worried about my health",
      "I'm very worried about my health",
      "I'm extremely worried about my health"],
  21: ["I haven't noticed any change in my interest in sex",
      "I'm less interested in sex than before",
      "I have almost no interest in sex",
      "I've completely lost interest in sex"]
}

var studentIndex = 0;

if (localStorage.getItem("studentIndex") != undefined) {
  studentIndex = localStorage.getItem("studentIndex");
}

window.onload = function () {
  var URL = window.location.href;
  if (URL.indexOf('test-questions.html') > -1) { // if in test questions
    setQuestions();
    sessionStorage.setItem("result", sumAnswer);
  } else if (URL.indexOf('new-student.html') > -1) { // if new student prompt
    var form = document.getElementById("new-student");
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var student = {};
      var test = document.getElementsByClassName("labeled-field");
      for (var i = 0; i < test.length; i++) {
        var input = test[i].children[1];
        student[input.id] = input.value;
      }
      student["scheduled"] = true;

      studentIndex++;
      localStorage.setItem("student"+studentIndex, JSON.stringify(student));
      localStorage.setItem("studentIndex", studentIndex);
      window.location = 'pre-test.html';
    });
  } else if (URL.indexOf('old-student.html') > -1) { // if old student prompt
    var button = document.getElementById("take-test");
    button.addEventListener('click', function (e) {
      e.preventDefault();
      var idnum = document.getElementById("id-number");
      var noOfStudents = localStorage.getItem("studentIndex");
      if (noOfStudents != null) {
        for (var i = 1; i <= noOfStudents; i++) {
          var student = JSON.parse(localStorage.getItem("student"+i));
          if (student["id-number"] == idnum.value) {
            if (student["scheduled"]) window.location = 'pre-test.html';
            else window.location = 'old-student-error.html';
          } else window.location = 'old-student-error.html';
        }
      } else window.location = 'old-student-error.html';
    });
  }

}

function nextQuestion() {
  // store answer
  for (var i = 0; i < questions[testNumber].length; i++) {
    if (event.target.innerHTML == questions[testNumber][i]) {
      sumAnswer = sumAnswer + i;
      sessionStorage.setItem("result", sumAnswer);
    }
  }
  
  // move to next question
  testNumber++;
  // check first if student has answered all questions
  if (testNumber > Object.keys(questions).length) {
    var student = JSON.parse(localStorage.getItem("student"+studentIndex));
    student["result"] = sumAnswer;
    student["scheduled"] = false;
    if (sumAnswer > 30) { // urgeny
      student["urgency"] = "urgent";
    } else if (sumAnswer <= 16) { // normal
      student["urgency"] = "normal";
    } else { // serious
      student["urgency"] = "serious";
    }

    localStorage.setItem("student"+studentIndex, JSON.stringify(student));
    window.location = 'test-questions-done.html';
  } else {
    setQuestions();
  }
}

function setQuestions() {
  choices.innerHTML = '';
  if (testNumber <= 9) {
    testNumberDiv.innerHTML = '0' + testNumber;
  } else {
    testNumberDiv.innerHTML = testNumber;
  }

  for (var i = 0; i < 4; i++) {
    var choice = document.createElement("a");
    choice.href = '#';
    choice.className = 'button test-choice';
    var text = document.createTextNode(questions[testNumber][i]);
    choice.appendChild(text);
    choice.addEventListener('click', nextQuestion);
    choices.appendChild(choice);
  }
}