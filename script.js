const quiz = {
    timer: 60,
    currentQuestion: 0,
    questions: [
      {
        text: "What is the correct way to write a JavaScript array?",
        choices: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = 'red', 'green', 'blue'", "var colors = ['red', 'green', 'blue']", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
        correctChoice: 2
      },
      {
        text: "What is the correct way to write a function in JavaScript?",
        choices: ["function myFunction()", "function = myFunction()", "function:myFunction()", "myFunction()"],
        correctChoice: 0
      },
      {
        text: "Inside which HTML element do we put the JavaScript?",
        choices: ["<<js>>", "<<script>>", "<<javascript>>", "<<scripting>>"],
        correctChoice: 1
      }
    ]
  };
  
  // Start quiz when start button is clicked
  document.getElementById("start-button").addEventListener("click", startQuiz);
  
  function startQuiz() {
    // Hide start button and show question container
    document.getElementById("start-button").style.display = "none";
    document.getElementById("question-container").style.display = "block";
  
    // Start timer and render first question
    renderQuestion();
  }
  
  // Render current question and choices
  function renderQuestion() {
    // Clear previous question
    document.getElementById("question").innerHTML = "";
    document.getElementById("choices").innerHTML = "";
  
    // Render question and choices
    const question = document.createElement("p");
    question.innerHTML = quiz.questions[quiz.currentQuestion].text;
    document.getElementById("question").appendChild(question);
  
    quiz.questions[quiz.currentQuestion].choices.forEach((choice, index) => {
      const choiceButton = document.createElement("button");
      choiceButton.innerHTML = choice;
      choiceButton.addEventListener("click", () => checkAnswer(index));
      document.getElementById("choices").appendChild(choiceButton);
    });
  }
  // Check answer and move to next question or end quiz
function checkAnswer(choice) {
    if (choice === quiz.questions[quiz.currentQuestion].correctChoice) {
      // Correct answer, move to next question
      quiz.currentQuestion++;
      if (quiz.currentQuestion < quiz.questions.length) {
        renderQuestion();
      } else {
        endQuiz();
      }
    } else {
      // Incorrect answer, subtract time from timer
      quiz.timer -= 10;
      if (quiz.timer < 0) {
        endQuiz();
      } else {
        renderQuestion();
      }
    }
  }
  
  // End quiz and show game over screen
  function endQuiz() {
    // Clear previous question and choices
    document.getElementById("question").innerHTML = "";
    document.getElementById("choices").innerHTML = "";
  
    // Show game over message
    const gameOverMessage = document.createElement("p");
    gameOverMessage.innerHTML = "Game Over!";
    document.getElementById("question").appendChild(gameOverMessage);
  
    // Show score
    const scoreMessage = document.createElement("p");
    scoreMessage.innerHTML = `Your score is: ${quiz.timer}`;
    document.getElementById("question").appendChild(scoreMessage);
  
    // Show form to enter initials
    const initialsForm = document.createElement("form");
    initialsForm.innerHTML = `
      <label>Enter your initials:</label>
      <input type="text" id="initials-input" />
      <button type="submit">Save</button>
      `;
      document.getElementById("question").appendChild(initialsForm);
    
      // Handle form submission
      initialsForm.addEventListener("submit", saveScore);
    
      function saveScore(event) {
        event.preventDefault(); // Prevent form from submitting
        const initials = document.getElementById("initials-input").value;
        // Save score with initials to local storage
        localStorage.setItem(initials, quiz.timer);
    
        // Show leaderboard
        showLeaderboard();
      }
    
      function showLeaderboard() {
        // Clear previous question and choices
        document.getElementById("question").innerHTML = "";
        document.getElementById("choices").innerHTML = "";
    
        // Show leaderboard
        const leaderboard = document.createElement("ol");
        document.getElementById("question").appendChild(leaderboard);
    
        // Get scores from local storage and sort them in descending order
        const scores = [];
        for (let i = 0; i < localStorage.length; i++) {
          const initials = localStorage.key(i);
          const score = localStorage.getItem(initials);
          scores.push({ initials, score });
        }
        scores.sort((a, b) => b.score - a.score);
    
        // Display top scores on leaderboard
        scores.slice(0, 5).forEach(score => {
          const leaderboardItem = document.createElement("li");
          leaderboardItem.innerHTML = `${score.initials}: ${score.score}`;
          leaderboard.appendChild(leaderboardItem);
        });
      }
    }
    
 
  
    