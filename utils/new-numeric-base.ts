interface NewBaseInterface {
	base: string[];
	encode: (integer: number) => string;
	decode: (value: string) => number;
}

export const NewBase: NewBaseInterface = {
	base: (() => {
		let i: number;
		let base: string[] = [];
		for (i = 0; i < 10; i++) { base.push(i.toString()); }               // 0 até 9
		for (i = 65; i < 91; i++) { base.push(String.fromCharCode(i)); }    // A até Z
		for (i = 97; i < 123; i++) { base.push(String.fromCharCode(i)); }   // a até z

		return base;
	})(),
	encode: (integer: number): string => {

		const base = NewBase.base;

		if (integer === undefined || integer === null || integer < 0 || Number.isNaN(integer) || /^[0-9]+$/.test(integer.toString()) === false) {
			return '';
		}

		if (integer < base.length) {
			return base[integer];
		}

		let quocientes: number[] = [];
		let divNumber = integer;
		do {
			let div = Math.floor(divNumber / base.length);
			let resto = divNumber - (base.length * div);
			quocientes.push(resto);
			divNumber = div;
		} while (divNumber >= base.length);
		quocientes.push(divNumber);

		return quocientes.reverse().map((curr, i) => {
			return base[curr];
		}).join('');
	},
	decode: (value: string): number => {
		const base = NewBase.base;

		if (value === undefined || value === null || value.length === 0 || /^[a-zA-Z0-9]+$/.test(value) === false) {
			return 0;
		}

		if (value.length <= 1) {
			return base.indexOf(value);
		}

		let somar: number[] = [];
		value.split(/(?<=)/).reverse().map((curr, i) => {
			const dec = base.indexOf(curr);
			const numPos = dec * (Math.pow(base.length, i));
			somar.push(numPos);
		});
		return somar.reduce((a, b) => a + b, 0)
	}
}

export const encode = NewBase.encode;
export const decode = NewBase.decode;
