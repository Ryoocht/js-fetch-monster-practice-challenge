const baseUrl = "http://localhost:3000/";
let page = 1;

getMonsters(page);

function getMonsters(page){
    const url = `${baseUrl}monsters/?_limit=50&_page=${page}`;
    fetch(url)
    .then(res => res.json)
    .then(resultObj => showMonsters(resultObj))
    .catch(err => console.log(err));
}

function createMonsterDiv(monsters){
    const div = document.createElement("div"),
        h2 = document.createElement("h2"),
        h3 = document.createElement("h3"),
        p = document.createElement("p");
    h2.textContent = monsters.name;
    h3.textContent = monsters.age;
    p.textContent = monsters.description;

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);
    return div;
}

function showMonsters(monsterArray){
    clearContainer();
    const monsterContainer = document.getElementById("monster-container");
    monsterArray.forEach(monster => {
        const monsterDiv = createMonsterDiv(monster);
        monsterContainer.appendChild(monsterDiv);
    });
}

function clearContainer(){
    document.querySelector("#monster-container").innerHTML = "";
}

function createMonsterForm(){
    const form = document.createElement("form"),
        nameInput = document.createElement("input"),
        ageInput = document.createElement("input"),
        descInput = document.createElement("input"),
        submitBtn = document.createElement("button");
    form.id = "monster-form";
    nameInput.id = "name";
    ageInput.id = "age";
    descInput.id = "description";
    nameInput.placeholder = "name...";
    ageInput.placeholder = "age...";
    descInput.placeholder = "description...";
    submitBtn.textContent = "Create";

    form.appendChild(nameInput);
    form.appendChild(ageInput);
    form.appendChild(descInput);
    form.appendChild(submitBtn);

    form.addEventListener("submit", e => {
        e.preventDefault();
        const monsterObj = formData();
        postMonster(monsterObj);
        clearForm();
    })
}

function formData(){
    let name = document.querySelector("#name"),
        age = document.querySelector("#age"),
        desc = document.querySelector("#description");
    return {
        name: name.value,
        age: parseFloat(age.value),
        description: desc.value
    };
}

function postMonster(monsterObj){
    let url = `${baseUrl}monsters`,
        config = {
            method: "POST",
            header: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(monsterObj)
        };
    fetch(url,config);
}

function clearForm(){
    document.querySelector("#monster-form").reset();
}

function pageEvent(){
    let backBtn = document.querySelector("#back"),
        forwardBtn = document.querySelector("#forward");
    backBtn.addEventListener("click", () => {
        if(page < 1){
            alert("You are already on the first page");
        } else {
            page--;
            getMonsters(page);
        }
    });
    forwardBtn.addEventListener("click", () => {
        page++;
        getMonsters(page);
    });
}