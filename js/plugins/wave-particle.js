let canvasnav;
let gridXSize = 10;
let gridYSize = 5;
let spectrumData = new Array(gridXSize).fill(1);
let direction = new Array(gridXSize).fill(1);
let speed = new Array(gridXSize).fill(0).map(() => Math.random() * 0.2 + 0.1);
let particles = [];
let originalPositions = [];
let centralRow;
let attract = false;

function setup() {
  canvasnav = createCanvas(180, 70); // Increase the size of the canvas
  canvasnav.parent('particles-nav');
  canvasnav.id('pt-hd-nav');
  noStroke();
  frameRate(50); // Slow down the movement

  // Initialize particles
  let circleDiameter = (width * 0.7) / gridXSize; // Use 80% of the width for the grid
  let circleRadius = circleDiameter / 2;
  let offsetX = (width - circleDiameter * gridXSize) / 2; // Calculate the offset for the x position
  centralRow = Math.floor(gridYSize / 2);
  for (let i = 0; i < gridXSize; i++) {
    particles[i] = [];
    originalPositions[i] = [];
    for (let j = 0; j < gridYSize; j++) {
      let x = i * circleDiameter + circleRadius + offsetX;
      let distanceFromCenter = Math.abs(j - centralRow);
      let y;
      if (j < centralRow) {
        y = height / 2 - (distanceFromCenter * circleDiameter);
      } else {
        y = height / 2 + (distanceFromCenter * circleDiameter);
      }
      particles[i][j] = createVector(x, y);
      originalPositions[i][j] = createVector(x, y);
    }
  }
}

// function mousePressed() {
//   if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
//     attract = true;
//     document.body.style.userSelect = 'none'; // prevent text selection
//   }
// }

// function mouseReleased() {
//   attract = false;  
//   document.body.style.userSelect = 'auto'; // allow text selection
// }

function ease(x) {
  return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
}

let smoothedSpectrumData = new Array(gridXSize).fill(1);
let smoothingFactor = 0.8; // Adjust this value to change the amount of smoothing (0 = no smoothing, 1 = infinite smoothing)


let breakpoint = 20; // Define the breakpoint variable

function draw() {
  clear();

  // Check if mouse is too far outside the canvas
  if (mouseX < -breakpoint || mouseX > width + breakpoint || mouseY < -breakpoint || mouseY > height + breakpoint) {
    attract = false;
  }

  // Update spectrumData with random values
  for (let i = 0; i < gridXSize; i++) {
    spectrumData[i] += direction[i] * speed[i];
    if (spectrumData[i] >= gridYSize + 1 || spectrumData[i] <= 0) {
      direction[i] *= -1;
    }
	// Apply low-pass filter to spectrumData[i]
    smoothedSpectrumData[i] = smoothingFactor * smoothedSpectrumData[i] + (1 - smoothingFactor) * spectrumData[i];
  }

  for (let i = 0; i < gridXSize; i++) {
    for (let j = 0; j < gridYSize; j++) {
      let particle = particles[i][j];
      let originalPosition = originalPositions[i][j];
      let mouse = createVector(mouseX, mouseY);

      let fromMouseToParticle = p5.Vector.sub(particle, mouse);
      let distanceToMouse = fromMouseToParticle.mag();

      let fromParticleToTarget = p5.Vector.sub(originalPosition, particle);
      let distanceToTarget = fromParticleToTarget.mag();

      let totalForce = createVector(0, 0);

      // if mouse is within 50 pixels, calculate a repulsive force
      // if (distanceToMouse < 100) {
      //   let repulsionForce = map(distanceToMouse, 0, 100, 7.0, 0.0);
      //   fromMouseToParticle.setMag(repulsionForce);
      //   totalForce.add(fromMouseToParticle);
      // }

      // if particle is not at target, calculate an attractive force
      if (distanceToTarget > 0) {
        let attractionForce = map(distanceToTarget, 0, width, 0.0, 40.0);
        fromParticleToTarget.setMag(attractionForce);
        totalForce.add(fromParticleToTarget);
      }

      // if attract is true, calculate an attractive force towards the mouse
      if (attract) {
        let attractionForce = p5.Vector.sub(mouse, particle);
        let distance = attractionForce.mag();
        let strength = map(distance, 0, width, 7, 37); // attraction strength decreases with distance
        attractionForce.setMag(strength);
        totalForce.add(attractionForce);
      }

      // add the forces to the position
      particle.add(totalForce);

      let distanceFromCenter = Math.abs(j - centralRow);
      let opacity = map(distanceFromCenter, 0, smoothedSpectrumData[i] / 2, 255, 0);
      fill(color(0, 207, 221, opacity));
      ellipse(particle.x, particle.y, 8, 8);
    }
  }
}