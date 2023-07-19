const favResults = document.getElementById('fav-results');
const backButton = document.getElementById('go-back');
var favoritesList = JSON.parse(localStorage.getItem("favorites"));
var visited = JSON.parse(localStorage.getItem("visitedFavs"));

// check if local storage is not empty
if(favoritesList != null) {
    // Clear results
    favResults.innerHTML = '';

    // display favorite comics from local storage
    for(let i = 0; i < favoritesList.length; i++){
        const bookElement = document.createElement('div');
        bookElement.className = 'result-fav-item';
        bookElement.innerHTML = favoritesList[i];
        bookElement.setAttribute('id', 'issue' + i);
        favResults.appendChild(bookElement);

        // fix ids for all checks and checkfunctions
        var favorite = bookElement.children[0];
        favorite.setAttribute('id', 'fav' + i);
        favorite.setAttribute('onclick', 'saveFav(' + i + ')')
        favorite.checked = true;
    }
    if(favoritesList.length <= 0) {
        backButton.setAttribute('data-intro', 'Go search and save some of your favorite comics!');
    }
    else {
        // info for intro.js
        favResults.children[0].setAttribute('data-intro', 'This is how comics will look when they are saved to your favorites');
        favResults.children[0].children[0].setAttribute('data-intro', 'Remove items from your list by clicking here, but be careful. If you change your mind, you will have to search for it again!');
    }

}
else {
    // display default
    backButton.setAttribute('data-intro', 'Go search and save some of your favorite comics!');
}

function saveFav(i){
    var checkbox = document.getElementById('fav' + i);
    var favsSaved = JSON.parse(localStorage.getItem("favorites"));
    var currentIssue = document.getElementById('issue' + i);

    // unchecking box
    if(!(checkbox.checked)){
        // get matching desc and title
        var currentTitle = currentIssue.innerHTML.split("h3");
        var currentDesc = currentIssue.innerHTML.split("<p>");
        // var tempVar = false;
        var index = -1;

        for(let i = 0; i < favsSaved.length; i++) {
            if(favsSaved[i].includes(currentDesc[2]) && favsSaved[i].includes(currentTitle[1])) {
                index = i;
            }
        }

        if(index > -1){
            favsSaved.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favsSaved));
        }

        // remove from html
        currentIssue.remove();
    }
}

// if user has never been to this page, intro will run
if(visited === null) {
    // save that they've been here in local storage
    localStorage.setItem("visitedFavs", JSON.stringify(true));

    // run intro.js
    introJs().start();
}