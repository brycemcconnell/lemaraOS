export default class Program {
	constructor(conf) {
		this.name = conf.name;
		this.output = conf.output;
	}
	run(os) {
		this.output.forEach(line => {
			os.send(line);
		});
	}
}