// Classe Vehicle - Comportement autonome avec seek
class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    
    this.maxSpeed = 5;
    this.maxForce = 0.2;
  }

  // Chercher une cible (Seek behavior)
  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);
    
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    
    this.applyForce(steer);
  }

  // Appliquer une force
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Mettre à jour la position
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // Wrapping des bords : réapparition de l'autre côté
  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  // Afficher le véhicule
  display() {
    let angle = this.velocity.heading();
    
    fill(200);
    stroke(0);
    strokeWeight(2);
    
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    triangle(15, 0, -15, -10, -15, 10);
    pop();
  }
}
