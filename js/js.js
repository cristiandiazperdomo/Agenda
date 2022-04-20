let contacts;

const URL_CONTACT = "https://agenda-de-contactos-2021.herokuapp.com/apiv1/contact"
const getContactInfoFromInputs = async (array) => {

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
		contacts.push({
			contactName,
			contactNumber,
			contactAddress
		})

		//localStorage.setItem('contactsObj', JSON.stringify(contacts));

		appendDataToTable(contacts);

		inputContactName.value = ""; //CLEAN INPUTS
		inputContactNumber.value = "";
		inputContactAddress.value = "";

	} else {
		alert("No has completado todos los datos")
	}

}

const appendDataToTable = (contacts) => {
	const listUl_HTML = document.getElementById('showContactData');

	listUl_HTML.innerHTML = ""; // CLEAN LIST

	for (let i = 0; i < contacts.length; i++) {
		listUl_HTML.innerHTML += `
			<li class="list-group-item">
				Nombre: ${contacts[i].contactName} | Número: ${contacts[i].contactNumber} | Dirección: ${contacts[i].contactAddress}
				<img src="img/1x/baseline_delete_black_24dp.png" alt="delete" onclick={deleteSomeContact(${Number(i)})} />	
			</li>
		`
	}

}

const deleteSomeContact = async (buttonNum) => {

	contacts.splice(buttonNum, 1)

	//localStorage.setItem('contactsObj', JSON.stringify(contacts));

	await fetch(`${URL_CONTACT}/${buttonNum}`, {
		method: "DELETE"
	})

	appendDataToTable(contacts)

}

//contacts = JSON.parse(localStorage.getItem('contactsObj'));

document.addEventListener('DOMContentLoaded', async () => {
	document.getElementById('buttonGetData').addEventListener('click', getContactInfoFromInputs);


	contacts = await (await fetch(URL_CONTACT)).json()

	if (!contacts) {
		contacts = [];
	}

	appendDataToTable(contacts)

})