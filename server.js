let crewmanCount = localStorage.getItem("crewman_qnt");
let crewmanQntElement = document.querySelector('.crewman_qnt');
crewmanQntElement.textContent = crewmanCount;


let crewCount = localStorage.getItem("crew_qnt");
let crewQntElement = document.querySelector('.crew_qnt');
crewQntElement.textContent = crewCount;



let rocketCount = localStorage.getItem("rocket_qnt");
let rocketQntElement = document.querySelector('.rocket_qnt');
rocketQntElement.textContent = rocketCount;



let launchCount = localStorage.getItem("launch_qnt");
let launchQntElement = document.querySelector('.launch_qnt');
launchQntElement.textContent = launchCount;
