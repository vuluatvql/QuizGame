var ques = null;

var option = ['a', 'b', 'c', 'd'];
var diem = 0;
var xlevel = 1;
var thutu = 1;

var level = document.getElementById('level');
var tt = document.getElementById('tt');
var score = document.getElementById('score');
var start_reset = document.getElementById("start_reset");

var question = document.getElementById('question');

var options = [];
for (let index = 0; index < 4; index++) {
    options[index] = document.getElementById(option[index]);
}
var timeming = document.getElementById('timeming');

// start game
function start() {
    timer(20);
    level.innerHTML = 'Level ' + xlevel;
    tt.innerHTML = "Question " + thutu;
    ques = new Question(1);
    question.innerHTML = ques.question;
    for (let index = 0; index < 4; index++) {
        options[index].innerHTML = ques.options[index];
        options[index].setAttribute('onclick', 'select(this.id)');
    }
    start_reset.innerHTML = "Reset";
    start_reset.setAttribute('onclick', 'reset()');
}

// select the answer
function select(click_id) {
    var selected = document.getElementById(click_id).innerHTML;
    checkAnswer(selected);
}

// check result
function checkAnswer(selected) {
    if (selected == ques.answer) {
        diem++;
        score.innerHTML = "Score: " + diem;
        note.style.color = "#42e252";
        note.innerHTML = "CORRECT!";
        setTimeout(function name() {
            next();
        }, 300);
    } else {
        end("INCORRECT!");
    }
}
// time counter
var myfunc = 0;
function timer(time) {
    myfunc = setInterval(function () {
        timeming.innerHTML = "Time Remining: " + time + "s";
        time--;
        if (time < 0) {
            clearInterval(myfunc);
            end("Time Out!");
        }
    }, 1000);
}

// reset game
function reset() {
    xlevel = 1;
    diem = 0;
    thutu = 1;
    level.innerHTML = "Level " + xlevel;
    tt.innerHTML = "Question";
    score.innerHTML = "Score: ";
    question.innerHTML = "";
    clearInterval(myfunc);
    timeming.innerHTML = "Time Remining: ";
    for (let index = 0; index < 4; index++) {
        options[index].innerHTML = " ";
    }
    start_reset.innerHTML = "Start";
    start_reset.setAttribute('onclick', 'start()');
}

// End game
function end(message = "You Finish The Game") {
    question.innerHTML = message + "<br>" + "Your Score: " + diem;
    for (let index = 0; index < 4; index++) {
        options[index].innerHTML = " ";
        options[index].setAttribute('onclick', " ");
    }
    clearInterval(myfunc);
}

// next question
function next() {
    clearInterval(myfunc);
    timer(20);
    thutu++;
    tt.innerHTML = 'Question ' + thutu;
    ques = new Question(xlevel);
    question.innerHTML = ques.question;
    note.innerHTML = "Select A True Answer";
    note.style.color = "#212529";
    for (let index = 0; index < 4; index++) {
        options[index].innerHTML = ques.options[index];
    }
}

// Question Object
class Question {
    constructor(level = 1) {
        this.level = level;
        this.options = [];
        if (this.level == 1) {
            var oper = Math.floor(Math.random() * 3);
            this.left = Math.floor(Math.random() * 10);
            this.right = Math.floor(Math.random() * 10);
            if (oper == 0) {
                this.answer = this.left + this.right;
                this.question = this.left + ' + ' + this.right;
            }
            if (oper == 1) {
                this.answer = this.left - this.right;
                this.question = this.left + ' - ' + this.right;
            }
            if (oper == 2) {
                this.answer = this.left * this.right;
                this.question = this.left + ' x ' + this.right;
            }

            for (let i = 0; i < 4; i++) {
                this.options[i] = this.answer + i - 2;
            }
        }
        if (this.level == 2) {
            var oper = Math.floor(Math.random() * 3);
            this.left = Math.floor(Math.random() * 100);
            this.right = Math.floor(Math.random() * 100);
            if (oper == 0) {
                this.answer = this.left + this.right;
                this.question = this.left + ' + ' + this.right;
            }
            if (oper == 1) {
                this.answer = this.left - this.right;
                this.question = this.left + ' - ' + this.right;
            }
            if (oper == 2) {
                this.answer = this.left * this.right;
                this.question = this.left + ' x ' + this.right;
            }

            for (let i = 0; i < 4; i++) {
                this.options[i] = this.answer + i * 10 - 20;
            }
        }
    }
}