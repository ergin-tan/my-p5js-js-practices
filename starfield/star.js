var i = 0;
var colorindis = 7;
var colors = ["red", "green", "blue", "yellow", "orange", "magenta", "cyan", "white", "purple"];
var theme = colors[colorindis];
var isRGBMode = false;

setInterval(function() {
    var titles = ['S T A R F I E L D', '0,1,2,3 for animation speed', 'w,a,s,d,n for direction', 'z,x,r for color'];
    if (i === titles.length) {
        i = 0;
    }
    document.title = titles[i];
    i++;
}, 1500);

const canvas = document.getElementById('starfield');
const context = canvas.getContext('2d');

let stars = [];
let animationX = 2;
let animationY = 2;
let animationSpeed = 10;
const numStars = 1000;

function start() {
    resizeCanvas();
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
    animate();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function Star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * canvas.width;
    this.radius = Math.random() * 1.5;
    this.updateColor();
}

Star.prototype.updateColor = function() {
    if (isRGBMode) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        this.color = `rgb(${r},${g},${b})`;
    } else {
        this.color = colors[colorindis];
    }
};

Star.prototype.update = function() {
    this.z -= animationSpeed;
    if (this.z <= 0) {
    this.z = canvas.width;
    }
};

Star.prototype.draw = function() {
    const x = (this.x - canvas.width / 2) * (canvas.width / this.z);
    const y = (this.y - canvas.height / 2) * (canvas.width / this.z);

    const radius = this.radius * (canvas.width / this.z) * 2;
    context.beginPath();
    context.arc(x + canvas.width / animationX, y + canvas.height / animationY, radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
};

function updateStarColors() {
    stars.forEach(star => {
    star.updateColor();
    });
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
    case 'z':
        colorindis = (colorindis + 1) % colors.length;
        theme = colors[colorindis];
        updateStarColors();
        console.log(colorindis);
        console.log(theme);
    break;
    case 'x':
        colorindis = (colorindis - 1 + colors.length) % colors.length;
        theme = colors[colorindis];
        updateStarColors();
        console.log(colorindis);
        console.log(theme);
    break;
    case 'r':
        isRGBMode = !isRGBMode;
        updateStarColors();
        console.log('RGB Mode:', isRGBMode);
    break;
    case 'w':
        animationY = 4;
    break;
    case 'a':
        animationX = 4;
    break;
    case 's':
        animationY = 1.5;
    break;
    case 'd':
        animationX = 1.5;
    break;
    case 'n':
        animationX = 2;
        animationY = 2;
    break;
    case '0':
        animationSpeed = 10;
    break;
    case '1':
        animationSpeed = 25;
    break;
    case '2':
        animationSpeed = 50;
    break;
    case '3':
        animationSpeed = 125;
    break;
    }
});

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
    star.update();
    star.draw();
});
    requestAnimationFrame(animate);
}

start();