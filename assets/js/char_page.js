const searchResults = document.getElementById('search-char-page-results');


var startUrl = localStorage.getItem('tempUrl');
var url = "https://floating-headland-95050.herokuapp.com/" + startUrl + "?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json&field_list=first_appeared_in_issue,issue_credits,name,real_name,deck,image";


searchResults.textContent = "Results may take a few seconds to load...";

fetch(url).then(function (response) {
    if(response.ok) {
        response.json().then(function(charDetails) {

            searchResults.innerHTML = '';

            var title = document.createElement('h1');
            if(charDetails.results.real_name){
                title.textContent = charDetails.results.name + " A.K.A. " + charDetails.results.real_name;
            }
            else{
                title.textContent = charDetails.results.name;
            }

            searchResults.appendChild(title);

            var desc = document.createElement('p');
            desc.textContent = charDetails.results.deck;
            searchResults.appendChild(desc);

            var picture = document.createElement('img');
            picture.className = 'result-content-img';
            picture.setAttribute('src', charDetails.results.image.original_url);
            searchResults.appendChild(picture);

            var issueList = document.createElement('ul');
            issueList.textContent = "Here are some recommended comic issues";

            var issueLimit = 10;

            if(charDetails.results.issue_credits.length < 10) {
                issueLimit = charDetails.results.issue_credits.length;
            }

            for(let i = 0; i < issueLimit; i++) {
                if(!(charDetails.results.issue_credits[i].name == null || charDetails.results.issue_credits[i].name == "")) {
                    var issueNameHolder = document.createElement('li');
                    var issueName = document.createElement('p')
                    issueName.textContent = charDetails.results.issue_credits[i].name;

                    var link = document.createElement('button');
                    link.setAttribute('class', 'page-button');

                    link.addEventListener('click', function() {
                        // add info needed to Google Books API function
                        var clicked = "https://floating-headland-95050.herokuapp.com/" + charDetails.results.issue_credits[i].api_detail_url + "?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json";
                        fetch(clicked).then(function (response) {
                            if(response.ok) {
                                response.json().then(function (issueDets) {

                                    var passToNextPage = [issueDets.results.volume.name, issueDets.results.issue_number];
                                    localStorage.setItem('comicDets',JSON.stringify(passToNextPage));

                                    // go to books page
                                    location.replace('GooglebooksAPI.html');
                                })
                            }
                        })
                        
                    })
                    link.appendChild(issueName);
                    issueNameHolder.appendChild(link);
                    issueList.appendChild(issueNameHolder);
                }
            }

            searchResults.appendChild(issueList);
        })
    }
})
