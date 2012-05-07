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
					{txt: "Nevermind."}
				]
			],
			Answers: [
					{txt: "Here, take this."},
					{txt: "What will you have?"},
					{txt: "Some people don't want to be found."}
			]
		}
	},
	
	Temple: {
		Priestess: {
			Player: [
					{txt: "Hello, what is your name?", next: "Priestess:0"},
					{txt: "Well met, Lune. My name is Sol.", next: "Priestess:1"}			
			],
			Priestess: [
					{txt: "My name is Lune", next: "Player:1"}, 
					{txt: "Well met, Sol. What brings you to this place?", next: "Choices:0"}
			],
			Choices: [
				[
					{txt: "I need help. I have to leave the planet.", next: "Answers:0"},
					{txt: "Just came in to pray.", next: "Answers:1"},
					{txt: "I'm looking for someone.", next: "Answers:2"},
					{txt: "Nevermind."}
				]
			],
			Answers: [
					{txt: "Here, take this."},
					{txt: "Prayer is comforting in times of great need."},
					{txt: "Some people don't want to be found."}
			]
		}
	}
}

var items = {
	

}

//Notes/to do:
//observations about objects, places or characters
//item descriptions
//dialogue left aligned for main character, right aligned for character to talk to
//choices and answers together?
//dialogue - timing? choice of enter key or wait
