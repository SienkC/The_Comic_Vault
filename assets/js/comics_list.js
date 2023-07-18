
const searchResults = document.getElementById('search-results');
const directions = document.getElementById('directions');
const searchName = document.getElementById('search-name');

var startUrl = localStorage.getItem('tempUrl');
var favedComics = JSON.parse(localStorage.getItem('favorites'));

var url = "https://floating-headland-95050.herokuapp.com/" + startUrl + "?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json";

searchResults.textContent = "Results may take a few seconds to load...";

// test
console.log(url);

// call api for selected movie/show
fetch(url).then(function (response) {
    if(response.ok) {
        response.json().then(function (movieResults) {
            searchName.textContent = "Showing issues for: " + movieResults.results.name;

            // Clear results
            searchResults.innerHTML = '';

            // limit number of buttons to at most 10
            var tempLength = 10;

            // if there are less than 10 results, save how many
            if (movieResults.results.characters.length < 10){
                tempLength = movieResults.results.characters.length;
            }

            // loop for grabbing characters (max = 10)
            for(let i = 0; i < tempLength; i++) {
                var charUrl = "https://floating-headland-95050.herokuapp.com/" + movieResults.results.characters[i].api_detail_url + "?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json&field_list=first_appeared_in_issue,name";

                // test
                console.log(charUrl);

                // call api for character
                fetch(charUrl).then(function (response) {
                    if(response.ok) {
                    response.json().then(function (charResults) {
                        // grab id number from url in api results for first issue
                        var issueId = charResults.results.first_appeared_in_issue.api_detail_url.split('issue')[1];
                        var issueUrl = "https://floating-headland-95050.herokuapp.com/https://comicvine.gamespot.com/api/issue" + issueId + "?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json"

                        // test
                        console.log(issueUrl);

                        // create button for each issue listing the character that the issue is tied to
                        var issueItem = document.createElement('button');
                        issueItem.textContent = "First appearance of " + charResults.results.name;

                        // call api for character's first issue
                        fetch(issueUrl).then(function (response) {
                            if(response.ok) {
                                response.json().then(function (issueResults) {
                                    var favorite = document.createElement('input');
                                    favorite.setAttribute('type', 'checkbox');
                                    favorite.setAttribute('class', 'favorite');
                                    favorite.setAttribute('data-img-url', issueResults.results.image.original_url)
                                    favorite.setAttribute('id', 'fav' + i);
                                    favorite.setAttribute('onclick', 'saveFav(' + i +')');
                                    issueItem.appendChild(favorite);

                                    var issueImage = document.createElement('img');
                                    issueImage.setAttribute('src', issueResults.results.image.original_url);
                                    issueItem.appendChild(issueImage);
                                    searchResults.appendChild(issueItem);

                                    issueItem.addEventListener('click', function() {
                                        // add info needed to Google Books API function
                                        var passToNextPage = [issueResults.results.volume.name, issueResults.results.issue_number];
                                        localStorage.setItem('comicDets',JSON.stringify(passToNextPage));

                                        // go to books page
                                        location.replace('GooglebooksAPI.html');
                                    })

            //                         // Adds button functionality to each movie button
            // for(let i = 0; i < searchResults.children.length; i++) {
            //     (function (){
            //         searchResults.children[i].addEventListener('click', function() {
            //             localStorage.setItem("tempUrl", movieShowDetails.results[i].api_detail_url);

            //             location.replace('comics_list.html');
            //             // getMovieIssues(movieShowDetails.results[i].api_detail_url);
            //         }, false);
            //     }())
            
            // }

                                    // check ls to see if any comics are currently faved and update checkbox
                                    if(favedComics != null) {
                                        if(favedComics.includes(issueResults.results.image.original_url)) {
                                            favorite.checked = true;
                                        }
                                    }
})}})})}})}})}})

function saveFav(i) {
    var checkbox = document.getElementById('fav' + i);
    var checkboxes = document.getElementsByClassName('favorite');
    var favoritesList = JSON.parse(localStorage.getItem('favorites'));
    var tempList = [];

    if(checkbox.checked) {
        // check if ls has items
        if(favoritesList != null){
            // check if not in ls
            if(!(favoritesList.includes(checkbox.getAttribute('data-img-url')))) {
                favoritesList.push(checkbox.getAttribute('data-img-url'));
                localStorage.setItem('favorites', JSON.stringify(favoritesList));
            }
        }
        // ls has no items
        else {
            tempList.push(checkbox.getAttribute('data-img-url'));
            localStorage.setItem('favorites', JSON.stringify(tempList));
        }
        // check if others match and check all others too
        for(let i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].getAttribute('data-img-url') === checkbox.getAttribute('data-img-url')) {
                checkboxes[i].checked = true;
            }
        }
    }

    else {
        if(favoritesList != null){
            // check if in ls
            if(favoritesList.includes(checkbox.getAttribute('data-img-url'))) {
                var index = favoritesList.indexOf(checkbox.getAttribute('data-img-url'));
                if(index > -1){
                    favoritesList.splice(index, 1);
                    localStorage.setItem('favorites', JSON.stringify(favoritesList));
                }
            }
            // check for others match and uncheck all others too
            for(let i = 0; i < checkboxes.length; i++) {
                if(checkboxes[i].getAttribute('data-img-url') === checkbox.getAttribute('data-img-url')) {
                    checkboxes[i].checked = false;
                }
            }
        }
    }
}