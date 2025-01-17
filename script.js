fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    const questions = data.questions;
    // Shuffle and select 25 random questions
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, 25);
    let currentQuestionIndex = 0;
    let score = 0;
    let intervalId;

    // Function to start the timer
    function startTimer(duration, display) {
      let timer = duration;
      intervalId = setInterval(function () {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = `Time Remaining: ${minutes}:${seconds}`;
        if (--timer < 0) {
          clearInterval(intervalId);
          // End quiz when time is up
          endQuiz();
        }
      }, 1000);
    }

    // Display the current question
    function displayQuestion() {
      if (currentQuestionIndex >= selectedQuestions.length) {
        endQuiz();
        return;
      }
      const q = selectedQuestions[currentQuestionIndex];
      const questionContainer = document.getElementById('question-container');
      questionContainer.innerHTML = `
        <p>${q.Question}</p>
        <input type="radio" id="optionA" name="answer" value="A">
        <label for="optionA">${q.Options.A}</label><br>
        <input type="radio" id="optionB" name="answer" value="B">
        <label for="optionB">${q.Options.B}</label><br>
        <input type="radio" id="optionC" name="answer" value="C">
        <label for="optionC">${q.Options.C}</label><br>
        <input type="radio" id="optionD" name="answer" value="D">
        <label for="optionD">${q.Options.D}</label>
      `;
    }

    // Handle answer selection
    document.getElementById('question-container').addEventListener('change', function (event) {
      if (event.target.type === 'radio' && event.target.name === 'answer') {
        const selectedAnswer = event.target.value;
        if (selectedAnswer === selectedQuestions[currentQuestionIndex].Answer) {
          score++;
        }
        currentQuestionIndex++;
        displayQuestion();
      }
    });

    // End the quiz and show results
    function endQuiz() {
      clearInterval(intervalId);
      document.getElementById('question-container').style.display = 'none';
      document.getElementById('result').style.display = 'block';
      document.getElementById('result').textContent = `Your Score: ${score}/${selectedQuestions.length}`;
    }

    // Initialize the quiz
    const timerDisplay = document.getElementById('timer');
    startTimer(30 * 60, timerDisplay); // 30 minutes
    displayQuestion();
  })
  .catch(error => console.error('Error loading questions:', error));