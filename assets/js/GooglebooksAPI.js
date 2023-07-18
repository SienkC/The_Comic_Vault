// function searchBooks() {
//     const searchInput = document.getElementById('searchInput').value;

// get info from ls
const comicDets = JSON.parse(localStorage.getItem('comicDets'));
const searchInput = comicDets[0] + "#" + comicDets[1];
const resultsContainer = document.getElementById('resultsContainer');
resultsContainer.innerHTML = ''; // Clear previous results

const searchedItem = document.createElement('h1');
searchedItem.textContent = "Showing results for " + comicDets[0] + "#" + comicDets[1];
resultsContainer.appendChild(searchedItem);
  
fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchInput)}`)
  .then(response => response.json())
    .then(data => {
      const items = data.items; // Array of books/magazines
  
      if (items && items.length > 0) {
        items.forEach(item => {
          // Extract relevant information from each item
          const title = item.volumeInfo.title;
          const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown';
          const description = item.volumeInfo.description ? item.volumeInfo.description : 'No description available';
          const buyLink = item.saleInfo.buyLink;
          const retailPrice = item.saleInfo.retailPrice ? `$${item.saleInfo.retailPrice.amount}` : 'Price not available';
          const canonicalLink = item.volumeInfo.canonicalVolumeLink;
          const thumbnail = item.volumeInfo.imageLinks?.thumbnail;
  
          // Create an HTML element to display the information
          const bookElement = document.createElement('div');
          bookElement.className = 'result-item';
          bookElement.innerHTML = `
            <h3>${title}</h3>
            ${thumbnail ? `<img src="${thumbnail}" alt="${title}">` : ''}
            <p>Authors: ${authors}</p>
            <p>Description: ${description}</p>
            <p><a href="${buyLink}" target="_blank">Buy</a> - ${retailPrice}</p>
            <p><a href="${canonicalLink}" target="_blank">More Info</a></p>
          `;
  
          // Append the element to the results container
          resultsContainer.appendChild(bookElement);
        });
      } else {
        resultsContainer.innerHTML = 'No results found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultsContainer.innerHTML = 'An error occurred while fetching the data.';
    });
