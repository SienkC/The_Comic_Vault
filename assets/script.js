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


const url = 'https://superhero-search.p.rapidapi.com/api/?hero=Spiderman';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4ab2c2ac3bmshf6224c065a76c21p120aecjsn75d6c473154d',
		'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com'
	}
};
console.log(url, options);
try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

  
  // Function to perform search
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = data.filter(item => {
      const title = item.title.toLowerCase();
      return title.includes(searchTerm);
    });
  
    displayResults(filteredData);
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
  