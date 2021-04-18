let particles = [];
let springs = [];
let spacing = 20;

let k = 0.1;

function setup() {
    createCanvas(1264, 640);

    for(let i = 0; i < 20; i++) {
        particles[i] = new Particle(width / 2, i * spacing);
        if(i !== 0) {
            let a = particles[i];
            let b = particles[i - 1];
            let spring = new Spring(k, spacing, a, b);
            springs.push(spring);
        }
    }

    particles[0].locked = true;

    gravity = createVector(0, 0.08);
}

function draw() {
    background(112, 50, 126);

    for(let s of springs) {
        s.update();
        s.show();
    }

    noFill();
    stroke(255);
    strokeWeight(8);
    let head = particles[0];
    curveVertex(head.position.x, head.position.y);
    beginShape();
    for(let p of particles) {
        p.applyForce(gravity);
        p.update();
        vertex(p.position.x, p.position.y);
        // p.show();
    }
    endShape();
    let tail = particles[particles.length - 1];
    curveVertex(tail.position.x, tail.position.y);

    if(mouseIsPressed) {
        tail.position.set(mouseX, mouseY);
        tail.velocity.set(0, 0);
    }
}
