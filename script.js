// SCROLL ANIMATION USING INTERSECTION OBSERVER
const srElements = document.querySelectorAll('.scroll-reveal');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.1 });

srElements.forEach(el => observer.observe(el));
const typedText = document.getElementById("typed-text");

const phrases = [
  "Modern Websites,",
  "Responsive Portfolios &",
  "High-Converting Landing Pages"
];

let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function type() {
  isEnd = false;
  typedText.innerHTML = currentPhrase.join('');

  if (!isDeleting && j < phrases[i].length) {
    currentPhrase.push(phrases[i][j]);
    j++;
    typedText.innerHTML = currentPhrase.join('');
  }

  if(isDeleting && j <= phrases[i].length){
    currentPhrase.pop();
    j--;
    typedText.innerHTML = currentPhrase.join('');
  }

  if(j == phrases[i].length){
    isEnd = true;
    isDeleting = true;
  }

  if(isDeleting && j === 0){
    currentPhrase = [];
    isDeleting = false;
    i++;
    if(i >= phrases.length){
      i = 0;
    }
  }

  const speedUp = 50;
  const normalSpeed = 100;
  const time = isEnd ? 1500 : isDeleting ? speedUp : normalSpeed;
  setTimeout(type, time);
}

type();
/* Particles Moving */
const sections = document.querySelectorAll("section");

sections.forEach(section => {
  const canvas = section.querySelector(".section-particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = section.offsetWidth;
  canvas.height = section.offsetHeight;

  const particlesArray = [];
  const colors = ["#00e5ff", "#22c55e", "#2979ff"];
  const particleCount = 40; // kam quantity
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1; // chhote particles
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  window.addEventListener("resize", () => {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  });
});
