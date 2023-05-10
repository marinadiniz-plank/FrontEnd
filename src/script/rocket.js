document.addEventListener("DOMContentLoaded", () => {
	var rocketList = document.getElementById("rocketList");
	renderRocketList(rocketList);
});

function renderRocketList(rocketListDiv) {
	fetch("http://localhost:80/rocket")
		.then(response => response.json())
		.then(data => data.forEach(rocket => renderRocket(
			rocketListDiv,
			rocket,
			["list-item", "rocket"]
		))).catch(error => handleRequestError(error, rocketListDiv, "rocket"));
}

function renderRocket(parentDiv, rocket, rocketClasses) {
	const rocketDiv = document.createElement("div");
	rocketClasses.forEach(rocketClass => rocketDiv.classList.add(rocketClass));
	rocketDiv.innerHTML = "" +
		"<strong>ID:</strong> " + rocket.id +
		"<br><strong>Name:</strong> " + rocket.name;
	parentDiv.appendChild(rocketDiv);
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