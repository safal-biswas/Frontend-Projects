const bg = document.querySelector('.bg');
const percentage = document.getElementById('percentage');

let load = 0;

let percentage_event = setInterval(blurring, 30);

function blurring() {
    load++;
    if(load==100){
        clearInterval(percentage_event);
    }
    percentage.innerText = `${load}%`;

    let op = (100-load)/100;
    percentage.style.opacity = op;
    
    let blur_amount = 100-load;
    bg.style.filter = `blur(${blur_amount}px)`;
}