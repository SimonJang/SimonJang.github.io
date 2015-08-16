var q1 = document.getElementById("q1");
var q2 = document.getElementById("q2");
var q3 = document.getElementById("q3");
var q4 = document.getElementById("q4");
var q5 = document.getElementById("q5");
var score = 0;

var game = {
    score: 0,
    updateScore: function() {
        this.score += 1;
    },
    publishScore: function() {
        return this.score;
    }
};

function validateForm() {   
    
    if ( q1.checked ) {
        game.updateScore();
    }
    
    if ( q2.checked ) {
        game.updateScore();
    }
    
    if ( q3.checked) {
        game.updateScore();
    }
    
    if ( q4.checked) {
        game.updateScore();
    }
    
    if ( q5.checked) {
        game.updateScore();
    }
    
    var p = document.createElement("p");
    p.appendChild(document.createTextNode('Your score is ' + game.publishScore()));
    var parentp = document.getElementsByClassName("box")[0];
    parentp.appendChild(p);
    
}

var submit = document.getElementById("submitBut");
submit.addEventListener("click", validateForm, false);
