const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#turn");
/* let x = [];
let o = []; */
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
        cell.addEventListener("click",cellClick);
    }
}
function cellClick(){
    const cellIdx = this.getAttribute("cellIndex");
    if(options[cellIdx]!=-1){
        return;
    }
    updateCell(this,cellIdx);
    
}
function updateCell(cell,idx){
    options[idx] = currPlayer;
    let srcc = currPlayer == 1 ? "x" : "c";  
    let img = document.createElement('img');
    img.src=`assets/${srcc}.svg`
    img.classList.add("tick");
    cell.appendChild(img);
    checkWinner(idx,currPlayer);
    currPlayer = currPlayer == 1 ? 2: 1;
}

function checkWinner(){
    for(let check of winCondition){
        if(options[check[0]]!=-1 && options[check[0]]==options[check[1]] && options[check[1]]==options[check[2]]){
            console.log(check);
            playerWins(check);
        }
    }
}
function playerWins(arr) {
    for (let cell of cells) {
        let cellIndex = parseInt(cell.getAttribute('cellIndex'));
        if (arr.includes(cellIndex)) {
            cell.classList.add("win-cell");
        }
    }
}

function restartGame(){
    
}
