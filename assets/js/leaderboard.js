//To select all necessary elements
const highestScore = document.querySelector('.number-one');
const secondHighestScore = document.querySelector('.number-two')
const thirdHighestScore = document.querySelector('.number-three')
const otherplayersList = document.querySelector('.other-players-list');
const noPlayers = document.querySelector('.no-players');


noPlayers.textContent = 'No highscores yet'


//To retrieve the data from our local storage
const data = JSON.parse(localStorage.getItem('user')).sort((a, b) => {
    return b.correct - a.correct;
});






for(let i = 0; i < data.length; i++){
    if(i === 0){
        highestScore.innerHTML = `<img class="leaderboard-crown" src="../img/crown.svg" alt="">
        <p class="leaderboard-name">${data[0].username}</p>
        <p class="leaderboard-point">${data[0].correct * 50}pt</p>`
        noPlayers.textContent = 'No more highscores'
    }
    if(i === 1){
        secondHighestScore.innerHTML = `<p class="leaderboard-number">2</p>
        <p class="leaderboard-name">${data[1].username}</p>
        <p class="leaderboard-point">${data[1].correct * 50}pt</p>`
        noPlayers.textContent = 'No more highscores'
    }
    if(i === 2){

        thirdHighestScore.innerHTML= `<p class="leaderboard-number">3</p>
        <p class="leaderboard-name">${data[2].username}</p>
        <p class="leaderboard-point">${data[2].correct * 50}pt</p>`
        noPlayers.textContent = 'No more highscores'
    }
    if(i >= 3 && i <= 8){
        const otherPlayers = document.createElement('p');
        otherPlayers.classList.add('player');
        otherPlayers.innerHTML = `#${i+1} <span class="other-player-name">${data[i].username}</span> <span>${data[i].correct * 50}pt</span>`
        otherplayersList.append(otherPlayers);
        noPlayers.remove();
    }

}
// function setTopThree(){
   




// }

// if(data.length >= 3){
//     setTopThree()
// }

















const clearAll = document.querySelector('.leaderboard-clear-all');

//To clear the local storage data
clearAll.addEventListener('click', function(e){
    e.preventDefault();
    localStorage.clear();
    location.reload();
})