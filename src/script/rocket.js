const rocketList = document.getElementById("rocket-table-body");

document.addEventListener("DOMContentLoaded", () => {
  renderRocketList(rocketList);
});

function renderRocketList(rocketListDiv) {
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
  });
}

function handleRequestError(error, parentDiv) {
  if (parentDiv) {
    var childDiv = document.createElement("div");
    childDiv.classList.add("list-item");
    childDiv.innerHTML = "<strong>Error: </strong> " + error.message;
    parentDiv.appendChild(childDiv);
  }
}

