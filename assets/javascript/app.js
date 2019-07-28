var questions = {
    Q0: {
        question: "Which Hokage sealed the nine-tailed fox inside Naruto?",
        choices: ["First Hokage", "Second Hokage", "Thrid Hokage", "Forth Hokage"],
        correct: 3
    },
    Q1: {
        question: "Who tricked Naruto into stealing a sacred scroll?",
        choices: ["Iruka", "Zabuza", "Sasuke", "Mizuki"],
        correct: 3
    }
}

var displayQuestion = function() {

    //Empty the displayed info
    $("#game").empty();

    //Counter
    var counter = 0;

    //Show the next question
    var newDiv = $("<div>");
    var question = $("<div>");
    question.text(questions['Q' + counter].question);
    newDiv.append(question);
    $("#game").append(newDiv);
    
    //Dynamically generate 4 input 
    for (let i = 0; i < questions['Q' + counter].choices.length; i++) {
        var choiceDiv = $("<div>");
        var choiceInput = $('<input>');
        var choiceInputLabel = $("<label>");

        choiceInputLabel.text(questions['Q' + counter].choices[i]);
        choiceInputLabel.attr("for", "choice" + counter);

        choiceInput.attr("id", "choice" + counter);
        choiceInput.attr("value", questions['Q' + counter].choices[i]);
        choiceInput.attr("index", i);
        choiceInput.attr("type", "radio");
        
        choiceDiv.append(choiceInput);
        choiceDiv.append(choiceInputLabel);
   
        newDiv.append(choiceDiv);
    }

    var checkButton = $("<button>");
    checkButton.text("Submit");
    $("#game").append(checkButton);

    //Counter plus one
    counter++;
}

$(document).on("click", "button", displayQuestion);