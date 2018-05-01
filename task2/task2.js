class Casino {
	constructor(numberSlotMachine,moneyCasino) {
		this.numberSlotMachine = numberSlotMachine;
		this.moneyCasino = moneyCasino;
		this.arraySlotMachine = [];
		
		let lucky = this.generateLucky(numberSlotMachine);
		for (let i = 1; i < numberSlotMachine; i++) {
			this.arraySlotMachine[i] = new SlotMachine(Math.floor(moneyCasino/numberSlotMachine));
			this.arraySlotMachine[i].number = i;
			if (i === lucky) {
				this.arraySlotMachine[i].luckySlotMachine = true;
			}
		}
		this.arraySlotMachine[0] = new SlotMachine(moneyCasino - (numberSlotMachine-1)*Math.floor(moneyCasino/numberSlotMachine));
		this.arraySlotMachine[0].number = 0;
	}

	generateLucky(number) {
		let num = Math.floor(Math.random()*number);
		return num;
	}

	getMoneyCasino(slots) {
		let sum = 0;
		for (let i = 0; i < this.arraySlotMachine.length; i++) {
			sum += this.arraySlotMachine[i].getMoney();
		}
		return sum;
	}

	getNumberSlotMachine() {
		return this.numberSlotMachine;
	}

	addSlotMachine() {
		this.sortMaxToMinSlotMachine();
		let money = Math.floor(this.arraySlotMachine[0].moneySlotMachine/2);
		this.arraySlotMachine[0].moneySlotMachine = this.arraySlotMachine[0].moneySlotMachine - money;
		this.arraySlotMachine[this.arraySlotMachine.length] = new SlotMachine(money);
		this.arraySlotMachine[this.arraySlotMachine.length-1].number = this.arraySlotMachine.length - 1;
		this.numberSlotMachine = this.numberSlotMachine + 1;
	}

	sortMaxToMinSlotMachine() {
		this.arraySlotMachine.sort(function(a,b) {
			return b.moneySlotMachine - a.moneySlotMachine;
		});
	}	

	removeSlotMachine(number) {
		if (!this.arraySlotMachine.length) {
			alert('Number of SlotMachine is 0. You cannot remove a SlotMachine anymore');
		}
		let num;

		this.sortMaxToMinSlotMachine();
		for (let i = 0; i<this.arraySlotMachine.length; i++) {
			if (this.arraySlotMachine[i].number === number) {
				num = i;  //find SlotMachine by its number to remove
				break;
			}
		}
		if (num === undefined) {
			return alert(`SlotMachine with number ${number} doesn't exist `);
		}	
		
		let money = this.arraySlotMachine[num].getMoney(); //amount of money in SlotMachine with number 'num'
		for (let i = 0; i<this.arraySlotMachine.length; i++) {
			this.arraySlotMachine[i].moneySlotMachine += Math.floor(money/(this.arraySlotMachine.length-1));  //other SlotMachines get money from removed SlotMachine
		}
		
		let remainder = money - (this.arraySlotMachine.length - 1)*Math.floor(money/(this.arraySlotMachine.length-1));
		this.arraySlotMachine.splice(num,1);
		this.numberSlotMachine = this.arraySlotMachine.length;
		this.arraySlotMachine[this.arraySlotMachine.length - 1].moneySlotMachine += remainder; //SlotMachine with least balance get 'remainder
	}

	takeMoneyCasino(sum) {
		if (this.moneyCasino < sum) {
			return alert('You can\'t take so much money');
		}
		let needToTake = sum;  //money required to take
		let takenMoney = 0;    //current taken money

		this.sortMaxToMinSlotMachine();
		for (let i = 0; i < this.arraySlotMachine.length; i++) {
			if (needToTake > this.arraySlotMachine[i].moneySlotMachine) {
				takenMoney += this.arraySlotMachine[i].moneySlotMachine;
				needToTake -= this.arraySlotMachine[i].moneySlotMachine;
				this.arraySlotMachine[i].moneySlotMachine = 0;
			}
			else {
				takenMoney += needToTake;
				this.arraySlotMachine[i].moneySlotMachine = this.arraySlotMachine[i].moneySlotMachine  - needToTake;	
				needToTake = 0;
				break;
			}
		}
		return takenMoney;
	}

	getSlotMachineAtNumber(number) {
		for (let i = 0; i<this.arraySlotMachine.length; i++) {
			if (this.arraySlotMachine[i].number === number) {
				return this.arraySlotMachine[i];
			}
		}
	}
}

class SlotMachine {
	constructor(moneySlotMachine) {
		this.moneySlotMachine = moneySlotMachine;
		this.number;    // initial SlotMachine number 
		this.luckySlotMachine = false;
	}

	getMoney() {
		return this.moneySlotMachine;
	}

	takeMoneySlotMachine(money) {
		if (this.moneySlotMachine - money < 0) {
			console.log('You cannot take so much. Please, take a little less');
			console.log(`You can take only ${this.moneySlotMachine}`);
			this.moneySlotMachine = 0;
		}
		else {
			this.moneySlotMachine -= money;
		}		
	}

	putMoney(money) {
		this.moneySlotMachine += money;
	}

	game(bet) {
		let win;
		if (!this.moneySlotMachine) {
			alert(`You can\'t play on this SlotMachine. Balance is 0.`);
			return console.log('Game Over :)');
		}
	
		this.putMoney(bet);
		let generateNumber = Math.floor(Math.random()*900 + 100);
		console.log('Number is: ' + generateNumber);
		let generateNumberArray = generateNumber.toString().split('');

		if (this.luckySlotMachine || (generateNumber === 777)) {
			win = this.getMoney();
			this.moneySlotMachine = 0;
			return console.log('You win: ',win);
		}

		if ((generateNumberArray[0] === generateNumberArray[1]) && (generateNumberArray[1] === generateNumberArray[2])) {
			win = bet*5;
			if (win <= this.getMoney()) {
				this.moneySlotMachine -= win;
				return console.log('You win: ',win);
			}			
			else {
				win = this.getMoney();
				this.moneySlotMachine = 0;
				return console.log('You win: ',win);
			}
		}
		if (generateNumberArray[0] === generateNumberArray[1] || generateNumberArray[0] === generateNumberArray[2] || generateNumberArray[1] === generateNumberArray[2]) {
			win = bet*2;
			if (win <= this.getMoney()) {
				this.moneySlotMachine -= win;
				return console.log('You win: ',win);
			}			
			else {
				win = this.getMoney();
				this.moneySlotMachine = 0;
				return console.log('You win: ',win);
			}
		}

		return console.log('You lost');
	}
}

const casino = new Casino(5,1003);
alert('For watching result, please, open console');
console.log(`Casino has ${casino.getMoneyCasino()}$`);
console.log(`Casino has ${casino.getNumberSlotMachine()} SlotMachines`);
console.log(`Adding new SlotMachine...`);
casino.addSlotMachine();
console.log(`Now Casino has ${casino.getNumberSlotMachine()} SlotMachines`);
console.log('Removal SlotMachine at number 2... All money is shared beetween other SlotMachines');
casino.removeSlotMachine(2);
console.log('Take 350$ from casino');
casino.takeMoneyCasino(350);
console.log(`Now Casino has ${casino.getMoneyCasino()}`);
console.log('Amount of money in SlotMachine at number 4: ', casino.getSlotMachineAtNumber(4).getMoney());
console.log('Take 130$ from SlotMachine at Number 4');
casino.getSlotMachineAtNumber(4).takeMoneySlotMachine(130);
console.log('Now SlotMachine at number 4 has: ', casino.getSlotMachineAtNumber(4).getMoney());
console.log('Take 100$ to SlotMachine at Number 3');
casino.getSlotMachineAtNumber(3).putMoney(100);
console.log('Now SlotMachine at Number 1 has: ', casino.getSlotMachineAtNumber(3).getMoney());
console.log('Play a game in SlotMachine at number 1');
casino.getSlotMachineAtNumber(1).game(20);
console.log('And we have an Error, because SlotMachine at number 1 has no money');
console.log('Play a game in SlotMachine at number 3');
console.log(casino.getSlotMachineAtNumber(3).game(20));
console.log(`Now Casino has ${casino.getMoneyCasino()}`);
console.log(casino.getSlotMachineAtNumber(3).game(20));
console.log(`Now Casino has ${casino.getMoneyCasino()}`);

