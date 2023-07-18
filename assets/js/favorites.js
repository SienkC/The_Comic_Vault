const favResults = document.getElementById('fav-results');
var favoritesList = JSON.parse(localStorage.getItem("favorites"));

// check if local storage is not empty
if(favoritesList != null) {
    // Clear results
    favResults.innerHTML = '';

    // display favorite comics from local storage
    for(let i = 0; i < favoritesList.length; i++){
        var issueItem = document.createElement('div');
        issueItem.setAttribute('id', 'issue' + i);

        var favorite = document.createElement('input');
        favorite.setAttribute('type', 'checkbox');
        favorite.setAttribute('class', 'favorite');
        favorite.setAttribute('id', 'fav' + i);
        favorite.setAttribute('data-img-url', favoritesList[i]);
        favorite.setAttribute('onclick', 'removeFav(' + i +')');
        issueItem.appendChild(favorite);


        var issueImage = document.createElement('img');
        issueImage.setAttribute('src', favoritesList[i]);
        issueItem.appendChild(issueImage);
        favResults.appendChild(issueItem);

        // all are checked since this is favorites section
        favorite.checked = true;
    }
}
else {
    // display default
}

function removeFav(i){
    var checkbox = document.getElementById('fav' + i);
    var favsSaved = JSON.parse(localStorage.getItem("favorites"));
    var currentIssue = document.getElementById('issue' + i);

    // unchecking box
    if(!(checkbox.checked)){
        // remove from ls
        var index = favsSaved.indexOf(checkbox.getAttribute('data-img-url'));
        if(index > -1){
            favsSaved.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favsSaved));
        }

        // remove from html
        currentIssue.remove();
    }
}