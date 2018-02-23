export default class OS {

	constructor (input) {
		this.input;
		this.cursor;
		this.bootupMessage = [
		"********** lemaraOS v0.0.1 ***********************<br>",
		"(c) 1979 Kellehan Coporation, all rights reserved.<br>",
		"Password "];
		this.ready = false;
		this.loggedIn = false;
		this.passwordTry = '';
		this.passcode = 'pee';
		this.programs = [];
		this.display;
	}

	send(message, user) {
		
		if (this.loggedIn && this.ready) {
			let newLine = document.createElement('p');
			this.input.insertAdjacentElement('beforebegin', newLine);
			this.input.innerHTML = "";
			if (user === true) {
				newLine.innerHTML = '> ';
				newLine.innerHTML += message + "<br>";
			} else {
				newLine.innerHTML += message + "<br>";
			}
			// If the command is a program
			if (this.programs.map(a => a.name).includes(message)) {
				this.programs.filter(a => a.name == message)[0].run(this);
			// If the command is likely a mispelt program
			} else if (this.programs.map(a => a.name.slice(0, -2)).includes(message)) {
				this.send(`Did you mean ${message}()?`);
			} else if (message.match(/d/)){
				console.log(`hit: ${message}`)
			}
			
		} else {
			if (this.passwordTry == this.passcode) {
				this.input.innerHTML = "";
				this.loggedIn = true;
				this.bootMsg.innerHTML += '<br>Login successful<br>';
				this.programs.filter(a => a.name == 'welcome()')[0].run(this);
			} else {
				this.input.innerHTML = "";
				this.passwordTry = '';
			}
		}

		this.display.scrollTo(0,this.display.clientHeight);
	}

	boot(display) {
		this.display = display;
		this.display.style.paddingBottom = "60px";
		this.input = document.createElement('p');
		this.cursor = document.createElement('span');
		this.bootMsg = document.createElement('span');
		this.cursor.classList.add("lem__inline","lem__hidden");
		this.input.classList.add("lem__inline","lem__hidden","lem__user-input");
		display.appendChild(this.bootMsg);
		display.appendChild(this.input);
		display.appendChild(this.cursor);
		let self = this;
		// turn blinker on
		setInterval(function () {
			let blinker = self.cursor.innerHTML;
			blinker == "" ? blinker = "▮" : blinker = "";
			self.cursor.innerHTML = blinker;
		},600);

		window.addEventListener("keydown", function(event) {
			// scroll to input on keypress
			self.display.scrollTo(0,self.display.clientHeight);
			// Input character
			if (event.key.length == 1 && self.loggedIn) {
				self.input.innerHTML += event.key;
			} else if (event.key.length == 1) { 
				self.passwordTry += event.key;
				self.input.innerHTML += "*";
			}
			// backspace character
			if (event.key == 'Backspace') { 
				self.input.innerHTML = self.input.innerHTML.slice(0, -1);
			}
			if (!self.loggedIn && event.key == 'Backspace') {
				self.passwordTry = self.passwordTry.slice(0, -1);
				console.log(self.passwordTry);
			}
			// submit a message
			if (event.key == 'Enter') {
				let message = self.input.innerHTML;
				self.send(message, true);
			}
		});
		this.onStartup();
	}

	onStartup() {
		for (let i = 0; i < this.bootupMessage.length; i ++) {
			this.bootMsg.innerHTML += this.bootupMessage[i];
		}
		this.ready = true;
		this.cursor.classList.remove("lem__hidden");
		this.input.classList.remove("lem__hidden");
	}
}