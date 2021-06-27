
    // Create Dino Constructor
    function DinosaurData(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    } 

    // Create Dino Objects

    let dinosaurArray = [];

    // https://stackoverflow.com/questions/51859358/how-to-read-json-file-with-fetch-in-javascript
    
    fetch("dino.json").then(response => { 
        if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
    }).then(data => {
        let dinoData = data.Dinos;
        console.log(dinoData);
        dinoData.map(dino => {
            let dinoValues = Object.values(dino);
            let dinoConstructor = new DinosaurData(...dinoValues);
            dinosaurArray.push(dinoConstructor);
        });
    }).catch(err => {
        console.log("Not pulling data!");
    });

    // Create Human Object
    // Use IIFE to get human data from form
    let humanArray = [];

    function HumanObject() {
        this.name = document.getElementById("name").value;
        this.feet = document.getElementById("feet").value;
        this.inches = document.getElementById("inches").value;
        this.weight = document.getElementById("weight").value;
        this.diet = document.getElementById("diet").value;
    }

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    DinosaurData.prototype.compareHeight = function () {
        let human = new HumanObject();
        let humanFeet = parseInt(human["feet"]);
        let humanInches = parseInt(human["inches"]);
        let humanTotal = (humanFeet * 12) + humanInches;
        let dinosaurHeight = parseInt(this.height);

        if (dinosaurHeight > humanTotal) {
            return `${this.species} is taller than you!`
        } else if (dinosaurHeight < humanTotal) {
            return `You are taller than ${this.species}!`
        } else {
            return `You are the same height as ${this.species}!`
        }
    }

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    DinosaurData.prototype.compareWeight = function () {
        let human = new HumanObject();
        let humanWeight = parseInt(human["weight"]);
        let dinosaurWeight = parseInt(this.weight);

        if (dinosaurWeight > humanWeight) {
            return `${this.species} weighs more than you!`
        } else if (dinosaurWeight < humanWeight) {
            return `You weigh more than a ${this.species}!`
        } else {
            return `You weigh as much as a ${this.species}!`
        }
    }
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.

    DinosaurData.prototype.compareDiet = function () {
        let human = new HumanObject();
        let humanDiet = human["diet"];
        let humanLowerCase = humanDiet.toLowerCase();
        let dinosaurDiet = this.diet;

        if (dinosaurDiet !== humanLowerCase) {
            return `The ${this.species} prefers a ${dinosaurDiet} diet, while you prefer a ${humanLowerCase} diet`
        } else {
            return `You and the ${this.species} enjoy ${dinosaurDiet} diets!`
        }
    }

    DinosaurData.prototype.dinoWhen = function () {
        return `The ${this.species} existed in the ${this.when} age(s)!`
    }

    DinosaurData.prototype.dinoWhere = function () {
        return `The ${this.species} can be found in ${this.where}!`
    }

    DinosaurData.prototype.dinoFact = function () {
        return `${this.fact}`
    }

    // https://www.geeksforgeeks.org/how-to-select-a-random-element-from-array-in-javascript/

    DinosaurData.prototype.randomFact = function () {
        let arrayOfFacts = [
            this.compareDiet(),
            this.compareHeight(),
            this.compareWeight(),
            this.dinoWhen(),
            this.dinoWhere(),
            this.dinoFact()
            ]

        return arrayOfFacts[Math.floor(Math.random() * arrayOfFacts.length)];
    }

    // Generate Tiles for each Dino in Array
    DinosaurData.prototype.generateUI = function () {
        const grid = document.getElementById("grid");
        const dino = new DinosaurData();
        const tile = document.createElement("div");
        tile.classList.add("grid-item");
        const gridTiles = Array.from(document.getElementsByClassName("grid-item"));

        if (this.species !== "Pigeon") {
            tile.innerHTML = `
                <h3>${this.species}</h3>
                <img class='center' src='images/${this.species}.png'>
                    <p>${this.randomFact()}</p>
                    `;
        } else {
            tile.innerHTML = `
                <h3>${this.species}</h3>
                <img class='center' src='images/${this.species}.png'>
                    <p>All birds are living dinosaurs</p>
                    `;
        }
        grid.append(tile);
    };

    function humanTile() {
        const grid = document.getElementById("grid");
        const human = new HumanObject();
        const dino = new DinosaurData();
        const tile = document.createElement("div");
        tile.classList.add("grid-item");
        const gridTiles = Array.from(document.getElementsByClassName("grid-item"));

        console.log(gridTiles);

        tile.innerHTML = `
                <h3>${human.name}</h3>
                <img class='center' src='images/human.png'>
                    
                    `;
        grid.append(tile);
    }

        // Add tiles to DOM


    const submitButton = document.getElementById("btn");
    const form = document.getElementById("dino-compare");
    // Remove form from screen

    // On button click, prepare and display infographic

    submitButton.addEventListener("click", () => {
                form.style.display = "none";

                (function generateHuman() {
                    let generatedHumanData = new HumanObject();
                
                    humanArray.push(generatedHumanData);
                    dinosaurArray.forEach((arrayInfo) => {
                        return arrayInfo.generateUI();
                    });

                    humanTile();

                    const gridTiles = Array.from(document.getElementsByClassName("grid-item"));
                    const humans = new HumanObject();
                    gridTiles[8].innerHTML = gridTiles[4].innerHTML;
                    gridTiles[4].innerHTML = `
                                    <h3>${humans.name}</h3>
                                    <img class='center' src='images/human.png' >
                                    <p>Just a random human</p>
                                    `;
                })();
    });