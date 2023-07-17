// Sample data - replace with your own data
const data = [
    { title: 'Comic Book 1', category: 'Comic Books' },
    { title: 'Comic Book 2', category: 'Comic Books' },
    { title: 'Movie 1', category: 'Movies' },
    { title: 'Movie 2', category: 'Movies' }
  ];
  
// Get references to HTML elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const mediaType = document.getElementById('media-type');
  
  // // Function to display search results
  // function displayResults(results) {
  //   searchResults.innerHTML = '';
  //   if (results.length > 0) {
  //     results.forEach(item => {
  //       const resultItem = document.createElement('div');
  //       resultItem.innerHTML = `${item.title} - ${item.category}`;
  //       searchResults.appendChild(resultItem);
  //     });
  //   } else {
  //     const noResults = document.createElement('div');
  //     noResults.textContent = 'No results found.';
  //     searchResults.appendChild(noResults);
  //   }
  // }

// TODO: move to results page
function movieShowDisplay(url){
  fetch(url).then(function (response) {
    // test
    console.log(response);
    if (response.ok) {
      response.json().then(function (movieShowDetails) {
        // test
        console.log(movieShowDetails);

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
          resultItem.textContent = movieShowDetails.results[i].name;

          // add image of each movie/show
          var image = document.createElement('img');
          image.setAttribute('src', movieShowDetails.results[i].image.original_url);
          resultItem.appendChild(image);
          searchResults.appendChild(resultItem);
        }

        // Adds button functionality to each movie button
        for(let i = 0; i < searchResults.children.length; i++) {
          (function (){
            searchResults.children[i].addEventListener('click', function() {getMovieIssues(movieShowDetails.results[i].api_detail_url);}, false);
          }())
          
        }
      })
    }
    else {
      alert("Error: " + response.statusText);
    }
  })
}

function getMovieIssues(startUrl) {
  var url = "https://floating-headland-95050.herokuapp.com/" + startUrl + "?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json";

  // test
  console.log(url);

  // call api for selected movie/show
  fetch(url).then(function (response) {
    if(response.ok) {
      response.json().then(function (movieResults) {
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
                      var issueImage = document.createElement('img');
                      issueImage.setAttribute('src', issueResults.results.image.original_url);
                      issueItem.appendChild(issueImage);
                      searchResults.appendChild(issueItem);
})}})})}})}})}})}

function charSelectDisplay(url) {
  fetch(url).then(function (response) {
    if(response.ok) {
      response.json().then(function(chars) {

        // test
        console.log(chars);

        searchResults.innerHTML = '';

        for(let i = 0; i < chars.results.length; i++) {
          var charItem = document.createElement('button');
          if(chars.results[i].real_name) {
            charItem.textContent = chars.results[i].name + " A.K.A. " + chars.results[i].real_name;
          }
          else {
            charItem.textContent = chars.results[i].name;
          }
          
          var image = document.createElement('img');
          image.setAttribute('src', chars.results[i].image.original_url);
          charItem.appendChild(image);
          searchResults.appendChild(charItem);
        }

        // Adds button functionality to each char button
        for(let i = 0; i < searchResults.children.length; i++) {
          (function (){
            searchResults.children[i].addEventListener('click', function() {getCharInfo(chars.results[i].api_detail_url);}, false);
          }())
        }
      })
    }
  })
}

function getCharInfo(startUrl) {
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
}
  
// Event listener for search button click
// searchButton.addEventListener('click', performSearch);
searchButton.addEventListener('click', function(event) {
  event.preventDefault();

  // make input text lowercase and remove any spaces surrounding it
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Checks if search is not blank
  if(searchTerm){
    // test
    console.log(searchTerm);

    // seach for movie or tv show
    if(mediaType.value == "movies" || mediaType.value == "series_list"){
      var mediaSearchUrl = "https://floating-headland-95050.herokuapp.com/https://comicvine.gamespot.com/api/" + mediaType.value + "/?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json&filter=name:" + searchTerm;

      // test
      console.log(mediaSearchUrl);

      movieShowDisplay(mediaSearchUrl);
    }
    // search for character
    else {
      // TODO: Add character search
      var charSearchUrl = "https://floating-headland-95050.herokuapp.com/https://comicvine.gamespot.com/api/search/?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json&resources=character&query=" + searchTerm;

      // test
      console.log(charSearchUrl);

      charSelectDisplay(charSearchUrl);
    }
  }

  const filteredData = data.filter(item => {
    const title = item.title.toLowerCase();
    return title.includes(searchTerm);
  });
  
  // displayResults(filteredData);
})
