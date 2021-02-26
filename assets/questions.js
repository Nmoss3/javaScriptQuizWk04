var questions = [
    {
        title: "Is Java the same as JavaScript?",
        choices: ["yes", "no", "maybe", "uhhhh"],
        answer: "no"
    },
    {
        title: "String values must be enlcosed within ______ when being assigned to variables.",
        choices: ["A hug", "Quotes", "parentheses", "brackets"],
        answer: "parentheses"
    },
    {
        title: "What is a boolean?",
        choices: ["a skinny ghost", "an ID", "a subset of algebra used for creating true/false statements", "all of binary code"],
        answer: "a subset of algebra used for creating true/false statements"
    },
    {
        title: "JavaScript is a ____-side programming language",
        choices: ["client", "server", "both", "none"],
        answer: "both"
    },
    {
        title: "what is the correct JavaScript Syntax to print 'DataFlair' in the console?",
        choices: ["print('DataFlair');", "console.print('DataFlair');", "!DataFlair", "console.log('DataFlair');"],
        answer: "console.log('DataFlair');"
    },
];
// Declared Variables
var score = 0;
var questionIndex = 0;

//Start code
var currenttime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

//timer variables
var secondsLeft = 76;

// hold variable time
var holdInterval = 0;

//penalty time
var penalty = 10;

//creates new element
var ulCreate = document.createElement("ul");

// Triggers timer shows user the display
timer.addEventListener("click", function () {
    //check if timer is at 0, default is 0.
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "time: " + secondsLeft;

            if (secondsLeft <=0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's Up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

//displays questions and choices
function render(questionIndex) {
    //clear existing data
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // loops through all info into array
    for (var i = 0; i < questions.length; i++) {
        //appends question titles
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
//compare choices to answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determins number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    //paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

     // Label
     var createLabel = document.createElement("label");
     createLabel.setAttribute("id", "createLabel");
     createLabel.textContent = "Enter your initials: ";
 
     questionsDiv.appendChild(createLabel);
 
     // input
     var createInput = document.createElement("input");
     createInput.setAttribute("type", "text");
     createInput.setAttribute("id", "initials");
     createInput.textContent = "";
 
     questionsDiv.appendChild(createInput);
 
     // submit
     var createSubmit = document.createElement("button");
     createSubmit.setAttribute("type", "submit");
     createSubmit.setAttribute("id", "Submit");
     createSubmit.textContent = "Submit";
 
     questionsDiv.appendChild(createSubmit);
 
     // Event listener to capture initials and local storage for initials and score
     createSubmit.addEventListener("click", function () {
         var initials = createInput.value;
 
         if (initials === null) {
 
             console.log("No value entered!");
 
         } else {
             var finalScore = {
                 initials: initials,
                 score: timeRemaining
             }
             console.log(finalScore);
             var allScores = localStorage.getItem("allScores");
             if (allScores === null) {
                 allScores = [];
             } else {
                 allScores = JSON.parse(allScores);
             }
             allScores.push(finalScore);
             var newScore = JSON.stringify(allScores);
             localStorage.setItem("allScores", newScore);
             // Travels to final page
             window.location.replace("./HighScores.html");
         }
     });
 
 }