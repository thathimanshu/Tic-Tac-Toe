const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#turn");
let x = [];
let o = [];
const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const options = new Array(9).fill("-1");
let idx = 0;
let currPlayer = 1;
initialize();
function initialize(){
    statusText.textContent="X's turn"
    //document.querySelector("#start").textContent='Restart';
    //document.querySelector("#start").addEventListener("click",startGame());
    for(let cell of cells){
        /* cell.addEventListener("click", ()=>{
            let srcc = currPlayer == 1 ? "x" : "c";  
            let img = document.createElement('img');
            img.src=`assets/${srcc}.svg`
            img.classList.add("tick");
            cell.appendChild(img);
            currPlayer = currPlayer == 1 ? 2: 1;
        }); */
        cell.addEventListener("click",cellClick);
    }
}
function cellClick(){
    const cellIdx = this.getAttribute("cellIndex");
    if(options[cellIdx]!=-1){
        console.log("CLicked twice");
        return;
    }
    updateCell(this,cellIdx);
    checkWinner();
    
}
function updateCell(cell,idx){
    options[idx] = currPlayer;
    let srcc = currPlayer == 1 ? "x" : "c";  
    let img = document.createElement('img');
    img.src=`assets/${srcc}.svg`
    img.classList.add("tick");
    cell.appendChild(img);
    currPlayer = currPlayer == 1 ? 2: 1;
}
function changePlayer(){

}
function checkWinner(){

}
function restartGame(){
    
}
