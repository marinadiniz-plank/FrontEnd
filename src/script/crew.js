const crewList = document.getElementById("crew-table-body");

document.addEventListener("DOMContentLoaded", () => {
	rendercrewList(crewList);
});

function rendercrewList(crewListDiv) {
	fetch("http://localhost:80/crew")
		.then(response => response.json())
		.then(data => data.forEach(crew => rendercrew(
			crewListDiv,
			crew,
			["list-item"]
		))).catch(error => handleRequestError(error, crewListDiv));
}

function rendercrew(parentDiv, crew, crewClasses) {
	crewClasses.forEach(crewClass => {
		const row = document.createElement("tr");
		const idCell = document.createElement("td");
		const nomeCell = document.createElement("td");
		const crewmanCell = document.createElement("td");
		const editCell = document.createElement("td");
		const deleteCell = document.createElement("td");


		idCell.textContent = crew.id;
		nomeCell.textContent = crew.name;
		crewmanCell.textContent = [crew.crewman.map(crewmans => crewmans.id)];
		
	
		const editButton = document.createElement("button");
		editButton.classList.add("edit_button");
	
		const deleteButton = document.createElement("button");
		deleteButton.classList.add("delete_button");

		editButton.addEventListener("click", () => {
			// Abre o formulário de edição preenchido com os dados da linha selecionada
			console.log(`Editar linha ${crew.id}`);
		  });
	  
		  deleteButton.addEventListener("click", () => {
			// Remove a linha selecionada da tabela
			row.remove();
		  });
	  
		  editCell.appendChild(editButton);
		  deleteCell.appendChild(deleteButton);
	  
		  row.appendChild(idCell);
		  row.appendChild(nomeCell);
		  row.appendChild(crewmanCell);
		  row.appendChild(editCell);
		  row.appendChild(deleteCell);
	  
		  parentDiv.appendChild(row);
		  countCrew();
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

function countCrew(){
	var rowCount = document.getElementById("crew-table-body").rows.length;
	localStorage.setItem("crew_qnt", rowCount);
}