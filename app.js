let cells = document.querySelectorAll(".cell");

let turn = 0;
let arr = new Array(9).fill(-1);
let checkWin = ()=>{
    
}
let idx = 0;
for(let cell of cells){
    arr[idx++] = cell;
    cell.addEventListener("click", ()=>{
        let srcc = turn %2 ==0 ? "x" : "c";  
        let img = document.createElement('img');
        img.src=`assets/${srcc}.svg`
        img.classList.add("tick");
        cell.appendChild(img);
        turn++;
    });
}

