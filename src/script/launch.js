const launchList = document.getElementById("launch-table-body");

const closeAddLaunchModalButton = document.getElementById("add-launch-modal-close-button");
const closeUpdateLaunchModalButton = document.getElementById("update-launch-modal-close-button");
const addLaunchModal = document.getElementById("add-launch-modal");
const updateLaunchModal = document.getElementById("update-launch-modal");
const addLaunchModalForm = document.getElementById("add-launch-modal-form");
const updateLaunchModalForm = document.getElementById("update-launch-modal-form");
const addLaunchButton = document.getElementById("add_btn");

let updateLaunchId;

document.addEventListener("DOMContentLoaded", () => {

  if (addLaunchButton) addLaunchButton.addEventListener("click", () => addLaunchModal.style.display = "block");
	if (closeAddLaunchModalButton) closeAddLaunchModalButton.addEventListener("click", () => addLaunchModal.style.display = "none");
	if (addLaunchModalForm) addLaunchModalForm.addEventListener("submit", (event) => addLaunch(event));

	if (closeUpdateLaunchModalButton) closeUpdateLaunchModalButton.addEventListener("click", () => updateLaunchModal.style.display = "none");
	if (updateLaunchModalForm) updateLaunchModalForm.addEventListener("submit", (event) => updateLaunch(event));

  renderlaunchList(launchList);
});

function renderlaunchList(launchListDiv) {
  fetch("http://localhost:80/launch")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((launch) =>
        renderlaunch(launchListDiv, launch, ["list-item"])
      )
    )
    .catch((error) => handleRequestError(error, launchListDiv));
}

function renderlaunch(parentDiv, launch, launchClasses) {
  launchClasses.forEach((launchClass) => {
    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    const launchCodeCell = document.createElement("td");
    const dateCell = document.createElement("td");
    const successCell = document.createElement("td");
    const rocketCell = document.createElement("td");
    const crewCell = document.createElement("td");
    const editCell = document.createElement("td");
    const deleteCell = document.createElement("td");

    idCell.textContent = launch.id;
    launchCodeCell.textContent = launch.launchCode;
    dateCell.textContent = launch.date;
    successCell.textContent = launch.success;
    rocketCell.textContent = [launch.rocket.id];
    crewCell.textContent = [launch.crew.id];


    const editButton = document.createElement("button");
    editButton.classList.add("edit_button");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete_button");

    editButton.addEventListener("click", () => {
      // Abre o formulário de edição preenchido com os dados da linha selecionada
      console.log(`Editar linha ${launch.id}`);
      editUpdateLaunchModal(launch);
    });

    deleteButton.addEventListener("click", () => {
      // Remove a linha selecionada da tabela
      row.remove();
      deleteLaunch(launch);
      
    });

    editCell.appendChild(editButton);
    deleteCell.appendChild(deleteButton);

    row.appendChild(idCell);
    row.appendChild(launchCodeCell);
    row.appendChild(dateCell);
    row.appendChild(successCell);
    row.appendChild(rocketCell);
    row.appendChild(crewCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    parentDiv.appendChild(row);
    countLaunch();
  });
}

function addLaunch(event) {

	event.preventDefault();

	const createLaunch = {
		launchCode: `${document.getElementById("add-launch-form-launchCode").value}`,
    date: `${document.getElementById("add-launch-form-date").value}`,
    success: `${document.getElementById("add-launch-form-success").value}`,
    rocket: `${document.getElementById("add-launch-form-rocket").value}`,
    crew: `${document.getElementById("add-launch-form-crew").value}`
	};

	fetch(`http://localhost:80/launch`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(createLaunch)
	}).then(async response => {

		if (response.ok) {

			const launchList = document.getElementById("launch-table-body");
			renderLaunchList(launchList);

			addLaunchModal.style.display = "none";

		} else {
			const data = await response.json();
			alert(`Could not create launch\n\n${data.message}`);
		}

	}).catch(error => alert('Sorry, an error ocurred:\n' + error));

}

function updateLaunch(event) {

	event.preventDefault();

	const createLaunch = {
		launchCode: `${document.getElementById("add-launch-form-launchCode").value}`,
    date: `${document.getElementById("add-launch-form-date").value}`,
    success: `${document.getElementById("add-launch-form-success").value}`,
    rocket: `${document.getElementById("add-launch-form-rocket").value}`,
    crew: `${document.getElementById("add-launch-form-crew").value}`
	};

	fetch(`http://localhost:80/launch/${updateLaunchId}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(createLaunch)
	}).then(async response => {

		if (response.ok) {

			const launchList = document.getElementById("launch-table-body");
			renderLaunchList(launchList);

			updateLaunchModal.style.display = "none";

		} else {
			const data = await response.json();
			alert(`Could not update launch:\n\n${data.message}`);
		}

	}).catch(error => alert('Sorry, an error ocurred:\n' + error));

}

function deleteLaunch(launch) {

	const launchId = launch.id;

	console.log(`Delete launch ${launchId}`);

	fetch(`http://localhost:80/launch/${launchId}`, { method: 'DELETE' })
		.then(async response => {

			if (response.ok) {

				const launchList = document.getElementById("launch-table-body");

				renderLaunchList(launchList);

			} else {
				const data = await response.json();
				alert(`Could not delete the launch of id ${launchId}:\n\n${data.message}`);
			}

		}).catch(error => alert('Sorry, an error ocurred:\n' + error));
}

function editUpdateLaunchModal(launch) {
	updateLaunchId = launch.id;
	document.getElementById("update-launch-form-name").value = launch.name
	updateLaunchModal.style.display = "block";
}

function handleRequestError(error, parentDiv) {
  if (parentDiv) {
    var childDiv = document.createElement("div");
    childDiv.classList.add("list-item");
    childDiv.innerHTML = "<strong>Error: </strong> " + error.message;
    parentDiv.appendChild(childDiv);
  }
}

function countLaunch(){
	var rowCount = document.getElementById("launch-table-body").rows.length;
	localStorage.setItem("launch_qnt", rowCount);
}