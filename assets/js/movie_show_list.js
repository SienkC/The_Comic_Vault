const searchResults = document.getElementById('search-results');
const directions = document.getElementById('directions');
const searchName = document.getElementById('search-name');

var url = localStorage.getItem('tempUrl');
var nameGiven = url.split('name:')[1];

searchName.textContent = "Showing results for: " + nameGiven;

if(url.includes('movies')){
    directions.textContent = "Please select your movie";
}
else {
    directions.textContent = "Please select your show";
}

searchResults.textContent = "Results may take a few seconds to load...";

fetch(url).then(function (response) {
    if (response.ok) {
        response.json().then(function (movieShowDetails) {

            // Clear results
            searchResults.innerHTML = '';

            // limit number of buttons to at most 10
            var tempLength = 10;

            // if there are less than 10 results, save how many
            if (movieShowDetails.results.length < 10){
                tempLength = movieShowDetails.results.length;
            }

            // loop through 10 (or less) results
            for(let i = 0; i < tempLength; i++) {
                // create button for each movie/show
                var resultItem = document.createElement('button');
                resultItem.className = "page-button";
                resultItem.textContent = movieShowDetails.results[i].name;

                // add image of each movie/show
                var image = document.createElement('img');
                image.className = 'the-img';
                image.setAttribute('src', movieShowDetails.results[i].image.original_url);
                
                var resultEl = document.createElement('div');
                resultEl.className = 'result-content';

                resultEl.appendChild(image);
                resultItem.appendChild(resultEl);
                searchResults.appendChild(resultItem);
            }

            // Adds button functionality to each movie button
            for(let i = 0; i < searchResults.children.length; i++) {
                (function (){
                    searchResults.children[i].addEventListener('click', function() {
                        localStorage.setItem("tempUrl", movieShowDetails.results[i].api_detail_url);

                        location.replace('comics_list.html');
                    }, false);
                }())
            
            }
        })
    }
    else {
        alert("Error: " + response.statusText);
    }
})
