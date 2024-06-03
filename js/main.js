let Strength = 7;
let Dexterity = 7;
let Constitution = 7;
let Speed = 7;
let Intelligence = 7;
const abilities = [
  "Fire Ball",
  "Ice Shard",
  "Thunder Strike",
  "Poison Sting",
  "Healing Plants",
  "Invisibility"
];


function setup() {
  let canvas = createCanvas(400, 400); // Increased canvas size for better visibility
  canvas.parent('monsterCanvas');
  noLoop();
}

function draw() {
  background(220);
  drawBody(Constitution);
  drawEyes(Intelligence);
  drawMouth(Strength);
  drawNose(Intelligence);
  drawAntennas(Dexterity);
  drawEars(Constitution);
  drawHorns(Strength);
  drawArms(Dexterity);
  drawLegs(Speed);
}

function slider(){
  document.getElementById("StrengthSlide").addEventListener("input", function(){
    Strength = this.value;
    document.getElementById("StrengthText").innerHTML = "Strength: "+ Strength.toString();
    redraw();
  });
  document.getElementById("DexteritySlide").addEventListener("input", function(){
    Dexterity = this.value;
    document.getElementById("DexterityText").innerHTML = "Dexterity: "+ Dexterity.toString();
    redraw();
  });
  document.getElementById("ConstitutionSlide").addEventListener("input", function(){
    Constitution = this.value;
    document.getElementById("ConstitutionText").innerHTML = "Constitution: "+ Constitution.toString();
    redraw();
  });
  document.getElementById("SpeedSlide").addEventListener("input", function(){
    Speed = this.value;
    document.getElementById("SpeedText").innerHTML = "Speed: "+ Speed.toString();
    redraw();
  });
  document.getElementById("IntelligenceSlide").addEventListener("input", function(){
    Intelligence = this.value;
    document.getElementById("IntelligenceText").innerHTML = "Intelligence: "+ Intelligence.toString();
    redraw();
  });
}

function reroll(){

  let selectedAbilities = [];
  while (selectedAbilities.length < 2) {
      let randomIndex = Math.floor(Math.random() * abilities.length);
      let ability = abilities[randomIndex];
      if (!selectedAbilities.includes(ability)) {
          selectedAbilities.push(ability);
      }
  }

  document.getElementById("abilitiesList").innerHTML = "";
  selectedAbilities.forEach(function(ability) {
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(ability));
      document.getElementById("abilitiesList").appendChild(li);
  });

  Strength = Math.floor(Math.random() * 15) + 1;
  Dexterity = Math.floor(Math.random() * 15) + 1;
  Constitution = Math.floor(Math.random() * 15) + 1;
  Speed = Math.floor(Math.random() * 15) + 1;
  Intelligence = Math.floor(Math.random() * 15) + 1;

  document.getElementById("StrengthSlide").value = Strength;
  document.getElementById("StrengthText").innerHTML = "Strength: "+ Strength.toString();
  document.getElementById("DexteritySlide").value = Dexterity;
  document.getElementById("DexterityText").innerHTML = "Dexterity: "+ Dexterity.toString();
  document.getElementById("ConstitutionSlide").value = Constitution;
  document.getElementById("ConstitutionText").innerHTML = "Constitution: "+ Constitution.toString();
  document.getElementById("SpeedSlide").value = Speed;
  document.getElementById("SpeedText").innerHTML = "Speed: "+ Speed.toString();
  document.getElementById("IntelligenceSlide").value = Intelligence;
  document.getElementById("IntelligenceText").innerHTML = "Intelligence: "+ Intelligence.toString();
  redraw();
}


function main(){
  slider();
  initializePopulation();
  document.getElementById("reroll").onclick = function(){reroll()};
  document.getElementById("grow").onclick = function() {
    evaluateFitness();
    generateNextPopulation();
    displayBestCreature();
  };
  document.getElementById("battle").addEventListener("click", function() {
    // Hide the battle button
    document.getElementById("battle").style.display = 'none';

    // Hide the user inputs and their corresponding headers
    document.querySelector('.column:nth-child(2)').style.display = 'none'; // Hide the user inputs column

    // Hide the creature's stats and their corresponding header
    document.querySelector('.column:nth-child(3)').style.display = 'none'; // Hide the stats column
    document.querySelector('.column:nth-child(4) h2').style.display = 'none'; // Hide the stats header

    // Generate and add AI creature
   // generateAICreature();
});


}

function drawBody(constitution) {
  let bodyHeight = map(constitution, 1, 15, 100, 200);
  let bodyWidth = map(constitution, 1, 15, 80, 120);
  fill(randomColor());
  ellipse(width / 2, height / 2, bodyWidth, bodyHeight);
}

function drawEyes(intelligence) {
  let eyeSize = map(intelligence, 1, 15, 10, 30);
  let eyeOffsetX = map(intelligence, 1, 15, 20, 40);
  let eyeOffsetY = map(intelligence, 1, 15, 30, 50);
  
  fill(255);
  ellipse(width / 2 - eyeOffsetX, height / 2 - eyeOffsetY, eyeSize, eyeSize);
  ellipse(width / 2 + eyeOffsetX, height / 2 - eyeOffsetY, eyeSize, eyeSize);
  
  fill(0);
  ellipse(width / 2 - eyeOffsetX, height / 2 - eyeOffsetY, eyeSize / 2, eyeSize / 2);
  ellipse(width / 2 + eyeOffsetX, height / 2 - eyeOffsetY, eyeSize / 2, eyeSize / 2);
}

function drawMouth(strength) {
  let mouthWidth = map(strength, 1, 15, 20, 60);
  let mouthHeight = map(strength, 1, 15, 5, 20);
  let mouthOffsetY = map(strength, 1, 15, 40, 60);
  
  fill(255, 0, 0);
  arc(width / 2, height / 2 + mouthOffsetY, mouthWidth, mouthHeight, 0, PI);
}

function drawArms(dexterity) {
  let armLength = map(dexterity, 1, 15, 60, 120);
  let armWidth = 20;
  let armOffsetY = 20;
  
  fill(randomColor());
  // Left arm
  beginShape();
  vertex(width / 2 - 60, height / 2 - armOffsetY);
  bezierVertex(width / 2 - 60 - armLength / 2, height / 2 - armOffsetY - armWidth, width / 2 - 60 - armLength, height / 2 + armOffsetY, width / 2 - 60, height / 2 + armOffsetY);
  endShape(CLOSE);

  // Right arm
  beginShape();
  vertex(width / 2 + 60, height / 2 - armOffsetY);
  bezierVertex(width / 2 + 60 + armLength / 2, height / 2 - armOffsetY - armWidth, width / 2 + 60 + armLength, height / 2 + armOffsetY, width / 2 + 60, height / 2 + armOffsetY);
  endShape(CLOSE);
}

function drawLegs(speed) {
  let legHeight = map(speed, 1, 15, 50, 100);
  let legWidth = 20;
  let legOffsetY = 80;
  
  fill(randomColor());
  rect(width / 2 - 30, height / 2 + legOffsetY, legWidth, legHeight, 10);
  rect(width / 2 + 10, height / 2 + legOffsetY, legWidth, legHeight, 10);
}

function drawNose(intelligence) {
  let noseSize = map(intelligence, 1, 15, 10, 20);
  let noseOffsetY = map(intelligence, 1, 15, 10, 20);
  
  fill(255, 165, 0);
  ellipse(width / 2, height / 2 - noseOffsetY, noseSize, noseSize);
}

function drawAntennas(dexterity) {
  let antennaLength = map(dexterity, 1, 15, 40, 80);
  let antennaOffsetX = 30;
  let antennaOffsetY = 120;

  stroke(0);
  strokeWeight(4);
  line(width / 2 - antennaOffsetX, height / 2 - antennaOffsetY, width / 2 - antennaOffsetX, height / 2 - antennaOffsetY - antennaLength);
  line(width / 2 + antennaOffsetX, height / 2 - antennaOffsetY, width / 2 + antennaOffsetX, height / 2 - antennaOffsetY - antennaLength);
  noStroke();
}

function drawEars(constitution) {
  let earSize = map(constitution, 1, 15, 20, 40);
  let earOffsetX = 40;
  let earOffsetY = 60;
  
  fill(randomColor());
  ellipse(width / 2 - earOffsetX, height / 2 - earOffsetY, earSize, earSize);
  ellipse(width / 2 + earOffsetX, height / 2 - earOffsetY, earSize, earSize);
}

function drawHorns(strength) {
  let hornSize = map(strength, 1, 15, 20, 40);
  let hornOffsetX = 20;
  let hornOffsetY = 80;
  
  fill(139, 69, 19);
  triangle(width / 2 - hornOffsetX, height / 2 - hornOffsetY, width / 2 - hornOffsetX - hornSize / 2, width / 2 - hornOffsetY - hornSize, width / 2 - hornOffsetX + hornSize / 2, width / 2 - hornOffsetY - hornSize);
  triangle(width / 2 + hornOffsetX, height / 2 - hornOffsetY, width / 2 + hornOffsetX - hornSize / 2, width / 2 - hornOffsetY - hornSize, width / 2 + hornOffsetX + hornSize / 2, width / 2 - hornOffsetY - hornSize);
}

function randomColor() {
  return color(random(255), random(255), random(255));
}

class Creature {
    constructor(strength, dexterity, constitution, speed, intelligence) {
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.speed = speed;
        this.intelligence = intelligence;
        this.fitness = 0;
    }

    calculateFitness() {
        this.fitness = this.strength + this.dexterity + this.constitution + this.speed + this.intelligence;
    }
}

let population = [];
const populationSize = 20;
const mutationRate = 0.01;

function initializePopulation() {
    for (let i = 0; i < populationSize; i++) 
    {
        population.push(new Creature(
            Math.floor(Math.random() * 15) + 1,
            Math.floor(Math.random() * 15) + 1,
            Math.floor(Math.random() * 15) + 1,
            Math.floor(Math.random() * 15) + 1,
            Math.floor(Math.random() * 15) + 1
        ));
    }
}

function evaluateFitness() {
    for (let creature of population) {
        creature.calculateFitness();
    }
}

function chooseParent() {
    let overallFitness = population.reduce((sum, creature) => sum + creature.fitness, 0);
    let randomValue = Math.random() * overallFitness;
    let sum = 0;
    for (let creature of population) {
        sum += creature.fitness;
        if (sum > randomValue) {
            return creature;
        }
    }
    return population[0];
}

function crossover(parentOne, parentTwo) {
    let child = new Creature(
        Math.random() < 0.5 ? parentOne.strength : parentTwo.strength,
        Math.random() < 0.5 ? parentOne.dexterity : parentTwo.dexterity,
        Math.random() < 0.5 ? parentOne.constitution : parentTwo.constitution,
        Math.random() < 0.5 ? parentOne.speed : parentTwo.speed,
        Math.random() < 0.5 ? parentOne.intelligence : parentTwo.intelligence
    );

    if (Math.random() < mutationRate) child.strength = Math.floor(Math.random() * 15) + 1;
    if (Math.random() < mutationRate) child.dexterity = Math.floor(Math.random() * 15) + 1;
    if (Math.random() < mutationRate) child.constitution = Math.floor(Math.random() * 15) + 1;
    if (Math.random() < mutationRate) child.speed = Math.floor(Math.random() * 15) + 1;
    if (Math.random() < mutationRate) child.intelligence = Math.floor(Math.random() * 15) + 1;
  
    return child;
}

function generateNextPopulation() {
    let newPopulation = [];
    for (let i = 0; i < populationSize; i++) {
        let parentOne = chooseParent();
        let parentTwo = chooseParent();
        let child = crossover(parentOne, parentTwo);
        newPopulation.push(child);
    }
    population = newPopulation;
}

function displayBestCreature() {
    evaluateFitness();
    let bestCreature = population.reduce((best, creature) => best.fitness > creature.fitness ? best : creature);
    
    Strength = bestCreature.strength;
    Dexterity = bestCreature.dexterity;
    Constitution = bestCreature.constitution;
    Speed = bestCreature.speed;
    Intelligence = bestCreature.intelligence;
  
    document.getElementById("StrengthSlide").value = Strength;
    document.getElementById("StrengthText").innerHTML = "Strength: " + Strength.toString();
    document.getElementById("DexteritySlide").value = Dexterity;
    document.getElementById("DexterityText").innerHTML = "Dexterity: " + Dexterity.toString();
    document.getElementById("ConstitutionSlide").value = Constitution;
    document.getElementById("ConstitutionText").innerHTML = "Constitution: " + Constitution.toString();
    document.getElementById("SpeedSlide").value = Speed;
    document.getElementById("SpeedText").innerHTML = "Speed: " + Speed.toString();
    document.getElementById("IntelligenceSlide").value = Intelligence;
    document.getElementById("IntelligenceText").innerHTML = "Intelligence: " + Intelligence.toString();
    redraw();
}

document.addEventListener("DOMContentLoaded", function(){
    main();
})


