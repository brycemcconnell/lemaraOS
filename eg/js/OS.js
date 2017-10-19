export default class OS {

	constructor (input) {
		this.input;
		this.cursor;
		this.bootupMessage = [
		"********** lemaraOS v0.0.1 ***********************<br>",
		"(c) 1979 Kellehan Coporation, all rights reserved.<br>",
		"Password "];
		this.readyMessage = ["System ready",
		"Type 'help' or 'about' for more information",
		"**************************************************"];
		this.ready = false;
		this.loggedIn = false;
		this.passwordTry = '';
		this.passcode = 'pee';
	}

	send(message, user) {
		if (this.ready) {
			let newLine = document.createElement('p');
			if (user) {
				newLine.innerHTML = '> ';
				newLine.innerHTML += message + "<br>";
			}
			if (this.loggedIn) {
				if (message == 'welcome()') {
					this.readyMessage.forEach(function(msg) {
						newLine.innerHTML += msg +"<br>";
					});
				}
				this.input.insertAdjacentElement('beforebegin', newLine);
				this.input.innerHTML = "";
			} else {
				if (this.passwordTry == this.passcode) {
					this.input.innerHTML = "";
					this.loggedIn = true;
					this.bootMsg.innerHTML += '<br>Login successful<br>';
					this.send('welcome()');
				} else {
					this.input.innerHTML = "";
					this.passwordTry = '';
				}
			}
			
		}
	}

	boot(display) {
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