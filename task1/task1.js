
class Market {
	constructor(...products) {
		this.arr = [];
		for (let i=0;i<products.length;i++) {
			this.arr[i] = products[i];
		}		
	}

	find(item) {
		for (let i=0;i<this.arr.length;i++) {
			for (let key in this.arr[i]) {
				if (this.arr[i].item == item) {
					return this.arr[i];
				}
			}
		}	
		//sconsole.log(`No ${item} in the market`);
		return false;
	}
}

class ProductItem{
	constructor(item,place, price, weight) {
		this.item = item;
		this.place = place;
		this.price = price;
		this.weight = weight;
	}

	getPlace() {
		return this.place;
	}

	getPrice() {
		return this.price;
	}

	getBill() {
		return this.price*this.weight;
	}
}  

class Person {
	constructor() {
		this.items=[];	
	}

	buy(shop,item) {
		if (this.items.length < 15) {
			if (shop.find(item)) {
				this.items.push(shop.find(item));
			}
		}	
		else {
			alert('You can\'t buy anymore');
		}	
	}

	weigh(shop,item) {
		if (shop.find(item)) {
				console.log(`${item} weighs ${shop.find(item).weight}`);
		}	
	}

	shoppingList() {
		let sum = 0;
		for (let i=0; i<this.items.length; i++) {
			console.log(`${this.items[i].item} : ${this.items[i].getBill()}`);
			sum += this.items[i].getBill();
		}
		console.log(`Total: ${sum} \n\n`);
	}
}

const coffee = new ProductItem('coffee','shelf',50,0.5);
const butter = new ProductItem('butter','fridge',15,2);
const apple = new ProductItem('apple','box',20,1.5);
const orange = new ProductItem('orange','shelf',30,1);
const yogurt = new ProductItem('yogurt','fridge',15,2.5);
const cucumber = new ProductItem('cucumber','box',20,2);
const ketchup = new ProductItem('ketchup','shelf',40,0.5);


const market = new Market(coffee,butter,apple,orange,yogurt,cucumber,ketchup);
const person1 = new Person();

console.log(market.find('ketchup')); // ProductItem {item: "ketchup", place: "shelf", price: 40, weight: 0.5}
console.log(market.find('tea')); //false
console.log(apple.getPlace()); //box
person1.buy(market,'apple');
person1.buy(market,'orange');
person1.buy(market,'coffee');
person1.buy(market,'orange');
person1.buy(market,'coffee');
/*person1.buy(market,'orange'); //if you try to buy more then 15 items you'll get an Error
person1.buy(market,'coffee');
person1.buy(market,'orange');
person1.buy(market,'coffee');
person1.buy(market,'orange');
person1.buy(market,'coffee');
person1.buy(market,'orange');
person1.buy(market,'coffee');
person1.buy(market,'orange');
person1.buy(market,'coffee');
person1.buy(market,'orange');
person1.buy(market,'coffee');
*/
person1.shoppingList();
person1.weigh(market,'apple');  //apple weighs 1.5
const person2 = new Person();
person2.buy(market,'butter');
person2.buy(market,'cucumber');
person2.buy(market,'ketchup');
person2.shoppingList();


