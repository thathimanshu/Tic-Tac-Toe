const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#turn");
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
const options = new Array(9).fill("-1");
let idx = 0;
let currPlayer = 1;
const running = false;
initialize();

function initialize(){
    statusText.textContent="X's turn"
    //document.querySelector("#start").textContent='Restart';
    //document.querySelector("#start").addEventListener("click",startGame());
    for(let cell of cells){
        cell.addEventListener("click",cellClick);
    }
    document.querySelector("#zoom").addEventListener("input",(event)=>{
        for(let cell of cells){
            let zoomValue = event.target.value;
            cell.style.height = zoomValue+"rem";
            cell.style.width = zoomValue+"rem";
        }
    });
}
function cellClick(){
    const cellIdx = this.getAttribute("cellIndex");
    if(options[cellIdx]!=-1){
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
}
function restartGame(){
    
}
