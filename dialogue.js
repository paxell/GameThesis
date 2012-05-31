var DIALOGUE = {

//note currently the dialogue component skips the first line!
	
	Intro: {
		Player: {
			Player: [
					{txt: "PLACEHOLDER", next: "Player:1"},
					{txt: "My faith teaches me that there are three sides to every endeavour: A beginning, a middle and an end.", next: "Player:2"},
					{txt: "My parents have met with their end, and although it means a new beginning for them, we will never again cross paths.", next: "Player:3"},
					{txt: "Escape from the forces that claimed them has prolonged my end, but their sacrifice will be meaningless if I don't leave.", next: "Player:4"},
					{txt: "I can only hope that my sister is still safe and that in time she will be able to join me, on another world."}	
			]
		}
	},
	
	Voyage: {
		Player: {
			Player: [
					{txt: "PLACEHOLDER", next: "Player:1"},
					{txt: "On the voyage I thought about my parents. To some their ideas were hard to hear.", next: "Player:2"},
					{txt: "As for me, I could listen to them endlessly. I miss their stories.", next: "Player:3"},
					{txt: "I thought about my sister. I can only hope the new world is somewhere we can be safe and happy together."}	
			]
		}
	},
	
	Journey: {
		Player: {
			Player: [
					{txt: "PLACEHOLDER", next: "Player:1"},
					{txt: "It seems there are others like me who feared for their lives at home.", next: "Player:2"},
					{txt: "Learning a new language and adjusting to a new life with be hard.", next: "Player:3"},
					{txt: "I hope I will be accepted for who I am and where I have come from.", next: "Player:4"},
					{txt: "If my sister can join me, I'm sure we can tackle anything together."}	
			]
		}
	},
	
	Village: {
		Guard: {
			Player: [
					{txt: "PLACEHOLDER", next: "Guard:0"},
					{txt: "Err...", next: "Guard:1"}			
			],
			Guard: [
					{txt: "What's with the helmet, kid? Going somewhere?", next: "Choices:0"}, 
					{txt: "There's something I don't like about you.", next: "Guard:2"},
					{txt: "I'll be keeping my eye on you."}
			],
			Choices: [
				[
					{txt: "Yes. I am leaving the planet.", next: "Answers:0"},
					{txt: "No, it's just very dusty today.", next: "Answers:1"},
					{txt: "No, I'm just taking it to get cleaned.", next: "Answers:2"}
				]
			],
			Answers: [
					{txt: "Why would you want to leave?", next: "Choices2:0"},
					{txt: "You'd be used to it if you were from around here.", next: "Guard:1"},
					{txt: "Oh yeah, where?", next: "Player:1"},
					{txt: "A good strong government is the only family I need.", next: "Guard:3"},
					{txt: "Holidays make you soft. I have everything I need right here.", next: "Guard:3"},
					{txt: "Now why would you want to do that? Just when our new government's got everything sorted out.", next: "Guard:3"}
			],
			Choices2: [
				[
					{txt: "Just going to visit a relative. Hopefully not for long.", next: "Answers2:0"},
					{txt: "I'm going for a nice holiday.", next: "Answers2:1"},
					{txt: "I'm leaving and never coming back.", next: "Answers2:2"}
				]
			],
			Answers2: [
					{txt: "A good strong government is the only family I need.", next: "Guard:1"},
					{txt: "Holidays make you soft. I have everything I need right here.", next: "Guard:1"},
					{txt: "Now why would you want to do that? Just when our new government's got everything sorted out.", next: "Guard:1"}
			]
		},
		Seller: {
			Player: [
					{txt: "PLACEHOLDER", next: "Seller:0"},
					{txt: "What do you sell?", next: "Seller:1"},
					{txt: "Because food is getting more expensive?", next: "Seller:3"}					
			],
			Seller: [
					{txt: "Do you want to buy something?", next: "Player:1"}, 
					{txt: "Food and water. Essential for long distance travel.", next: "Seller:2"},
					{txt: "Which more and more people seem to be doing these days...", next: "Choices:0"},
					{txt: "Nope just more in demand. Call me an opportunist."}
			],
			Choices: [
				[
					{txt: "I'm not making a long journey.", next: "Answers:0"},
					{txt: "I'd like to buy some food and water.", next: "Answers:1"},
					{txt: "Nevermind.", next: "Answers:0"}
				]
			],
			Answers: [
					{txt: "That's good because my prices are through the roof.", next: "Player:2"},
					{txt: "Let's see what you have."}
			]
		},
	},
	
	Cantina: {
		Barman: {
			Player: [
					{txt: "PLACEHOLDER", next: "Barman:0"},
					{txt: "I need to find a way off this planet.", next: "Barman:1"}					
			],
			Barman: [
					{txt: "You aren't like my regular patrons.", next: "Choices:0"},
					{txt: "Voler is the one to see about that. It won't be cheap though.", next: "Barman:2"},
					{txt: "I think I knew your father. Not much of a drinker. A bit of a talker, like you. He had some good ideas.", next: "Barman:3"},
					{txt: "I heard about what happened to him. You be careful now. Here, take this."},
					{txt: "You could try the government office. But they are never open.", next: "Barman:2"}
			],
			Choices: [
				[
					{txt: "I'd like a drink please. I'm much older than I look.", next: "Answers:0"},
					{txt: "I'm a little scared of your regular patrons.", next: "Answers:1"},
					{txt: "I'm just here for the music.", next: "Answers:2"}
				]
			],
			Answers: [
					{txt: "I'm sure you are, son. But I think that's not why you are really here.", next: "Player:1"},
					{txt: "Don't worry, they won't bite and neither will I. Are you looking for someone?", next: "Player:1"},
					{txt: "Nonsense, I haven't added any new songs in a century. There must be some other reason you are here.", next: "Player:1"}
			],
			Choices2: [
				[
					{txt: "Thanks. You are much friendlier than you look.", next: "Barman:2"},
					{txt: "The music is actually not that bad.", next: "Barman:2"},
					{txt: "Is there any other way off the planet?", next: "Barman:6"}
				]
			],
		},
		Drunk: {
			Player: [
					{txt: "PLACEHOLDER", next: "Drunk:0"},
					{txt: "Well met, Arrak. My name is Sol.", next: "Barman:1"}			
			],
			Drunk: [
					{txt: "Don't try and drink what I am drinking. It will knock you flat.", next: "Drunk:1"}, 
					{txt: "I don't know who you are but in this state I will tell you anything you want to know.", next: "Choices:0"},
					{txt: "All I know is, goverments change, beings are born and they die,", next: "Drunk:3"},
					{txt: "But the world keeps turning."}
			],
			Choices: [
				[
					{txt: "Where are you from?", next: "Answers:0"},
					{txt: "Have you been to many other worlds?", next: "Answers:1"},
					{txt: "What are you doing here?", next: "Answers:2"}
				]
			],
			Answers: [
					{txt: "A place where it rains every now and then.", next: "Drunk:3"},
					{txt: "Dozens.", next: "Drunk:2"},
					{txt: "You tell me, kid. I know it won't be for long.", next: "Drunk:2"}
			]
		},
		Smuggler: {
			Player: [
					{txt: "PLACEHOLDER", next: "Smuggler:0"},
					{txt: "I need a ride off this world", next: "Smuggler:1"}			
			],
			Smuggler: [
					{txt: "Make it quick, kid.", next: "Player:1"}, 
					{txt: "Ok there are two things you need to know.", next: "Smuggler:2"},
					{txt: "It's a fast ship so it's expensive. And it's not a pleasure cruise so you do your own catering.", next: "Choices:0"},
					{txt: "Good. As soon as you have food and water we can go. Would be messy if you died on my ship."},
					{txt: "Now all you need is payment. A ship as fast as this goes through fuel like you wouldn't believe."},
			],
			Choices: [
				[
					{txt: "I can't pay for passage.", next: "Answers:0"},
					{txt: "I can pay for passage.", next: "Smuggler:3"},
					{txt: "I don't have any food or water.", next: "Answers:1"},
					{txt: "I have food and water", next: "Smuggler:4"},
					{txt: "Nevermind."}
				]
			],
			Answers: [
					{txt: "Maybe try praying to your gods."},
					{txt: "You could try the world's worst caterer, she has a stall in the village."}
			]
		}
	},
	
	Temple: {
		Priestess: {
			Player: [
					{txt: "PLACEHOLDER", next: "Priestess:0"},
					{txt: "Well met, Lune. My name is Sol.", next: "Priestess:1"}			
			],
			Priestess: [
					{txt: "You're about to embark on a significant journey.", next: "Choices:0"}, 
					{txt: "Your life's journey is passing from beginning to middle.", next: "Priestess:2"},
					{txt: "But don't worry, your end is yet far.", next: "Choices2:0"},
					{txt: "I know you. Your mother left something here for you.", next: "Priestess:4"},
					{txt: "Passing to the next stage of life requires a talisman. Here is yours."}
			],
			Choices: [
				[
					{txt: "No, I'm not.", next: "Priestess:1"},
					{txt: "Yes, I hope so.", next: "Priestess:1"},
					{txt: "How do you know?", next: "Priestess:1"}
				]
			],
			Choices2: [
				[
					{txt: "Why should I believe you?", next: "Priestess:3"},
					{txt: "It will be further if I can leave this planet.", next: "Priestess:3"},
					{txt: "How do you know?", next: "Priestess:3"}
				]
			]
			
		},
		Worshipper: {
			Player: [
					{txt: "PLACEHOLDER", next: "Worshipper:0"}			
			],
			Worshipper: [
					{txt: "Is there someone you want me to pray for?", next: "Choices:0"}, 
					{txt: "Your life's journey is passing from beginning to middle.", next: "Priestess:2"},
					{txt: "But don't worry, your end is yet far.", next: "Choices2:0"},
					{txt: "I know you. Your mother left something here for you.", next: "Priestess:4"},
					{txt: "Passing to the next stage of life requires a talisman. Here is yours."}
			],
			Choices: [
				[
					{txt: "See if you can bring my parents back.", next: "Answers:0"},
					{txt: "Yes, my sister.", next: "Answers:2"},
					{txt: "No, thankyou."}
				]
			],
			Answers: [
					{txt: "Your parents have come to the end of this life but are only beginning the next.", next: "Answers:1"},
					{txt: "I will pray for you."},
					{txt: "Stay strong, child. I will pray for you and your sister."}
			]
		}
	},
	
	Spaceport: {
		Girl: {
			Player: [
					{txt: "PLACEHOLDER", next: "Girl:0"}			
			],
			Girl: [
					{txt: "Have you seen my doll?"}
			]
		},
		Passenger: {
			Player: [
					{txt: "PLACEHOLDER", next: "Passenger:0"}			
			],
			Passenger: [
					{txt: "Do you have news from home?"}
			]
		},
		SecGuard: {
			Player: [
					{txt: "PLACEHOLDER", next: "SecGuard:0"}			
			],
			SecGuard: [
					{txt: "Identification, please."}
			]
		}
	},
	
	Bathroom: {
		Father: {
			Player: [
					{txt: "PLACEHOLDER", next: "Father:0"}					
			],
			Father: [
					{txt: "Kerr suchres fasal du?"}
			]
		}
	},
	
	Carpark: {
		Cabbie: {
			Player: [
					{txt: "PLACEHOLDER", next: "Cabbie:0"}			
			],
			Cabbie: [
					{txt: "Where to?"}
			]	
		}
	}
}

var ITEMS = {
	coins: ["It's a handful of coins, a few credits' worth", "That looks about right."],
	opal: ["This is worth a lot of money.", "This will buy you passage to Odor."],
	paper: ["Must be the town's newspaper", "Not very intersting stuff."],
	food: ["I will need this to eat on the journey", "Not very intersting stuff."],
	water: ["I will need this to drink on the journey", "Not very intersting stuff."],
	doll: ["Looks like a child's toy.", "Not very intersting stuff."],
	address: ["The address of somewhere to stay.", "Not very intersting stuff."],
	docs: ["These documents should get me past the guard", "Not very intersting stuff."]
}

//Notes/to do:
//observations about objects, places or characters - new component for object of interest? similar to door
//dialogue left aligned for main character, right aligned for character to talk to or ideally 2 separate containers - too complicated?
//dialogue - timing? choice of enter key or wait