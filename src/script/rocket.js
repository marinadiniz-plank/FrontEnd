const rocketList = document.getElementById("rocket-table-body");

const closeAddRocketModalButton = document.getElementById("add-rocket-modal-close-button");
const closeUpdateRocketModalButton = document.getElementById("update-rocket-modal-close-button");
const addRocketModal = document.getElementById("add-rocket-modal");
const updateRocketModal = document.getElementById("update-rocket-modal");
const addRocketModalForm = document.getElementById("add-rocket-modal-form");
const updateRocketModalForm = document.getElementById("update-rocket-modal-form");
const addRocketButton = document.getElementById("add_btn");

const notification = document.getElementById("rocketNotification");


let updateRocketId;

document.addEventListener("DOMContentLoaded", () => {

  if (addRocketButton) addRocketButton.addEventListener("click", () => addRocketModal.style.display = "block");
	if (closeAddRocketModalButton) closeAddRocketModalButton.addEventListener("click", () => addRocketModal.style.display = "none");
	if (addRocketModalForm) addRocketModalForm.addEventListener("submit", (event) => addRocket(event));

	if (closeUpdateRocketModalButton) closeUpdateRocketModalButton.addEventListener("click", () => updateRocketModal.style.display = "none");
	if (updateRocketModalForm) updateRocketModalForm.addEventListener("submit", (event) => updateRocket(event));


  renderRocketList(rocketList);
});

function renderRocketList(rocketListDiv) {
	rocketList.innerHTML = "";
  fetch("http://localhost:80/rocket")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((rocket) =>
        renderRocket(rocketListDiv, rocket, ["list-item"])
      )
    )
    .catch((error) => handleRequestError(error, rocketListDiv));
}

function renderRocket(parentDiv, rocket, rocketClasses) {

  rocketClasses.forEach((rocketClass) => {
    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    const nomeCell = document.createElement("td");
    const editCell = document.createElement("td");
    const deleteCell = document.createElement("td");

    idCell.textContent = rocket.id;
    nomeCell.textContent = rocket.name;

    const editButton = document.createElement("button");
    editButton.classList.add("edit_button");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete_button");

    editButton.addEventListener("click", () => {
      // Abre o formulário de edição preenchido com os dados da linha selecionada
      console.log(`Editar linha ${rocket.id}`);
      editUpdateRocketModal(rocket);
	  showNotification("Successfully, rocket updated!");
    });


    deleteButton.addEventListener("click", () => {
      // Remove a linha selecionada da tabela
      row.remove();
      deleteRocket(rocket);
	  showNotification("Successfully, rocket deleted!");
    });

    editCell.appendChild(editButton);
    deleteCell.appendChild(deleteButton);

    row.appendChild(idCell);
    row.appendChild(nomeCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    parentDiv.appendChild(row);

	countRocket();
  });
}

function addRocket(event) {

	event.preventDefault();

	const createRocket = {
		name: `${document.getElementById("add-rocket-form-name").value}`
	};

	fetch(`http://localhost:80/rocket`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(createRocket)
	}).then(async response => {

		if (response.ok) {

			renderRocketList(rocketList);
			addRocketModal.style.display = "none";
			
		} else {
			const data = await response.json();
			alert(`Could not create rocket\n\n${data.message}`);
		}
		
	}).catch(error => alert('Sorry, an error ocurred:\n' + error));
	showNotification("Successfully, rocket created!")

}

function updateRocket(event) {

	event.preventDefault();

	const createRocket = {
		name: `${document.getElementById("update-rocket-form-name").value}`
	};

	fetch(`http://localhost:80/rocket/${updateRocketId}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(createRocket)
	}).then(async response => {

		if (response.ok) {

			renderRocketList(rocketList);

			updateRocketModal.style.display = "none";

		} else {
			const data = await response.json();
			alert(`Could not update rocket:\n\n${data.message}`);
		}

	}).catch(error => alert('Sorry, an error ocurred:\n' + error));

}

function deleteRocket(rocket) {

	const rocketId = rocket.id;

	console.log(`Delete rocket ${rocketId}`);

	fetch(`http://localhost:80/rocket/${rocketId}`, { method: 'DELETE' })
		.then(async response => {

			if (!response.ok) {
				const data = await response.json();
				alert(`Could not delete the rocket of id ${rocketId}:\n\n${data.message}`);
			}

		}).catch(error => alert('Sorry, an error ocurred:\n' + error));
}

function editUpdateRocketModal(rocket) {
	updateRocketId = rocket.id;
	document.getElementById("update-rocket-form-name").value = rocket.name
	updateRocketModal.style.display = "block";
}

function handleRequestError(error) {
	showNotification(" <strong>Error: </strong> " + error.message);
}

function countRocket(){
	var rowCount = document.getElementById("rocket-table-body").rows.length;
	localStorage.setItem("rocket_qnt", rowCount);
}

function showNotification(message) {
	const notificationContent = document.createElement("div");

	notification.classList.add("rocket-notify-text");
	notification.innerHTML = `<p>${message}</p>`;

	notification.appendChild(notificationContent);
	notification.classList.add('active');
	
	
	setTimeout(function() {
	  notification.classList.remove('active');
	}, 5000);
  }
  