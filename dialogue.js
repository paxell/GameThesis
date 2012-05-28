var DIALOGUE = {

//note currently the dialogue component skips the first line!

	Village: {
		Guard: {
			Player: [
					{txt: "Hello, my name is Sol", next: "Seller:0"},
					{txt: "What do you sell?", next: "Seller:1"}			
			],
			Seller: [
					{txt: "Do you want to buy something?", next: "Player:1"}, 
					{txt: "Food and water. You'll need it for a long journey.", next: "Choices:0"}
			],
			Choices: [
				[
					{txt: "Yes. I am leaving the planet.", next: "Answers:0"},
					{txt: "No, it's just very dusty today.", next: "Answers:1"},
					{txt: "No, I'm just taking it to get cleaned.", next: "Answers:2"}
				]
			],
			Answers: [
					{txt: "That's not what I heard."},
					{txt: "More and more recently. But what can I say, I'm an opportunist."},
					{txt: "Give me any money you have and I'll see what I can do."}
			]
		},
		Seller: {
			Player: [
					{txt: "Hello, my name is Sol", next: "Seller:0"},
					{txt: "What do you sell?", next: "Seller:1"}			
			],
			Seller: [
					{txt: "Do you want to buy something?", next: "Player:1"}, 
					{txt: "Food and water. You'll need it for a long journey.", next: "Choices:0"}
			],
			Choices: [
				[
					{txt: "I'm not making a long journey.", next: "Answers:0"},
					{txt: "Do lots of people make journeys from here?", next: "Answers:1"},
					{txt: "I'm interested in getting some food and water.", next: "Answers:2"},
					{txt: "Nevermind."}
				]
			],
			Answers: [
					{txt: "That's not what I heard."},
					{txt: "More and more recently. But what can I say, I'm an opportunist."},
					{txt: "Give me any money you have and I'll see what I can do."}
			]
		},
		Guard: {
			Player: [
					{txt: "Hello, my name is Sol", next: "Guard:0"},
					{txt: "What? How do you know me?", next: "Guard:1"}			
			],
			Guard: [
					{txt: "I know who  you are. and I think I know why you are here.", next: "Player:1"}, 
					{txt: "I heard you are trying to leave. I've got my eye on you."}
			],
		}
	},
	
	Cantina: {
		Barman: {
			Player: [
					{txt: "PLACEHOLDER", next: "Player:1"},
					{txt: "Hello, what is your name?", next: "Barman:0"},
					{txt: "Well met, Arrak. My name is Sol.", next: "Barman:1"}			
			],
			Barman: [
					{txt: "My name is Arrak", next: "Player:2"}, 
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
		},
		Drunk: {
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

var ITEMS = {
	coins: ["It's a handful of coins, a few credits' worth", "That looks about right."],
	opal: ["This is worth a lot of money.", "This will buy you passage to Odor."]
}

//Notes/to do:
//observations about objects, places or characters - new component for object of interest? similar to door
//item descriptions linked to items
//dialogue left aligned for main character, right aligned for character to talk to or ideally 2 separate containers - too complicated?
//dialogue - timing? choice of enter key or wait