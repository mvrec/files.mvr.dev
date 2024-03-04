let canvasnav;
let gridXSize_nav = 10;
let gridYSize_nav = 5;
let spectrumData_nav = new Array(gridXSize_nav).fill(1);
let direction_nav = new Array(gridXSize_nav).fill(1);
let speed_nav = new Array(gridXSize_nav).fill(0).map(() => Math.random() * 0.2 + 0.1);
let particles_nav = [];
let originalPositions_nav = [];
let centralRow_nav;
function setup() {
  canvasnav = createCanvas(200, 50); // Increase the size of the canvas
  canvasnav.parent('particles-nav');
  canvasnav.id('pt-hd-nav');
  noStroke();
  frameRate(50); // Slow down the movement

  // Initialize particles_nav
  let circleDiameter_nav = (width * 0.8) / gridXSize_nav; // Use 80% of the width for the grid
  let circleRadius_nav = circleDiameter_nav / 2;
  let offsetX_nav = (width - circleDiameter_nav * gridXSize_nav) / 2; // Calculate the offset for the x position
  centralRow_nav = Math.floor(gridYSize_nav / 2);
  for (let i = 0; i < gridXSize_nav; i++) {
    particles_nav[i] = [];
    originalPositions_nav[i] = [];
    for (let j = 0; j < gridYSize_nav; j++) {
      let x_nav = i * circleDiameter_nav + circleRadius_nav + offsetX_nav;
      let distanceFromCenter_nav = Math.abs(j - centralRow_nav);
      let y;
      if (j < centralRow_nav) {
        y = height / 2 - (distanceFromCenter_nav * circleDiameter_nav);
      } else {
        y = height / 2 + (distanceFromCenter_nav * circleDiameter_nav);
      }
      particles_nav[i][j] = createVector(x_nav, y);
      originalPositions_nav[i][j] = createVector(x_nav, y);
    }
  }
}

function ease(x) {
  return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
}

let smoothedspectrumData_nav = new Array(gridXSize_nav).fill(1);
let smoothingFactor_nav = 0.8; // Adjust this value to change the amount of smoothing (0 = no smoothing, 1 = infinite smoothing)

function draw() {
  clear();

  // Update spectrumData_nav with random values
  for (let i = 0; i < gridXSize_nav; i++) {
    spectrumData_nav[i] += direction_nav[i] * speed_nav[i];
    if (spectrumData_nav[i] >= gridYSize_nav + 1 || spectrumData_nav[i] <= 0) {
      direction_nav[i] *= -1;
    }
	// Apply low-pass filter to spectrumData_nav[i]
    smoothedspectrumData_nav[i] = smoothingFactor_nav * smoothedspectrumData_nav[i] + (1 - smoothingFactor_nav) * spectrumData_nav[i];
  }

  for (let i = 0; i < gridXSize_nav; i++) {
    for (let j = 0; j < gridYSize_nav; j++) {
      let _particle = particles_nav[i][j];
      let _originalPosition = originalPositions_nav[i][j];
      let _mouse = createVector(mouseX, mouseY);

      let _fromMouseToParticle = p5.Vector.sub(_particle, _mouse);
      let _distanceToMouse = _fromMouseToParticle.mag();

      let _fromParticleToTarget = p5.Vector.sub(_originalPosition, _particle);
      let _distanceToTarget = _fromParticleToTarget.mag();

      let _totalForce = createVector(0, 0);

      // if mouse is within 50 pixels, calculate a repulsive force
      if (_distanceToMouse < 100) {
        let _repulsionForce = map(_distanceToMouse, 0, 100, 7.0, 0.0);
        _fromMouseToParticle.setMag(_repulsionForce);
        _totalForce.add(_fromMouseToParticle);
      }

      // if particle is not at target, calculate an attractive force
      if (_distanceToTarget > 0) {
        let _attractionForce = map(_distanceToTarget, 0, width, 0.0, 40.0);
        _fromParticleToTarget.setMag(_attractionForce);
        _totalForce.add(_fromParticleToTarget);
      }

      // add the forces to the position
      _particle.add(_totalForce);

      let _distanceFromCenter_nav = Math.abs(j - centralRow_nav);
      let _opacity = map(_distanceFromCenter_nav, 0, smoothedspectrumData_nav[i] / 2, 255, 0);
      fill(color(0, 207, 221, _opacity));
      ellipse(_particle.x, _particle.y, 10, 10);
    }
  }
}