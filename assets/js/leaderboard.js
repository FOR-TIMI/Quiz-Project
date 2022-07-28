const clearAll = document.querySelector('.leaderboard-clear-all');

//To clear the local storage data
clearAll.addEventListener('click', function(e){
    e.preventDefault();
    localStorage.clear();
    location.reload();
})