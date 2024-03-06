$(document).ready(function() {
    var currentQuestion;
    var timer = 10;

    var interval;

    var score = 0;
    var highScore = 0;

    var updateTimeLeft = function (count) {
        timer += count;
        $('#timer').text(timer);
    }

    var updateScore = function (newScore) {
        score = newScore;
        $('#score').text(score);
        console.log('Score updated to:' + score);
    }

    var updateHighScore = function() {
        if (score > highScore) {
            highScore = score;
            alert("You set a new record! Your High Score: " + highScore + "!");
        }
        $('#high-score').text(highScore);
        console.log("High Score updated to: " + highScore);
    }

    updateHighScore();

    var startGame = function() {
        if (!interval) {
            if (timer === 0) {
                updateTimeLeft(10);
                updateScore(-score);
            }
            interval = setInterval(function() {
                updateTimeLeft(-1);
                if (timer === 0) {
                    clearInterval(interval);
                    interval = undefined;
                    endGame();
                    updateHighScore();
                }
            }, 1000);
        }
    }

    var renderNewQuestion = function(questionType) {
        currentQuestion = questionGenerator(questionType);
        $('#equation').text(currentQuestion.equation);
    }

    var randomNumberGenerator = function (size) {
        return Math.ceil(Math.random() * size);
    }

    var resetGame = function() {
        clearInterval(interval);
        interval = undefined;
        timer = 10;
        score = 0;
        updateTimeLeft(0);
        updateHighScore(0);
        renderNewQuestion($('input[type=radio][name=questionType]:checked').val());
    }

    $('input[type=radio][name=questionType]').change(function() {
        resetGame();
    });

    var questionGenerator = function(questionType) {
        var question = {};
        var num1 = randomNumberGenerator(10);
        var num2 = randomNumberGenerator(10);

        switch (questionType) {
            case 'addition':
                question.answer = num1 + num2;
                question.equation = String(num1) + " + " + String(num2);
                break;
            case 'subtraction':
                // Ensure that the result is positive
                if (num1 < num2) {
                    var temp = num1;
                    num1 = num2;
                    num2 = temp;
                }
                question.answer = num1 - num2;
                question.equation = String(num1) + " - " + String(num2);
                break;
            case 'multiplication':
                question.answer = num1 * num2;
                question.equation = String(num1) + " * " + String(num2);
                break;
            case 'division':
                // Ensure that the division is valid and the result is a whole number
                if (num1 % num2 !== 0) {
                    num1 = num2 * Math.floor(Math.random() * (num1 / num2));
                }
                question.answer = num1 / num2;
                question.equation = String(num1) + " / " + String(num2);
                break;
        }

        return question;
    }

    var checkAnswer = function(userAnswer, answer) {
        if (userAnswer === answer) {
            renderNewQuestion($('input[type=radio][name=questionType]:checked').val());
            $('#userAnswer').val('');
            updateTimeLeft(+1);
            updateScore(score + 1);
        }
    }

    $('#userAnswer').on('keyup', function() {
        var questionType = $('input[type=radio][name=questionType]:checked').val();
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
        
    });

    var endGame = function() {
        console.log("Game Over");
        alert("Game Over! Your Score: " + score + "!");
    }

    renderNewQuestion('addition');
})

