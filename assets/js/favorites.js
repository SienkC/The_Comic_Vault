const favResults = document.getElementById('fav-results');
var favoritesList = JSON.parse(localStorage.getItem("favorites"));

// check if local storage is not empty
if(favoritesList != null) {
    // Clear results
    favResults.innerHTML = '';

    // display favorite comics from local storage
    for(let i = 0; i < favoritesList.length; i++){
        const bookElement = document.createElement('div');
        bookElement.className = 'result-item';
        bookElement.innerHTML = favoritesList[i];
        // var idNum = bookElement.children[0].id.slice(3);
        bookElement.setAttribute('id', 'issue' + i);
        favResults.appendChild(bookElement);

        var favorite = document.getElementById('fav' + i);
        favorite.checked = true;
    }

    
}
else {
    // display default
}

function saveFav(i){
    var checkbox = document.getElementById('fav' + i);
    var favsSaved = JSON.parse(localStorage.getItem("favorites"));
    var currentIssue = document.getElementById('issue' + i);

    // unchecking box
    if(!(checkbox.checked)){
        // remove from ls
        var index = favsSaved.indexOf(currentIssue.innerHTML);

        if(index > -1){
            favsSaved.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favsSaved));
        }

        // remove from html
        currentIssue.remove();
    }
}