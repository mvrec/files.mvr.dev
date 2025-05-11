document.addEventListener("DOMContentLoaded", function () {
  // Only run if particles-nav element exists
  const container = document.getElementById("particles-nav");
  if (!container) {
    console.warn("particles-nav element not found - animation disabled");
    return;
  }

  const sketch = (p) => {
    let gridXSize = 10;
    let gridYSize = 5;
    let spectrumData = new Array(gridXSize).fill(1);
    let direction = new Array(gridXSize).fill(1);
    let speed = new Array(gridXSize).fill(0).map(() => Math.random() * 0.2 + 0.1);
    let particles = [];
    let originalPositions = [];
    let centralRow;
    let attract = false;
    let smoothedSpectrumData = new Array(gridXSize).fill(1);
    let smoothingFactor = 0.8;
    let color1, color2, color3;
    let transitionDuration = 3;

    p.setup = () => {
      let canvas = p.createCanvas(180, 70);
      canvas.parent("particles-nav");
      p.noStroke();
      p.frameRate(60);
      p.colorMode(p.RGB);

      color1 = p.color(3, 205, 220);
      color2 = p.color(102, 102, 191);
      color3 = p.color(251, 41, 98);

      let circleDiameter = (p.width * 0.7) / gridXSize;
      let circleRadius = circleDiameter / 2;
      let offsetX = (p.width - circleDiameter * gridXSize) / 2;
      centralRow = Math.floor(gridYSize / 2);

      for (let i = 0; i < gridXSize; i++) {
        particles[i] = [];
        originalPositions[i] = [];
        for (let j = 0; j < gridYSize; j++) {
          let x = i * circleDiameter + circleRadius + offsetX;
          let distanceFromCenter = Math.abs(j - centralRow);
          let y = j < centralRow ? p.height / 2 - distanceFromCenter * circleDiameter : p.height / 2 + distanceFromCenter * circleDiameter;

          particles[i][j] = p.createVector(x, y);
          originalPositions[i][j] = p.createVector(x, y);
        }
      }
    };

    p.draw = () => {
      p.clear();

      let currentTime = p.frameCount / 60;
      let phase = (currentTime / transitionDuration) % 3;
      let lerpAmount = phase % 1;
      let colorIndex = Math.floor(phase);
      let currentColor;

      if (colorIndex === 0) {
        currentColor = p.lerpColor(color1, color2, lerpAmount);
      } else if (colorIndex === 1) {
        currentColor = p.lerpColor(color2, color3, lerpAmount);
      } else {
        currentColor = p.lerpColor(color3, color1, lerpAmount);
      }

      for (let i = 0; i < gridXSize; i++) {
        spectrumData[i] += direction[i] * speed[i];
        if (spectrumData[i] >= gridYSize + 1 || spectrumData[i] <= 0) {
          direction[i] *= -1;
        }
        smoothedSpectrumData[i] = smoothingFactor * smoothedSpectrumData[i] + (1 - smoothingFactor) * spectrumData[i];
      }

      for (let i = 0; i < gridXSize; i++) {
        for (let j = 0; j < gridYSize; j++) {
          let particle = particles[i][j];
          let originalPosition = originalPositions[i][j];
          let mouse = p.createVector(p.mouseX, p.mouseY);
          let fromMouseToParticle = p5.Vector.sub(particle, mouse);
          let distanceToMouse = fromMouseToParticle.mag();
          let fromParticleToTarget = p5.Vector.sub(originalPosition, particle);
          let distanceToTarget = fromParticleToTarget.mag();
          let totalForce = p.createVector(0, 0);

          // if (distanceToTarget > 0) {
          //   let attractionForce = p.map(distanceToTarget, 0, p.width, 0.0, 40.0);
          //   fromParticleToTarget.setMag(attractionForce);
          //   totalForce.add(fromParticleToTarget);
          // }

          if (attract) {
            let attractionForce = p5.Vector.sub(mouse, particle);
            let distance = attractionForce.mag();
            let strength = p.map(distance, 0, p.width, 7, 37);
            attractionForce.setMag(strength);
            totalForce.add(attractionForce);
          }

          particle.add(totalForce);

          let distanceFromCenter = Math.abs(j - centralRow);
          let opacity = p.map(distanceFromCenter, 0, smoothedSpectrumData[i] / 2, 255, 0);
          let r = p.red(currentColor);
          let g = p.green(currentColor);
          let b = p.blue(currentColor);

          const glowLayers = 2;
          for (let glow = 0; glow < glowLayers; glow++) {
            const glowSize = 2 + glow * 4;
            const glowOpacity = opacity * (0.8 - glow * 0.3);
            p.fill(r, g, b, glowOpacity);
            p.ellipse(particle.x, particle.y, glowSize, glowSize);
          }

          p.fill(r, g, b, opacity);
          p.ellipse(particle.x, particle.y, 6, 6);
        }
      }
    };

    // p.mousePressed = () => {
    //   if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
    //     attract = true;
    //   }
    // };

    // p.mouseReleased = () => {
    //   attract = false;
    // };
  };

  // Initialize p5 sketch only if container exists
  new p5(sketch);
});
