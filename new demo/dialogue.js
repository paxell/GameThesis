var DIALOGUE = {
	Cantina: {
		Barman: {
			Player: [
					{txt: "Hello, what is your name?", next: "Barman:0"},
					{txt: "Well met, Arrak. My name is Sol.", next: "Barman:1"}			
			],
			Barman: [
					{txt: "My name is Arrak", next: "Player:1"}, 
					{txt: "Well met, Sol. What brings you to this place?", next: "Choices:0"}
			],
			Choices: [
				[
					{txt: "I need help. I have to leave the planet.", next: "Answers:0"},
					{txt: "Just came in for a drink.", next: "Answers:1"},
					{txt: "I'm looking for someone.", next: "Answers:2"},
					{txt: "Nevermind."},
				]
			],
			Answers: [
					{txt: "Here, take this."},
					{txt: "What will you have?"},
					{txt: "Some people don't want to be found."}
			]
		}
	}
}

var items = {
	

}

//Notes:
//difference between conversations and choice-based dialogue
//won't be able to abstract logic, indexes of dialogue will have to be hard coded into scenes
//observations about objects, places or characters
//item descriptions
//dialogue left aligned for main character, right aligned for character to talk to
//need a separate dialog 'mode'
//choice of dialog
//goto: callback
//choices and answers together?
//dialogue - timing? choice of enter key or wait
//can it be restricted to one answer per choice so that the 
