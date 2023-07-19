const searchResults = document.getElementById('search-results');
const directions = document.getElementById('directions');
const searchName = document.getElementById('search-name');

var url = localStorage.getItem('tempUrl');
var nameGiven = url.split('query=')[1];

searchName.textContent = "Showing results for: " + nameGiven;

directions.textContent = "Please select your character";

searchResults.textContent = "Results may take a few seconds to load...";

fetch(url).then(function (response) {
    if(response.ok) {
        response.json().then(function(chars) {

            searchResults.innerHTML = '';

            for(let i = 0; i < chars.results.length; i++) {
                var charItem = document.createElement('button');
                charItem.className = 'page-button';
                if(chars.results[i].real_name) {
                    charItem.textContent = chars.results[i].name + " A.K.A. " + chars.results[i].real_name;
                }
                else {
                    charItem.textContent = chars.results[i].name;
                }
            
                var image = document.createElement('img');
                image.className = 'the-img';
                image.setAttribute('src', chars.results[i].image.original_url);

                var resultEl = document.createElement('div');
                resultEl.className = 'result-content';

                resultEl.appendChild(image);
                charItem.appendChild(resultEl);
                searchResults.appendChild(charItem);
            }

        // Adds button functionality to each char button
        for(let i = 0; i < searchResults.children.length; i++) {
            (function (){
                searchResults.children[i].addEventListener('click', function() {
                    localStorage.setItem("tempUrl", chars.results[i].api_detail_url);

                    location.replace('char_page.html');
                }, false);
            }())}})}})
