$(document).ready(function() {
    var currentQuestion;
    var timer = 10;

    var interval;

    var score = 0;
    var highScore = 0;

    $('#userAnswer').on('keyup', function() {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    var randomNumberGenerator = function (size) {
        return Math.ceil(Math.random() * size);
    }

    var questionGenerator = function() {
        var question = {};
        var num1 = randomNumberGenerator(10);
        var num2 = randomNumberGenerator(10);

        question.answer = num1 + num2;
        question.equation = String(num1) + "+" + String(num2);

        return question;
    }

    var updateTimeLeft = function (count) {
        timer += count;
        $('#timer').text(timer);
    }

    var updateHighScore = function() {
        if (score > highScore) {
            highScore = score;
            alert("You set a new record! Your High Score: " + highScore + "!");
        }
        $('#high-score').text(highScore);
        console.log("High Score updated to: " + highScore);
    }

    var updateScore = function (count) {
        score += count;
        $('#score').text(score);
        console.log('Score updated to:' + score);
    }
    updateHighScore();

    var renderNewQuestion = function() {
        currentQuestion = questionGenerator();
        $('#equation').text(currentQuestion.equation);
    }

    var checkAnswer = function(userAnswer, answer) {
        if (userAnswer === answer) {
            renderNewQuestion();
            $('#userAnswer').val('');
            updateTimeLeft(+1);
            updateScore(+1);
        }
    }

    var endGame = function() {
        console.log("Game Over");
        alert("Game Over! Your Score: " + score + "!");
    }

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

    renderNewQuestion();
})

