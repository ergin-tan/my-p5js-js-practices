let size;
let level = 0;
var i = 0;

setInterval(function() {
    var titles = ['Menger Sponge Fractal', '0,1,2,3 for fractal level'];
    if (i === titles.length) {
        i = 0;
    }
    document.title = titles[i];
    i++;
}, 2000);

window.addEventListener('keydown', (event) => {
    switch (event.key) {
    case '0':
        level = 0;
    break;
    case '1':
        level = 1;
    break;
    case '2':
        level = 2;
    break;
    case '3':
        level = 3;
    break;
    }
});


function setup(){
    createCanvas(innerWidth,innerHeight, WEBGL);
    size = width/4;
}

function draw(){
    background(120);
    orbitControl();
    fractal(size, level);
}

function fractal(size, level){
    if(level==0){
        box(size);
    }
    else{
        let s = size/3;
    fill(255);
    for (let i = -1; i<2 ; i++){
        for (let j = -1; j<2 ; j++){
            for (let k = -1; k<2 ; k++){
                let x = i*s;
                let y = j*s;
                let z = k*s ;
                if ((i==0 && j==0) ||
                (i==0 && k==0) || (j==0 && k==0)) {
                }
                else{
                    push();
                    translate(x, y, z);
                    fractal(s, level-1);
                    pop();
                }
            }
        }
    }
    }
}