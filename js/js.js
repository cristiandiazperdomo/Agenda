'use strict'

let contactData;

const URL_CONTACT = "https://agenda-de-contactos-2021.herokuapp.com/apiv1/contact"
const getContactData = async(array) => {

	let inputContactName = document.getElementById('inputContactName');
	let inputContactNumber = document.getElementById('inputContactNumber');
	let inputContactAddress = document.getElementById('inputContactAddress');

	let contactName = inputContactName.value;
	let contactNumber = inputContactNumber.value;
	let contactAddress = inputContactAddress.value;

	if (contactName && contactNumber && contactAddress) {
		await fetch(URL_CONTACT, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				contactName,
				contactNumber,
				contactAddress
			})
		});
		contactData.push({
			contactName,
			contactNumber,
			contactAddress
		})

		console.log(contactData)

		//localStorage.setItem('contactDataObj', JSON.stringify(contactData));

		appendDataToTable(contactData);

		inputContactName.value = ""; //limpiar inputs
		inputContactNumber.value = "";
		inputContactAddress.value = "";


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

		let nameNumberAndAddress = document.createTextNode(`Nombre: ${arr[i].contactName} | Número: ${arr[i].contactNumber} | Dirección: ${arr[i].contactAddress}`);

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

		let showContactData = document.getElementById('showContactData'); //los agrego al HTML

		showContactData.appendChild(contactList_ul);

	}

}

const deleteSomeContact = async(buttonNum) => {

	contactData.splice(buttonNum, 1)

	//localStorage.setItem('contactDataObj', JSON.stringify(contactData));

	await fetch(`${URL_CONTACT}/${buttonNum}`, {
		method: "DELETE"
	})

	appendDataToTable(contactData)

	alert("elemento borrado: " + buttonNum)

}


//contactData = JSON.parse(localStorage.getItem('contactDataObj'));

document.addEventListener('DOMContentLoaded',async() => {
	document.getElementById('buttonGetData').addEventListener('click', getContactData);

	
	contactData = await (await fetch(URL_CONTACT)).json() 
	
	if (!contactData) {
		contactData = [];
	}

	appendDataToTable(contactData)

})
