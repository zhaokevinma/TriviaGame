//For the stop watch functionality
var intervalId;

var clockRunning = false;

var stopwatch = {
    time: 30,
    reset: function() {
        stopwatch.time = 30;
        $("#timer").text("00:30");
    },
    start: function() {
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },
    stop: function() {
        clearInterval(intervalId);
        clockRunning = false;
    },
    count: function() {
        stopwatch.time--;
        var converted = stopwatch.timeConverter(stopwatch.time);
        if (stopwatch.time == 0) {
            stopwatch.stop();
        }
        $("#timer").text(converted);
    },
    timeConverter: function(t) {
        var minutes = Math.floor(t/60);
        var seconds = t - (minutes/60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes == 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
}

//Questions for game as an object
var questions = {
    Q0: {
        question: "Which Hokage sealed the nine-tailed fox inside Naruto?",
        choices: ["First Hokage", "Second Hokage", "Thrid Hokage", "Forth Hokage"],
        correct: "Forth Hokage",
        image: "assets/images/forthHokage.gif"
    },
    Q1: {
        question: "Which character can only use taijutsu?",
        choices: ["Iruka", "Zabuza", "Sasuke", "Rock Lee"],
        correct: "Rock Lee",
        image: "assets/images/rockLee.gif"
    },
    Q2: {
        question: "Sasuke\'s goal is gain enough power to kill whom?",
        choices: ["Naruto Uzumaki", "Itachi Uchiha", "Neji Hyuuga", "The Third Hokage"],
        correct: "Itachi Uchiha",
        image: "assets/images/itachiUchiha.gif"
    },
    Q3: {
        question: "Every member of Akatsuki is a what?",
        choices: ["kage", "swordsman", "kunoichi", "S-rank criminal"],
        correct: "S-rank criminal",
        image: "assets/images/akatsuki.gif",
    },
    Q4: {
        question: "Who started the 4th Great Ninja War?",
        choices: ["Kaguya", "Sasuke", "Orochimaru", "Obito"],
        correct: "Obito",
        image: "assets/images/obito.gif"
    },
    Q5: {
        question: "Who manipulated Obito from the beginning?",
        choices: ["Madara", "Sasuke", "Kakashi", "Rin"],
        correct: "Madara",
        image: "assets/images/madara.gif"
    }
}

//Keys in questions, for later usegae of tracking whether to display final page
var Keys = Object.keys(questions);

//Counter for same purposes as above
var counter = 0;

//For later comparison (correct or incorrect choice) purposes
var radiovalue = "";
var correctchoice = "";

//Correct and incorrect counter
var correct = 0;
var incorrect = 0;

//Dynamically generate displays for question
var displayQuestion = function() {

    //Empty the displayed info
    $("#game").empty();

    //Show the stop watch
    var timer = $("<div>");
    timer.attr("id", "timer");
    stopwatch.reset();
    stopwatch.start();

    //Show the question
    var newDiv = $("<div>");
    newDiv.attr("id", "willHide");
    var question = $("<div>");
    question.text(questions['Q' + counter].question);
    newDiv.append(timer,question);

    //Dsiplay dynamically generated items by appending
    $("#game").append(newDiv);
    
    //Dynamically generate 4 input with radio check boxes for selection
    for (let i = 0; i < questions['Q' + counter].choices.length; i++) {
        var choiceDiv = $("<div>");
        var choiceInput = $('<input>');
        var choiceInputLabel = $("<label>");

        choiceInputLabel.text(questions['Q' + counter].choices[i]);
        choiceInputLabel.attr("for", "choice" + i);

        choiceInput.attr("name", "same");
        choiceInput.attr("id", "choice" + i);
        choiceInput.attr("value", questions['Q' + counter].choices[i]);
        choiceInput.attr("index", i);
        choiceInput.attr("type", "radio");
        
        choiceDiv.append(choiceInput);
        choiceDiv.append(choiceInputLabel);
   
        newDiv.append(choiceDiv);
    }

    //Button for submit selected option
    var checkButton = $("<button>");
    checkButton.text("Submit");
    checkButton.attr("class", "submit");
    $("#willHide").append(checkButton);

    //Counter plus one
    counter++;

    //Timeout
    timeOut();
}

//Function for displaying answer page
var displayAnswer = function() {

    //Once on answer page, clear the timeout to avoid repetative appending
    CLRTimeOut();
    // Hide the displayed info
    // Because .empty() will not allow tracking of selected option
    $("#willHide").hide();

    //Information on the display for the answer page
    var newDiv = $("<div>");
    var result = $("<div>");
    var answer = $("<div>");
    var image = $("<img>");
    image.attr("src", questions['Q' + (counter -1)].image);
    var nextQuestion = $("<button>");
    nextQuestion.text("Next question");
    
    //Conditional statement for checking whether current answer page is the last
    if (counter == Keys.length) {
        nextQuestion.attr("class", "final");
    }
    else {
        nextQuestion.attr("class", "generic");            
    }

    //Check answer selected and add 1 to correct/incorrect counter accordingly
    radiovalue = $("input[name='same']:checked").val();
    correctchoice = questions['Q' + (counter - 1)].correct;

    if (radiovalue == correctchoice) {
        result.text("That is correct!");
        correct++;
    }
    else {
        result.text("Unfortunately that is not true.");
        incorrect++;
    }

    //Displaying the dynamically generated items on page
    newDiv.append(result);
    answer.text("The correct answer is " + correctchoice);
    newDiv.append(answer);
    newDiv.append(image);
    newDiv.append(nextQuestion);
    $("#game").append(newDiv);
}

//Function for displaying the final page
var displayFinal = function() {
    // Empty the displayed info
    $("#game").empty();

    $("#gameTitle").text("Hope you had fun!")

    var newDiv = $("<div>");
    var correctDiv = $("<div>");
    var incorrectDiv = $("<div>");
    var image = $("<img>");
    image.attr("src", "assets/images/finalImage.jpg")

    correctDiv.text("Correct: " + correct);
    incorrectDiv.text("Incorrect: " + incorrect);
    newDiv.append(correctDiv, incorrectDiv, image);
    $("#game").append(newDiv);
}

//Timeout functionality
var forTimeout;

function timeOut () {
    forTimeout = setTimeout(function() {
        displayAnswer();
    }, 31000);
}

function CLRTimeOut () {
    clearTimeout(forTimeout); 
}

//Main 
$(document).on("click", ".generic", displayQuestion);
$(document).on("click", ".submit", displayAnswer);
$(document).on('click', ".final", displayFinal);




