var q1 = document.getElementById("q1");
var q2 = document.getElementById("q2");
var q3 = document.getElementById("q3");
var q4 = document.getElementById("q4");
var q5 = document.getElementById("q5");

var legend1 = document.getElementById("l1");
var legend2 = document.getElementById("l2");
var legend3 = document.getElementById("l3");
var legend4 = document.getElementById("l4");
var legend5 = document.getElementById("l5");

var game = {
    score: 0,
    updateScore: function() {
        this.score += 1;
    },
    publishScore: function() {
        return this.score;
    },
    resetScore: function() {
        this.score = 0;
    }
};

function validateForm() {   
    
    game.score = 0;
    
    if ( q1.checked ) {
        game.updateScore();
        legend1.setAttribute("class", "rightAnswer");
    }
    else {
        var container = q1.parentNode;
        legend1.setAttribute("class", "wrongAnswer");
    }
    
    if ( q2.checked ) {
        game.updateScore();
        legend2.setAttribute("class", "rightAnswer");
    }
    else {
        legend2.setAttribute("class", "wrongAnswer");
    }
    
    if ( q3.checked) {
        game.updateScore();
        legend3.setAttribute("class", "rightAnswer");
    }
    else {
        legend3.setAttribute("class", "wrongAnswer");
    }
    
    if ( q4.checked) {
        game.updateScore();
        legend4.setAttribute("class", "rightAnswer");
    }
    else {
        legend4.setAttribute("class", "wrongAnswer");
    }
    
    if ( q5.checked) {
        game.updateScore();
        legend5.setAttribute("class", "rightAnswer");
    }
    else {
        legend5.setAttribute("class", "wrongAnswer");
    }
    
    if ( document.getElementById("score")) {
        var p = document.getElementById("score");
        var container = p.parentNode;
        container.removeChild(p);
    }
    
    
    var p = document.createElement("p");
    p.setAttribute("class", "score");
    p.setAttribute("id","score");
    p.appendChild(document.createTextNode('Your score is ' + game.publishScore()));
    var parentp = document.getElementsByClassName("box")[0];
    parentp.appendChild(p);   
}

function resetForm() {
    game.resetScore();
    legend1.removeAttribute("class");
    legend2.removeAttribute("class");
    legend3.removeAttribute("class");
    legend4.removeAttribute("class");
    legend5.removeAttribute("class");
    if ( document.getElementById("score")) {
        var p = document.getElementById("score");
        var container = p.parentNode;
        container.removeChild(p);
    };

}

var submit = document.getElementById("submitBut");
submit.addEventListener("click", validateForm, false);

var reset = document.getElementById("resetBut");
reset.addEventListener('click', resetForm, false);
