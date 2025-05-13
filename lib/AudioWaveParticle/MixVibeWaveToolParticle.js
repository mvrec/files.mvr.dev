document.addEventListener("DOMContentLoaded", () => {
  // Check if container exists
  const container = document.getElementById("mvr-particles-tool");

  if (container) {
    const sketch = (p) => {
      let canvas;
      let gridXSize = 9;
      let gridYSize = 5;
      let spectrumData = new Array(gridXSize).fill(1);
      let direction = new Array(gridXSize).fill(1);
      let speed = new Array(gridXSize).fill(0).map(() => Math.random() * 0.2 + 0.1);
      let particles = [];
      let originalPositions = [];
      let centralRow;
      let smoothedSpectrumData = new Array(gridXSize).fill(1);
      let smoothingFactor = 0.8;
      let color1, color2, color3;
      let transitionDuration = 3;
      let mouseIsOverCanvas = false; // Track mouse presence

      const canvasText = "TOOL BY\nMix Vibe Records"; // Text to display
      const textSize = 8; // Font size
      const textYPosition = 0.8; // Vertical position (0-1)
      const showText = true; // Toggle text visibility

      p.setup = () => {
        canvas = p.createCanvas(180, 70);
        canvas.parent("mvr-particles-tool");
        canvas.id("mvr-particles-tool-canvas");
        p.noStroke();
        p.frameRate(60);
        p.colorMode(p.RGB);

        // Mouse event listeners
        canvas.mouseOver(() => (mouseIsOverCanvas = true));
        canvas.mouseOut(() => (mouseIsOverCanvas = false));

        // Color and particle initialization
        color1 = p.color(3, 205, 220);
        color2 = p.color(102, 102, 191);
        color3 = p.color(251, 41, 98);

        // Particle grid setup
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

        // Color transition logic
        let currentTime = p.frameCount / 60;
        let phase = (currentTime / transitionDuration) % 3;
        let lerpAmount = phase % 1;
        let currentColor;

        if (phase < 1) currentColor = p.lerpColor(color1, color2, lerpAmount);
        else if (phase < 2) currentColor = p.lerpColor(color2, color3, lerpAmount);
        else currentColor = p.lerpColor(color3, color1, lerpAmount);

        // Update spectrum data
        for (let i = 0; i < gridXSize; i++) {
          spectrumData[i] += direction[i] * speed[i];
          if (spectrumData[i] >= gridYSize + 1 || spectrumData[i] <= 0) {
            direction[i] *= -1;
          }
          smoothedSpectrumData[i] = smoothingFactor * smoothedSpectrumData[i] + (1 - smoothingFactor) * spectrumData[i];
        }

        // Update particles
        for (let i = 0; i < gridXSize; i++) {
          for (let j = 0; j < gridYSize; j++) {
            let particle = particles[i][j];
            let originalPosition = originalPositions[i][j];
            let totalForce = p.createVector(0, 0);

            // Only process mouse interactions if over canvas
            if (mouseIsOverCanvas) {
              let mousePos = p.createVector(p.mouseX, p.mouseY);
              let toMouse = p5.Vector.sub(particle, mousePos);
              let mouseDistance = toMouse.mag();

              // Repulsion when close
              if (mouseDistance < 50) {
                let repulsionStrength = p.map(mouseDistance, 0, 50, 7, 0);
                toMouse.setMag(repulsionStrength);
                totalForce.add(toMouse);
              }
            }

            // Always apply restoration force
            let toOrigin = p5.Vector.sub(originalPosition, particle);
            if (toOrigin.mag() > 0) {
              let restorationStrength = p.map(toOrigin.mag(), 0, p.width, 0, 40);
              toOrigin.setMag(restorationStrength);
              totalForce.add(toOrigin);
            }
            particle.add(totalForce);

            // Drawing logic
            let distanceFromCenter = Math.abs(j - centralRow);
            let opacity = p.map(distanceFromCenter, 0, smoothedSpectrumData[i] / 2, 255, 0);
            let r = p.red(currentColor);
            let g = p.green(currentColor);
            let b = p.blue(currentColor);

            // Glow effect
            const glowLayers = 2;
            for (let glow = 0; glow < glowLayers; glow++) {
              p.fill(r, g, b, opacity * (0.8 - glow * 0.3));
              p.ellipse(particle.x, particle.y, 2 + glow * 4);
            }

            // Main particle
            p.fill(r, g, b, opacity);
            p.ellipse(particle.x, particle.y, 6, 6);
          }
        }

        // Add text overlay
        if (showText) {
          p.push();
          p.fill("#888888");
          p.textSize(textSize);
          p.textAlign(p.CENTER, p.CENTER);
          p.textStyle(p.BOLD);
          p.textFont("Arial");
          // Position text at center horizontally and custom vertical position
          p.text(canvasText, p.width / 2, p.height * textYPosition);

          // Optional text effects
          p.stroke(0); // Add black outline
          p.strokeWeight(1);
          p.drawingContext.shadowOffsetX = 2;
          p.drawingContext.shadowOffsetY = 2;
          p.drawingContext.shadowBlur = 3;
          p.drawingContext.shadowColor = "rgba(0,0,0,0.5)";

          p.pop();
        }
      };
    };
    new p5(sketch, container);
  } else {
  }
});
