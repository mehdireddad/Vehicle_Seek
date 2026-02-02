// Variables globales
let vehicles = [];
let target;
let sliderMaxSpeed;
let sliderMaxForce;

// Initialiser le canvas et les contrôles
function setup() {
  createCanvas(800, 600);
  
  // Créer la population de véhicules
  vehicles = creerVehicules(10);
  
  // Initialiser la cible au centre
  target = createVector(width / 2, height / 2);
  
  // Créer les labels et sliders pour maxSpeed
  createDiv('Vitesse maximale (maxSpeed):');
  sliderMaxSpeed = createSlider(1, 10, 5, 0.5);
  
  // Créer les labels et sliders pour maxForce
  createDiv('Force maximale (maxForce):');
  sliderMaxForce = createSlider(0.1, 1, 0.2, 0.1);
}

// Boucle principale
function draw() {
  background(240);
  
  // Mettre à jour les propriétés des véhicules avec les valeurs des sliders
  let maxSpeedValue = sliderMaxSpeed.value();
  let maxForceValue = sliderMaxForce.value();
  
  // Mettre à jour chaque véhicule
  for (let vehicle of vehicles) {
    // Mettre à jour les paramètres depuis les sliders
    vehicle.maxSpeed = maxSpeedValue;
    vehicle.maxForce = maxForceValue;
    
    // Comportement : chercher la cible
    vehicle.seek(target);
    
    // Mise à jour
    vehicle.update();
    
    // Gestion des bords (wrapping)
    vehicle.edges();
    
    // Affichage
    vehicle.display();
  }
  
  // Afficher la cible
  fill(255, 0, 0);
  noStroke();
  circle(target.x, target.y, 8);
  
  // Afficher les valeurs actuelles des sliders
  fill(0);
  textSize(12);
  text('Vitesse: ' + maxSpeedValue.toFixed(2), 10, height - 30);
  text('Force: ' + maxForceValue.toFixed(2), 10, height - 10);
}

// Fonction pour créer une population de véhicules
function creerVehicules(nb) {
  let population = [];
  for (let i = 0; i < nb; i++) {
    let x = random(width);
    let y = random(height);
    population.push(new Vehicle(x, y));
  }
  return population;
}

// Mettre à jour la cible quand la souris bouge
function mouseMoved() {
  target.x = mouseX;
  target.y = mouseY;
}
