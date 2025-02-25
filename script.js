const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');


let currentPlayer = "X";
let nextPlayer ="O";
let playerTurn = currentPlayer;

document.querySelector(".player1").textContent =`player1:${currentPlayer}`;
document.querySelector(".player2").textContent =`player2:${nextPlayer}`;


const startGame = () => {    
    gameCells.forEach(cell =>{
        cell.addEventListener('click', handleClick);    
    });
}


const handleClick = (e) =>{
    if(e.target.textContent ===''){
        e.target.textContent = playerTurn;            
        if(checkWin()) {             
        //  console.log(`${playerTurn} is a winner!`);
         ShowAlert(`${playerTurn} is a winner!`)
         disableCells();// Ensure all cells are disabled
        }
        else if(checkTie()){
        //  console.log(`It's a Tie!`)
         ShowAlert(`It's a Tie!`)
         disableCells();
        }
        else{
          changePlayerTurn();
          ShowAlert(`Turn for player:${playerTurn}`);
        } 
     }
}

const changePlayerTurn = () =>{
    if(playerTurn===currentPlayer){
        playerTurn = nextPlayer;
    }
    else{
        playerTurn = currentPlayer;
    }
}
 
const checkWin = () => {
    const winningCondition = 
    [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
for (let i = 0; i < winningCondition.length; i++) {
    const [pos1,pos2,pos3]=winningCondition[i];

    if(gameCells[pos1].textContent!==''&&
       gameCells[pos1].textContent=== gameCells[pos2].textContent &&
       gameCells[pos2].textContent=== gameCells[pos3].textContent){
          return true;
       } 
    
    
    } 
    return false; 
}    
const checkTie =() =>{
   let emptyCellsCount = 0;
   gameCells.forEach(cell => {
    if (cell.textContent ===''){
        emptyCellsCount++;
    }
   });

   return emptyCellsCount === 0 && !checkWin();
}


const disableCells = () => {
    gameCells.forEach(cell =>{
        cell.removeEventListener('click',handleClick);
        cell.classList.add('disabled');
    });
}


const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });

   
    startGame();
}

const ShowAlert = (msg) =>{
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    setTimeout(()=> {
        alertBox.style.display = "none";
    },3000);
}
 

restartBtn.addEventListener('click',restartGame);


startGame();
   