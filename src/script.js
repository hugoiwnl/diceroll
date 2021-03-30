const startbutton=document.getElementById("start");
var score, roundscore, activePlayer;
document.addEventListener("DOMContentLoaded", ()=>{
    startbutton.addEventListener("click",gamestart);
    refresh();
})

document.querySelector("#new").addEventListener('click',function(){
    location.reload();
})
document.querySelector("#scb1").addEventListener('click',function(){
    document.querySelector(".startgame").style.display="none";
    document.querySelector(".playgame").style.display="none";
    document.querySelector(".endgame").style.display="none";
    document.querySelector(".scores").style.display="block";
})

function gamestart(){
    let name1=document.getElementById("player1").value;
    if(name1.length<1){
        name1="Player 1";
    }
    let name2=document.getElementById("player2").value;
    if(name2.length<1){
        name2="Player 2";
    }
    $("#name1").text(name1);
    $("#name2").text(name2);
    document.querySelector(".current-score1").innerHTML="0";
    document.querySelector(".current-score2").innerHTML="0";
    document.querySelector(".current1").innerHTML="0";
    document.querySelector(".current2").innerHTML="0";
    document.getElementById("name1").style.color= "#EB4D4D";
    document.getElementById("name2").style.color= "black";
    document.querySelector(".current1").style.color= "#EB4D4D";
    document.querySelector(".current2").style.color= "black";
    document.querySelector(".startgame").style.display="none";
    document.querySelector(".playgame").style.display="block";

    score=[0,0];
    activePlayer=1;
    roundscore=0;

    
}
document.querySelector("#roll").addEventListener('click', function(){
    var diceroll=Math.floor(Math.random()*6) + 1;
    var slika='dice-'+diceroll+'.png';
    $("#rolling").attr("src",slika);
    document.querySelector(".rolling").style.display="block";
    if(diceroll!=1){
        document.getElementById("name"+activePlayer).style.color= "#EB4D4D";
        document.querySelector(".current"+activePlayer).style.color= "#EB4D4D";
        roundscore+=diceroll;
        document.querySelector(".current-score"+activePlayer).innerHTML=roundscore;
    }else{
        nextPlayer();
    }
})
function nextPlayer(){
    roundscore=0;
    document.querySelector(".current-score"+activePlayer).innerHTML=0;

    if(activePlayer==1){
        activePlayer=2;
        document.getElementById("name2").style.color= "#EB4D4D";
        document.getElementById("name1").style.color= "black";
        document.querySelector(".current2").style.color= "#EB4D4D";
        document.querySelector(".current1").style.color= "black";

    }else{
        activePlayer=1;
        document.getElementById("name1").style.color= "#EB4D4D";
        document.getElementById("name2").style.color= "black";
        document.querySelector(".current1").style.color= "#EB4D4D";
        document.querySelector(".current2").style.color= "black";
    }
    
}
document.querySelector("#hold").addEventListener('click',function(){
    score[activePlayer-1]+=roundscore;
    document.querySelector(".current"+activePlayer).innerHTML=score[activePlayer-1];
    if(score[activePlayer-1]>=20){
        addScore();
        endGame(activePlayer);
    }else{
        nextPlayer();
    }
})
function endGame(activePlayer){
    let winner;
    if(activePlayer==1){
        winner=document.getElementById("name1").innerHTML;
    }else{
        winner=document.getElementById("name2").innerHTML;
    }
    $("#winner").text("The winner is "+winner+"!");
    document.querySelector(".playgame").style.display="none";
    document.querySelector(".endgame").style.display="block";
}
document.querySelector("#playagain").addEventListener('click',function(){
    document.querySelector(".endgame").style.display="none";
    gamestart();
})

document.querySelector("#scoreboard").addEventListener('click',function(){
    document.querySelector(".endgame").style.display="none";
    document.querySelector(".scores").style.display="block";
})

document.querySelector("#playagain1").addEventListener('click',function(){
    document.querySelector(".scores").style.display="none";
    gamestart();
})
function addScore(){
    var finalscore=score[0]+"-"+score[1];
    var pl1=document.getElementById("name1").innerHTML;
    var pl2=document.getElementById("name2").innerHTML;
    
    const game = {
        p1: pl1,
        p2: pl2,
        sc: finalscore,
        btn: "del"
    };
    updateTable(game);
    storageF(game);
}
function updateTable(game){
    const table=document.getElementById("scores-table");
    const tr=document.createElement("tr");
    table.appendChild(tr);
    for(const key in game){
        if(key != "btn"){
            const td=document.createElement("td");
            td.innerText=game[key];
            tr.appendChild(td);
        }else{
            const td=document.createElement("td");
            var btn=document.createElement("BUTTON");
            btn.innerText="Delete";
            btn.classList.add("btn-del");
            td.appendChild(btn);
            tr.appendChild(td);
        }
        
    }
}
function storageF(game){
    let gam = JSON.parse(localStorage.getItem("games") || "[]");
    gam.push(game);
    localStorage.setItem("games", JSON.stringify(gam));
}
function refresh(){
    const table=document.getElementById("scores-table");
    let games = JSON.parse(localStorage.getItem("games") || "[]");
    for(const key in games){
        const tr=document.createElement("tr");
        table.appendChild(tr);
        for(const key2 in games[key]){
            if(key2!="btn"){
                const td=document.createElement("td");
                td.innerText=games[key][key2];
                tr.appendChild(td);
            }else{
                const td=document.createElement("td");
                var btn=document.createElement("BUTTON");
                btn.innerText="Delete";
                btn.classList.add("btn-del");
                td.appendChild(btn);
                tr.appendChild(td);
            }
            
        }
    }
}
document.querySelector("#scores-table").addEventListener('click',delRow);

function delRow(e){
    if(!e.target.classList.contains("btn-del")){
        return;
    }
    const btn= e.target;
    var ind=btn.closest("tr").rowIndex;
    storageR(ind-1);
    btn.closest("tr").remove();
}
function storageR(place){
    var gam = JSON.parse(localStorage.getItem("games") || "[]");
    gam.splice(place - 1, 1);
    localStorage.setItem("games", JSON.stringify(gam));
}
function sortTable(index){
    var table, rows, switching, i ,x ,y, shouldSwitch;
    table=document.getElementById("scores-table");
    switching=true;
    while(switching){
        switching=false;
        rows=table.rows;
        for(i=1; i<(rows.length-1); i++){
            shouldSwitch=false;
            x = rows[i].getElementsByTagName("td")[index];
            y = rows[i+1].getElementsByTagName("td")[index];
            
            if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
                shouldSwitch=true;
                break;
            }
            
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
    }
    
}

th=document.getElementsByTagName('th');
for (let index = 0; index < th.length; index++) {
    th[index].addEventListener('click',item(index));
    
}
function item(index){
    return function(){
        sortTable(index);

    }
}