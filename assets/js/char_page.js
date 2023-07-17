const searchResults = document.getElementById('search-results');


var startUrl = localStorage.getItem('tempUrl');
var url = "https://floating-headland-95050.herokuapp.com/" + startUrl + "?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json&field_list=first_appeared_in_issue,issue_credits,name,real_name,deck,image";


fetch(url).then(function (response) {
    if(response.ok) {
        response.json().then(function(charDetails) {

            // test
            console.log(charDetails);

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
            picture.setAttribute('src', charDetails.results.image.original_url);
            searchResults.appendChild(picture);

            var issueList = document.createElement('ul');
            issueList.textContent = "Issues List";

            var issueLimit = 10;

            if(charDetails.results.issue_credits.length < 10) {
                issueLimit = charDetails.results.issue_credits.length;
            }

            for(let i = 0; i < issueLimit; i++) {
                if(!(charDetails.results.issue_credits[i].name == null || charDetails.results.issue_credits[i].name == "")) {
                    var issueName = document.createElement('li');
                    issueName.textContent = charDetails.results.issue_credits[i].name;
                    issueList.appendChild(issueName);
                }
            }

            searchResults.appendChild(issueList);
        })
    }
})
