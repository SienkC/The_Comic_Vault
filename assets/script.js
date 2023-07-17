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
  
  // Function to display search results
  function displayResults(results) {
    searchResults.innerHTML = '';
    if (results.length > 0) {
      results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `${item.title} - ${item.category}`;
        searchResults.appendChild(resultItem);
      });
    } else {
      const noResults = document.createElement('div');
      noResults.textContent = 'No results found.';
      searchResults.appendChild(noResults);
    }
  }

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
                  searchResults.children[i].addEventListener('click', function() {getMovie(movieShowDetails.results[i].api_detail_url);}, false);
                }())
                
              }
          })
      }
      else {
          alert("Error: " + response.statusText);
      }
  })
  }

  function getMovie(startUrl) {
    var url = "https://floating-headland-95050.herokuapp.com/" + startUrl + "?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json";

    // test
    console.log(url);

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

          for(let i = 0; i < tempLength; i++) {
            var charUrl = "https://floating-headland-95050.herokuapp.com/" + movieResults.results.characters[i].api_detail_url + "?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json&field_list=first_appeared_in_issue,name";

            // test
            console.log(charUrl);

            fetch(charUrl).then(function (response) {
              if(response.ok) {
                response.json().then(function (charResults) {
                  // grab id number from url in api results for first issue
                  var issueId = charResults.results.first_appeared_in_issue.api_detail_url.split('issue')[1];
                  var issueUrl = "https://floating-headland-95050.herokuapp.com/https://comicvine.gamespot.com/api/issue" + issueId + "?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json"

                  // test
                  console.log(issueUrl);

                  var issueItem = document.createElement('button');
                  issueItem.textContent = "First appearance of " + charResults.results.name;

                  fetch(issueUrl).then(function (response) {
                    if(response.ok) {
                      response.json().then(function (issueResults) {
                        var issueImage = document.createElement('img');
                        issueImage.setAttribute('src', issueResults.results.image.original_url);
                        issueItem.appendChild(issueImage);
                        searchResults.appendChild(issueItem);
                      })
                    }
                  })
                })}
          })
        }})
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
      }
    }

    const filteredData = data.filter(item => {
      const title = item.title.toLowerCase();
      return title.includes(searchTerm);
    });
  
    // displayResults(filteredData);
  })
