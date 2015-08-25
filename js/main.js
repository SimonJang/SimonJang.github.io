
/**************
  Voting-app
**************/



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
                        exceptionP.setAttribute("id","errorMsg");
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
            
            if ( document.getElementById("errorMsg")) {
                var error = document.getElementById("errorMsg");
                var container = error.parentNode;
                container.removeChild(error);
            }
            
            var infopara = document.createElement("canvas");
            infopara.setAttribute("id", "infograph", "class", 'info');
            var containerPlaceholder = document.getElementsByClassName("wrapper")[0];
            var parentContainer = containerPlaceholder.parentNode;
            parentContainer.removeChild(containerPlaceholder);
            
            var titleResults = document.createElement("h3");
            var innerTitleResults = document.createTextNode("Results");
            titleResults.appendChild(innerTitleResults);
            
            parentContainer.appendChild(titleResults)
            parentContainer.appendChild(infopara);
                     
            var data = [
                {
                    value: votingApp.voteYes,
                    color: 'green',
                    hightlight : 'lightgreen',
                    label: "Yes votes"
                },
                {
                    value: votingApp.voteNo,
                    color: 'red',
                    hightlight: 'lightred',
                    label: "No votes"
                }
            ];
            
            var ctx = document.getElementById("infograph").getContext("2d");
            var pieChart = new Chart(ctx).Pie((data));
            
            
         // Currently excluded
//            var voteCountPar = document.createElement("p");
//            var voteCount = document.createTextNode("There are " + votingApp.voteYes + " yes votes and there are " + votingApp.voteNo + " no votes");
//            voteCountPar.setAttribute("class", "attention", 'id', 'votePara');
//            voteCountPar.appendChild(voteCount);      
//            infopara.appendChild(voteCountPar);
	}
	
};

window.onload = votingApp.init();
