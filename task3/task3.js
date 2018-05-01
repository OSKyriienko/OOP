class SuperUser {
	changeDataVisibility() {
		if (this.isDataVisible) {
			this.isDataVisible = false;
		}	
		else {
			this.isDataVisible = true;
		}
	}
}

class User extends SuperUser {
	constructor(name,sex,birthDate,address,phone,email) {
		super();
		this.name = name;
		this.sex = sex;
		this.birthDate = birthDate;
		this.address = address;
		this.phone = phone;
		this.email = email;
		this.isDataVisible = false;
	}

	render(elemDOM) {
		if (this.isDataVisible) {
			//elemDOM.children[0].textContent = '';
			elemDOM.children[1].textContent = '';
			elemDOM.children[2].textContent = '';
			elemDOM.children[3].textContent = '';
			elemDOM.children[4].textContent = '';
			elemDOM.children[5].textContent = '';
		}
		else {
			elemDOM.children[0].textContent = this.name;
			elemDOM.children[1].textContent = this.sex;
			elemDOM.children[2].textContent = this.birthDate;
			elemDOM.children[3].textContent = this.address;
			elemDOM.children[4].textContent = this.phone;
			elemDOM.children[5].textContent = this.email;
		}	
	}	
}



const arrayUsers = [];
const form = document.getElementById('form');
const btn = document.getElementById('btnSave');
const table = document.getElementById('table');
btn.addEventListener('click',function() {
	let name = document.getElementById('name');
	let sex = document.getElementById('sex');
	let birthDate = document.getElementById('birth');
	let address = document.getElementById('address');
	let phone = document.getElementById('phone');
	let email = document.getElementById('email');
	let personInfo = new User(name.value,sex.value,birthDate.value,address.value,phone.value,email.value);
	arrayUsers.push(personInfo);
	let tr = document.createElement('tr');
	let length = document.querySelectorAll('tr').length;   // set attr 'data-number' for each element 'tr'
	tr.dataset.number = length - 1;
	table.appendChild(tr);
	let tdName = document.createElement('td');
	tr.appendChild(tdName);
	let tdSex = document.createElement('td');
	tr.appendChild(tdSex);
	let tdBirthDate = document.createElement('td');
	tr.appendChild(tdBirthDate);
	let tdAddress = document.createElement('td');
	tr.appendChild(tdAddress);
	let tdPhone = document.createElement('td');
	tr.appendChild(tdPhone);
	let tdEmail = document.createElement('td');
	tr.appendChild(tdEmail);
	personInfo.render(tr);    //render info into DOMElement from Instance PersonInfo	
});

table.addEventListener('click',function(event) {
	try {
		let target = event.target.closest('tr');
		let number = target.dataset.number;
		arrayUsers[number].changeDataVisibility();
		arrayUsers[number].render(target);
	}  
	catch(error) {
		alert('While clicking don\'t drag mouse to another cell');
	}
});


