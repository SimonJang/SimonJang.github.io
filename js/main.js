/**************
  Voting-app
**************/

/*
To do:
Make it so that the user is able to unclick a button.
Make it so that the user can only click one button.
*/

// commentting out code ( nothing deleted )

/*

  var voteYes = 0;
  var voteNo = 0;

//The function that calls the checkWhatVote function.
document.getElementById("submit").addEventListener("click", function() {
	checkWhatVote()
	printOutCurrentScore()
});

//The function that checks the votes.
function checkWhatVote(){

	if(document.getElementById("yes").checked){
		voteYes++; 
	}

	if(document.getElementById("no").checked){
		voteNo++;
	}

};

//The function that prints out the score.
function printOutCurrentScore() {
	var voteText = "There are currently " + voteNo + " persons that have voted No, and " + voteYes + " that have voted Yes.";
	document.getElementById("voteParagraph").innerHTML = voteText;

//Disable the button after it has been used once.
document.getElementById('submit').disabled = 'disabled';
};

*/

// end comment

// My code ( peanutt )
// Updated 23/08/2015

var myFirebaseRef = new Firebase("https://votingappjs.firebaseio.com/");

var votingApp = {
	voteYes : 0,
	voteNo : 0,
	init : function() {
			var yesVoteButton = document.getElementById("yes");
			var noVoteButton = document.getElementById("no");
			var submitButton = document.getElementById("submit");
			
			votingApp.loadVotes();
			
			yesVoteButton.onclick = function() {
				this.checked = true;
				noVoteButton.checked = false;
			};
			noVoteButton.onclick = function() {
				this.checked = true;
				yesVoteButton.checked = false;
			};
			submitButton.onclick = function() {
				var checkup = votingApp.checkVote();
				if ( checkup ) {
					this.style.visibility = 'hidden';
					votingApp.saveVotes();
					votingApp.toHTML();
				}
			};
			
	},
	checkVote : function() {
		if( document.getElementById("yes").checked ) {
			votingApp.voteYes += 1;
			return true;
		}
		else if( document.getElementById("no").checked ) {
			votingApp.voteNo += 1;
			return true;
		}
		else {
			var exceptionP = document.createElement("p");
			var exceptionText = document.createTextNode("You have to make a choice");
			exceptionP.appendChild(exceptionText);
			var domAdd = document.getElementById("voteParagraph");
			var domParent = domAdd.parentNode;
			domParent.appendChild(exceptionP);
			return false;
		};
	},
	saveVotes : function() {
		myFirebaseRef.set({
			yesVotes: votingApp.voteYes,
			noVotes: votingApp.voteNo
		});
	},
	loadVotes : function() {
		myFirebaseRef.on("value", function(snapshot) {
			var dataHandler = snapshot.val();
			votingApp.voteYes = dataHandler.yesVotes;
			votingApp.voteNo = dataHandler.noVotes;
		});
	},
	toHTML : function() {
		var voteCountPar = document.getElementById("voteParagraph");
		var voteCount = document.createTextNode("There are " + votingApp.voteYes + " yes votes and there are " + votingApp.voteNo + " no votes")
		voteCountPar.setAttribute("class", "attention")
		voteCountPar.appendChild(voteCount);
	}
	
};

window.onload = votingApp.init();
