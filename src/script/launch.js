const launchList = document.getElementById("launch-table-body");

document.addEventListener("DOMContentLoaded", () => {
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
    });

    deleteButton.addEventListener("click", () => {
      // Remove a linha selecionada da tabela
      row.remove();
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
