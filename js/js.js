'use strict'

let contactData;

const getContactData = (array) => {

	let inputContactName = document.getElementById('inputContactName').value;
	let inputContactNumber = document.getElementById('inputContactNumber').value;
	let inputContactAddress = document.getElementById('inputContactAddress').value;

	if (inputContactName && inputContactNumber && inputContactAddress) {
		contactData.push({
			inputContactName,
			inputContactNumber,
			inputContactAddress
		})

		localStorage.setItem('contactDataObj', JSON.stringify(contactData));

		appendDataToTable(contactData)

	} else {
		alert("no has completado todos los datos")
	}

}

const appendDataToTable = (arr) => {

	const listaGroup = document.querySelectorAll(".list-group"); //limpiar lista de contactos

	for (let i = 0; i < listaGroup.length; i++) {
		listaGroup[i].remove()
	}

	for (let i = 0; i < arr.length; i++) {

		let nameNumberAndAddress = document.createTextNode(`Nombre: ${arr[i].inputContactName} | Número: ${arr[i].inputContactNumber} | Dirección: ${arr[i].inputContactAddress}`);

		let contactList_ul = document.createElement("ul");
		let contactListColumn_li = document.createElement("li");
		let contactListDelete_img = document.createElement("img");

		contactListDelete_img.src = 'img/1x/baseline_delete_black_24dp.png';

		contactList_ul.classList.add("list-group");
		contactListColumn_li.classList.add("list-group-item");
		contactListDelete_img.classList.add("material-icons");



		contactList_ul.appendChild(contactListColumn_li);
		contactListColumn_li.appendChild(nameNumberAndAddress);
		contactListColumn_li.appendChild(contactListDelete_img);

		contactListDelete_img.onclick = function() {
			deleteSomeContact(`${Number(i)}`);
		};

		let showContactData = document.getElementById('showContactData');

		showContactData.appendChild(contactList_ul);

	}

}

const deleteSomeContact = (buttonNum) => {

	contactData.splice(buttonNum, 1)

	localStorage.setItem('contactDataObj', JSON.stringify(contactData));

	appendDataToTable(contactData)

	alert("elemento borrado: " + buttonNum)

}
	 contactData = JSON.parse(localStorage.getItem('contactDataObj'));

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('buttonGetData').addEventListener('click', getContactData);

	if (!contactData) {
		contactData = [];
	}

	appendDataToTable(contactData)


})

