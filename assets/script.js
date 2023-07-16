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
  
  // Function to perform search
  function performSearch() {
    // make input text lowercase and remove any spaces surrounding it
    const searchTerm = searchInput.value.toLowerCase().trim();

    // Checks if search is not blank
    if(searchTerm){
      // test
      console.log(searchTerm);

      // seach for movie or tv show
      if(mediaType.value == "movies" || mediaType.value == "series_list"){
        var mediaSearchUrl = "https://comicvine.gamespot.com/api/" + mediaType.value + "/?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json&filter=name:" + searchTerm;

        // test
        console.log(mediaSearchUrl);
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
  }
  
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
  
  // Event listener for search button click
  searchButton.addEventListener('click', performSearch);
  