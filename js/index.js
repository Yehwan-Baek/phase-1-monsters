document.addEventListener("DOMContentLoaded", () => {let monsterContainer = document.querySelector("#monster-container")
    let limit = 50;
    let offset = 0;

    function getMonsters() {
        fetch(`http://localhost:3000/monsters?_limit=${limit}&_start=${offset}`)
        .then( (res) => res.json())
        .then( (data) => {
            addMonsters(data);
            offset += limit;
        })
    }

    function addMonsters(monsters) {
        monsterContainer.innerHTML = "";
        monsters.forEach( (monster) => {
            let monsterDiv = document.createElement("div")
            monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
            `;
            monsterContainer.appendChild(monsterDiv)
        })
    }

    

    let createMonsterForm = document.createElement("form")
    let createMonsterDiv = document.querySelector("#create-monster")

    let name = document.createElement("input");
    let age = document.createElement("input")
    let description = document.createElement("input")
    let create = document.createElement("input")

    name.type = "text"
    age.type = "text"
    description.type = "text"
    create.type = "submit"

    name.placeholder = "name"
    age.placeholder = "age"
    description.placeholder = "discription"

    createMonsterForm.appendChild(name)
    createMonsterForm.appendChild(age)
    createMonsterForm.appendChild(description)
    createMonsterForm.appendChild(create)

    createMonsterDiv.appendChild(createMonsterForm)

    function createMonster() {
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: name.value,
                age: parseInt(age.value),
                description: description.value
            })
        })
        .then((response) => response.json())
        .then((data) => {
            let monster = [data];
            addMonsters(monster);
        })
    }

    getMonsters();
        
    let back = document.querySelector("#back");
    back.addEventListener("click", () => {
        offset -= limit;
        if (offset < 0) {
            offset = 0;
        }
        getMonsters();
    })

    let forward = document.querySelector("#forward");
    forward.addEventListener("click", () => {
        offset += limit;
        getMonsters();
    })

    createMonsterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        createMonster();
    });
})
    
   

