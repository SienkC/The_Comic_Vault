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

              // loop through all results
              for(let i = 0; i < movieShowDetails.results.length; i++) {
                var resultItem = document.createElement('button');
                resultItem.textContent = movieShowDetails.results[i].name;
                var image = document.createElement('img');
                image.setAttribute('src', movieShowDetails.results[i].image.original_url);
                resultItem.appendChild(image);
                searchResults.appendChild(resultItem);
              }
          })
      }
      else {
          alert("Error: " + response.statusText);
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
