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
let bodyCoords;

function setup() {
  let canvas = createCanvas(400, 400); // Increased canvas size for better visibility
  canvas.parent('monsterCanvas');
  noLoop();
}

function draw() {
  background(220);
  bodyCoords = drawBody(Constitution);
  drawEyes(Intelligence, bodyCoords.eyes);
  drawMouth(Strength, bodyCoords.mouth);
  drawNose(Intelligence, bodyCoords.nose);
  drawArms(Dexterity, bodyCoords.arms);
  drawLegs(Speed, bodyCoords.legs);
  drawAntennaEarHorn(Dexterity, bodyCoords.extra);
}

function slider() {
  document.getElementById("StrengthSlide").addEventListener("input", function() {
    Strength = this.value;
    document.getElementById("StrengthText").innerHTML = "Strength: " + Strength.toString();
    redraw();
  });
  document.getElementById("DexteritySlide").addEventListener("input", function() {
    Dexterity = this.value;
    document.getElementById("DexterityText").innerHTML = "Dexterity: " + Dexterity.toString();
    redraw();
  });
  document.getElementById("ConstitutionSlide").addEventListener("input", function() {
    Constitution = this.value;
    document.getElementById("ConstitutionText").innerHTML = "Constitution: " + Constitution.toString();
    redraw();
  });
  document.getElementById("SpeedSlide").addEventListener("input", function() {
    Speed = this.value;
    document.getElementById("SpeedText").innerHTML = "Speed: " + Speed.toString();
    redraw();
  });
  document.getElementById("IntelligenceSlide").addEventListener("input", function() {
    Intelligence = this.value;
    document.getElementById("IntelligenceText").innerHTML = "Intelligence: " + Intelligence.toString();
    redraw();
  });
}

function reroll() {
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

function main() {
  slider();
  initializePopulation();
  document.getElementById("reroll").onclick = function() { reroll() };
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
  let bodyType = Math.floor(Math.random() * 5);
  let bodyHeight = map(constitution, 1, 15, 100, 200);
  let bodyWidth = map(constitution, 1, 15, 80, 120);
  let coordinates = {
    eyes: { x: width / 2, y: height / 2 - bodyHeight / 4 },
    nose: { x: width / 2, y: height / 2 },
    mouth: { x: width / 2, y: height / 2 + bodyHeight / 4 },
    arms: { x1: width / 2 - bodyWidth / 2 + 10, y1: height / 2, x2: width / 2 + bodyWidth / 2 - 10, y2: height / 2 },
    legs: { x1: width / 2 - bodyWidth / 4, y1: height / 2 + bodyHeight / 2 - 10, x2: width / 2 + bodyWidth / 4, y2: height / 2 + bodyHeight / 2 - 10 },
    extra: { x1: width / 2 - bodyWidth / 4, y1: height / 2 - bodyHeight / 2 + 10, x2: width / 2 + bodyWidth / 4, y2: height / 2 - bodyHeight / 2 + 10 }
  };

  fill(randomColor());
  switch (bodyType) {
    case 0: // Rectangle with rounded corners
      rect(width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2, bodyWidth, bodyHeight, 20);
      coordinates.arms.y1 = coordinates.arms.y2 = height / 2;
      coordinates.legs.y1 = coordinates.legs.y2 = height / 2 + bodyHeight / 2 - 10;
      coordinates.extra.y1 = coordinates.extra.y2 = height / 2 - bodyHeight / 2 + 10;
      break;
    case 1: // Circle
      ellipse(width / 2, height / 2, bodyWidth, bodyWidth);
      coordinates.arms.y1 = coordinates.arms.y2 = height / 2;
      coordinates.legs.y1 = coordinates.legs.y2 = height / 2 + bodyWidth / 2 - 10;
      coordinates.extra.y1 = coordinates.extra.y2 = height / 2 - bodyWidth / 2 + 10;
      break;
    case 2: // Oval
      ellipse(width / 2, height / 2, bodyWidth, bodyHeight);
      coordinates.arms.y1 = coordinates.arms.y2 = height / 2;
      coordinates.legs.y1 = coordinates.legs.y2 = height / 2 + bodyHeight / 2 - 10;
      coordinates.extra.y1 = coordinates.extra.y2 = height / 2 - bodyHeight / 2 + 10;
      break;
    case 3: // Teardrop
      beginShape();
      vertex(width / 2, height / 2 - bodyHeight / 2 + 10);
      bezierVertex(width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 4, width / 2 + bodyWidth / 2, height / 2 + bodyHeight / 2, width / 2, height / 2 + bodyHeight / 2);
      bezierVertex(width / 2 - bodyWidth / 2, height / 2 + bodyHeight / 2, width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 4, width / 2, height / 2 - bodyHeight / 2 + 10);
      endShape(CLOSE);
      coordinates.arms.y1 = coordinates.arms.y2 = height / 2;
      coordinates.legs.y1 = coordinates.legs.y2 = height / 2 + bodyHeight / 2 - 10;
      coordinates.extra.y1 = coordinates.extra.y2 = height / 2 - bodyHeight / 2 + 10;
      break;
    case 4: // Capsule
      rect(width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2, bodyWidth, bodyHeight, bodyWidth / 2);
      coordinates.arms.y1 = coordinates.arms.y2 = height / 2;
      coordinates.legs.y1 = coordinates.legs.y2 = height / 2 + bodyHeight / 2 - 10;
      coordinates.extra.y1 = coordinates.extra.y2 = height / 2 - bodyHeight / 2 + 10;
      break;
  }
  return coordinates;
}

function drawEyes(intelligence, coord) {
  let eyeCount = Math.floor(Math.random() * 3) + 1;
  let eyeSize = map(intelligence, 1, 15, 10, 30);
  let eyeSpacing = eyeSize * 1.5;

  // Randomize colors and shapes for all eyes
  let scleraColor = color(random(255), random(255), random(255));
  let irisColor = color(random(255), random(255), random(255));
  let pupilType = Math.floor(Math.random() * 3); // 0: round, 1: cat-like, 2: demon-like

  fill(scleraColor);
  for (let i = 0; i < eyeCount; i++) {
    let xOffset = (i - (eyeCount - 1) / 2) * eyeSpacing;

    // Draw Sclera
    ellipse(coord.x + xOffset, coord.y, eyeSize, eyeSize);

    // Draw Iris
    fill(irisColor);
    ellipse(coord.x + xOffset, coord.y, eyeSize * 0.6, eyeSize * 0.6);

    // Draw Pupil
    fill(0);
    switch (pupilType) {
      case 0: // Round
        ellipse(coord.x + xOffset, coord.y, eyeSize * 0.3, eyeSize * 0.3);
        break;
      case 1: // Cat-like
        ellipse(coord.x + xOffset, coord.y, eyeSize * 0.15, eyeSize * 0.5);
        break;
      case 2: // Demon-like
        beginShape();
        vertex(coord.x + xOffset - eyeSize * 0.15, coord.y - eyeSize * 0.25);
        vertex(coord.x + xOffset + eyeSize * 0.15, coord.y - eyeSize * 0.25);
        vertex(coord.x + xOffset, coord.y + eyeSize * 0.3);
        endShape(CLOSE);
        break;
    }

    // Reset fill color for the next eye
    fill(scleraColor);
  }
}

function drawMouth(strength, coord) {
  let mouthWidth = map(strength, 1, 15, 20, 60);
  let mouthHeight = map(strength, 1, 15, 5, 20);
  let mouthFangs = true;
  fill(255, 0, 0);
  arc(coord.x, coord.y, mouthWidth, mouthHeight, 0, PI);
  if (mouthFangs) {
    fill(255);
    triangle(coord.x - mouthWidth / 4, coord.y, coord.x - mouthWidth / 6, coord.y + mouthHeight / 2, coord.x - mouthWidth / 3, coord.y + mouthHeight / 2);
    triangle(coord.x + mouthWidth / 4, coord.y, coord.x + mouthWidth / 6, coord.y + mouthHeight / 2, coord.x + mouthWidth / 3, coord.y + mouthHeight / 2);
  }
}

function drawNose(intelligence, coord) {
  let noseType = Math.floor(Math.random() * 3);
  fill(0);
  switch (noseType) {
    case 0: // Single dot
      ellipse(coord.x, coord.y, 10, 10);
      break;
    case 1: // Two dots
      ellipse(coord.x - 5, coord.y, 5, 5);
      ellipse(coord.x + 5, coord.y, 5, 5);
      break;
    case 2: // Two dots in a circle
      ellipse(coord.x - 5, coord.y, 5, 5);
      ellipse(coord.x + 5, coord.y, 5, 5);
      noFill();
      stroke(0);
      ellipse(coord.x, coord.y, 15, 15);
      noStroke();
      break;
  }
}

function drawArms(dexterity, coord) {
  let armLength = map(dexterity, 1, 15, 60, 120);
  let armWidth = 20;
  let armEndWidth = 10;
  fill(randomColor());
  // Left arm
  beginShape();
  vertex(coord.x1, coord.y1);
  bezierVertex(coord.x1 - armLength / 2, coord.y1 - armWidth, coord.x1 - armLength, coord.y1, coord.x1, coord.y1 + armEndWidth);
  endShape(CLOSE);

  // Right arm
  beginShape();
  vertex(coord.x2, coord.y2);
  bezierVertex(coord.x2 + armLength / 2, coord.y2 - armWidth, coord.x2 + armLength, coord.y2, coord.x2, coord.y2 + armEndWidth);
  endShape(CLOSE);
}

function drawLegs(speed, coord) {
  let legHeight = map(speed, 1, 15, 50, 100);
  let legWidth = 20;
  let legEndWidth = 10;
  fill(randomColor());
  rect(coord.x1 - legWidth / 2, coord.y1, legWidth, legHeight, legEndWidth);
  rect(coord.x2 - legWidth / 2, coord.y2, legWidth, legHeight, legEndWidth);
}

function drawAntennaEarHorn(dexterity, coord) {
  let extraType = Math.floor(Math.random() * 3);
  switch (extraType) {
    case 0: // Antennas
      let antennaLength = map(dexterity, 1, 15, 40, 80);
      let antennaCurve = map(dexterity, 1, 15, 5, 20);
      stroke(0);
      strokeWeight(4);
      noFill();
      beginShape();
      vertex(coord.x1, coord.y1);
      quadraticVertex(coord.x1 - antennaCurve, coord.y1 - antennaLength / 2, coord.x1, coord.y1 - antennaLength);
      endShape();
      beginShape();
      vertex(coord.x2, coord.y2);
      quadraticVertex(coord.x2 + antennaCurve, coord.y2 - antennaLength / 2, coord.x2, coord.y2 - antennaLength);
      endShape();
      noStroke();
      fill(0);
      ellipse(coord.x1, coord.y1 - antennaLength, 5, 5);
      ellipse(coord.x2, coord.y2 - antennaLength, 5, 5);
      break;
    case 1: // Ears
      let earSize = map(dexterity, 1, 15, 20, 40);
      let earCurve = map(dexterity, 1, 15, 5, 15);
      fill(randomColor());
      beginShape();
      vertex(coord.x1, coord.y1);
      quadraticVertex(coord.x1 - earSize / 2, coord.y1 - earCurve, coord.x1, coord.y1 - earSize);
      quadraticVertex(coord.x1 + earSize / 2, coord.y1 - earCurve, coord.x1, coord.y1);
      endShape(CLOSE);
      beginShape();
      vertex(coord.x2, coord.y2);
      quadraticVertex(coord.x2 + earSize / 2, coord.y2 - earCurve, coord.x2, coord.y2 - earSize);
      quadraticVertex(coord.x2 - earSize / 2, coord.y2 - earCurve, coord.x2, coord.y2);
      endShape(CLOSE);
      break;
    case 2: // Horns
      let hornSize = map(dexterity, 1, 15, 20, 40);
      let hornWidth = map(dexterity, 1, 15, 5, 20);
      fill(139, 69, 19);
      beginShape();
      vertex(coord.x1, coord.y1);
      quadraticVertex(coord.x1 - hornWidth / 2, coord.y1 - hornSize / 2, coord.x1, coord.y1 - hornSize);
      quadraticVertex(coord.x1 + hornWidth / 2, coord.y1 - hornSize / 2, coord.x1, coord.y1);
      endShape(CLOSE);
      beginShape();
      vertex(coord.x2, coord.y2);
      quadraticVertex(coord.x2 + hornWidth / 2, coord.y2 - hornSize / 2, coord.x2, coord.y2 - hornSize);
      quadraticVertex(coord.x2 - hornWidth / 2, coord.y2 - hornSize / 2, coord.x2, coord.y2);
      endShape(CLOSE);
      break;
  }
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
  for (let i = 0; i < populationSize; i++) {
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

document.addEventListener("DOMContentLoaded", function() {
  main();
});
