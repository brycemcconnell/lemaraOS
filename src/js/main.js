import OS from "./OS.js";
import Program from "./Program.js";

window.os = new OS();

let screen = document.getElementById('screen');

os.boot(screen);

os.programs.push(new Program({
	name: "about()",
	output: [
		"Kellehan Cooperation",
		"Rethinking the vision of tomorrow"
	]
}));
os.programs.push(new Program({
	name: "help()",
	output: [
		"This is the LemaraOS help system",
		"help() - The current view, showing common commands and their use",
		"about() - A description of lemaraOS and the company Kellehan",
	]
}));
os.programs.push(new Program({
	name: "welcome()",
	output: ["System ready",
		"Type 'help()' or 'about()' for more information",
		"**************************************************"
	]
}));