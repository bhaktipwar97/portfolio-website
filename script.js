 emailjs.init("d651txoOMMUYn4X4x"); // <- replace with your public key

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.send("service_vn44axp", "template_kpbtb8s", {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      time: new Date().toLocaleString()
    })
    .then(function () {
      status.innerHTML = "✅ Message Sent Successfully!";
      status.style.color = "#00ffcc";
      form.reset();
    })
    .catch(function (error) {
      status.innerHTML = "❌ Failed to send message!";
      status.style.color = "red";
      console.log(error);
    });
  });

//3///
const canvas = document.getElementById("bg");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const total = 150;

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() * 2 - 1) * 1.2;
    this.vy = (Math.random() * 2 - 1) * 1.2;
    this.size = 2;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    // sparkle effect
    c.fillStyle = "white";
    c.shadowColor = "#ef1212"; // glow color
    c.shadowBlur = 8;           // glow strength
    c.fill();
    c.shadowBlur = 0;           // reset shadow
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // bounce edges
    if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
    if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;

    // subtle sparkle effect
    this.size = 1.5 + Math.random() * 2; // size fluctuates between 1.5 and 3.5
  }
}

// Create particles
for (let i = 0; i < total; i++) {
  particles.push(new Particle());
}

// Track mouse/touch
const mouse = { x: null, y: null };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener("touchmove", (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

window.addEventListener("touchend", () => {
  mouse.x = null;
  mouse.y = null;
});

// Draw connections
function connect() {
  for (let a = 0; a < total; a++) {
    for (let b = a; b < total; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 140) {
        c.strokeStyle = "rgba(229, 222, 222, 0.2)";
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(particles[a].x, particles[a].y);
        c.lineTo(particles[b].x, particles[b].y);
        c.stroke();
      }
    }

    // Connect to mouse/finger only if moving
    if (mouse.x !== null && mouse.y !== null) {
      let dxm = particles[a].x - mouse.x;
      let dym = particles[a].y - mouse.y;
      let distMouse = Math.sqrt(dxm * dxm + dym * dym);

      if (distMouse < 150) {
        c.strokeStyle = "rgba(19, 97, 224, 0.5)";
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(particles[a].x, particles[a].y);
        c.lineTo(mouse.x, mouse.y);
        c.stroke();
      }
    }
  }
}

// Animate
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connect();
  requestAnimationFrame(animate);
}

animate();

// Resize canvas
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});



//  let btn=document.querySelector("button");
//  console.dir(btn);
//  btn.onclick=function()
//  {
//   console.log(btn)
//  }










