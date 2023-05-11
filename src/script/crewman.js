document.addEventListener("DOMContentLoaded", () => {
	var crewmanList = document.getElementById("crewmanList");
	rendercrewmanList(crewmanList);
});

function rendercrewmanList(crewmanListDiv) {
	fetch("http://localhost:80/crewman")
		.then(response => response.json())
		.then(data => data.forEach(crewman => rendercrewman(
			crewmanListDiv,
			crewman,
			["list-item", "crewman"]
		))).catch(error => handleRequestError(error, crewmanListDiv, "crewman"));
}

function rendercrewman(parentDiv, crewman, crewmanClasses) {
	const crewmanDiv = document.createElement("div");
	crewmanClasses.forEach(crewmanClass => crewmanDiv.classList.add(crewmanClass));
	crewmanDiv.innerHTML = "" +
		"<strong>ID:</strong> " + crewman.id +
		"<br><strong>Name:</strong> " + crewman.name +
        "<br><strong>Patent:</strong> " + crewman.patent;
	parentDiv.appendChild(crewmanDiv);
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