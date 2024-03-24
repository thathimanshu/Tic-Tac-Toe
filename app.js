const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#turn");
const startBtn = document.querySelector("#start");
let turns = [[],[]]; //[x] [o]
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
let options = new Array(9).fill("-1");
let currPlayer = 1;
let running = false;
let gameStarted = false;

document.querySelector("#zoom").addEventListener("input",(event)=>{
    for(let cell of cells){
        let zoomValue = event.target.value;
        cell.style.height = zoomValue+"rem";
        cell.style.width = zoomValue+"rem";
    }
});

startBtn.addEventListener("click",()=>{
    if(!gameStarted){
        startBtn.textContent='Restart';
        initialize();
        gameStarted = true;
    }
    else{
        restartGame();
    }
});
function initialize(){
    running = true;
    statusText.textContent="X's turn"
    if(!gameStarted){
        for(let cell of cells){
            cell.addEventListener("click",cellClick);
        }
    }
}
function cellClick(){
    const cellIdx = this.getAttribute("cellIndex");
    if(!running || options[cellIdx]!=-1){
        return;
    }
    updateCell(this,cellIdx);
    
}

function updateCell(cell,idx){
    removeLightenCell();
    options[idx] = currPlayer;
    let srcc = currPlayer == 1 ? "x" : "c";  
    let img = document.createElement('img');
    img.src=`assets/${srcc}.svg`
    img.classList.add("tick");
    cell.appendChild(img);
    checkWinner(idx,currPlayer);
    turns[currPlayer-1].push(idx);
    currPlayer = currPlayer == 1 ? 2: 1;
    if(running)
    statusText.textContent= currPlayer == 1? "X's turn" : "O's turn"
    lightenCell();
}
function lightenCell(){
    if(turns[currPlayer-1].length==3){
        cells[turns[currPlayer-1][0]].classList.add("lighten");
    }
}
function removeLightenCell(){
    let idx = currPlayer-1;
    if(turns[idx].length!=3){
        return;
    }
    cells[turns[idx][0]].classList.remove("lighten");
    options[turns[idx][0]]=-1;
    cells[turns[idx][0]].innerHTML= "";
    turns[idx].splice(0, 1);
    
}

function checkWinner(){
    for(let check of winCondition){
        if(options[check[0]]!=-1 && options[check[0]]==options[check[1]] && options[check[1]]==options[check[2]]){
            running = false;
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
        else{
            cell.classList.add("lose-cell");
        }
    }
    statusText.textContent = currPlayer == 1? "X wins" : "O wins";
}
function restartGame(){
    removeLightenCell();
    turns = [[],[]];
    options = new Array(9).fill("-1");
    currPlayer = 1;
    let ticks = document.querySelectorAll(".tick");
    for(let tick of ticks){
        tick.parentNode.removeChild(tick);
    }
    for(let cell of cells){
        cell.classList.remove("lose-cell");
        cell.classList.remove("win-cell");
    }
    statusText.textContent= currPlayer == 1? "X's turn" : "O's turn";
    running = true;
}
