const crewmanList = document.getElementById("crewman-table-body");


document.addEventListener("DOMContentLoaded", () => {
	rendercrewmanList(crewmanList);
});

function rendercrewmanList(crewmanListDiv) {
	fetch("https://rocket-project-baav3442g-marinadiniz-plank.vercel.app/crewman")
		.then(response => response.json())
		.then(data => data.forEach(crewman => rendercrewman(
			crewmanListDiv,
			crewman,
			["list-item"]
		))).catch(error => handleRequestError(error, crewmanListDiv));
}

function rendercrewman(parentDiv, crewman, crewmanClasses) {
	crewmanClasses.forEach(crewmanClass => {
		const row = document.createElement("tr");
		const idCell = document.createElement("td");
		const nomeCell = document.createElement("td");
		const editCell = document.createElement("td");
		const deleteCell = document.createElement("td");

		idCell.textContent = crewman.id;
		nomeCell.textContent = crewman.name;

		const editButton = document.createElement("button");
		editButton.classList.add("edit_button");

		const deleteButton = document.createElement("button");
		deleteButton.classList.add("delete_button");

		editButton.addEventListener("click", () => {
		// Abre o formulário de edição preenchido com os dados da linha selecionada
		console.log(`Editar linha ${crewman.id}`);
		});

		deleteButton.addEventListener("click", () => {
		// Remove a linha selecionada da tabela
		row.remove();
		});

		editCell.appendChild(editButton);
		deleteCell.appendChild(deleteButton);

		row.appendChild(idCell);
		row.appendChild(nomeCell);
		row.appendChild(editCell);
		row.appendChild(deleteCell);
		

		parentDiv.appendChild(row);
		countCrewman();
	});
}

function handleRequestError(error, parentDiv, colorClass) {
	if (parentDiv) {
		var childDiv = document.createElement("div");
		childDiv.classList.add("list-item");
		childDiv.classList.add(colorClass);
		childDiv.innerHTML = "<strong>Error: </strong> " + error.message;
		parentDiv.appendChild(childDiv);
	}
}

function countCrewman(){
	var rowCount = document.getElementById("crewman-table-body").rows.length;
	localStorage.setItem("crewman_qnt", rowCount);
}