// function searchBooks() {
//     const searchInput = document.getElementById('searchInput').value;

// get info from ls
const comicDets = JSON.parse(localStorage.getItem('comicDets'));
const searchInput = comicDets[0] + "#" + comicDets[1];
const resultsContainer = document.getElementById('resultsContainer');
const searchedItem = document.getElementById('title');
resultsContainer.innerHTML = ''; // Clear previous results

// const searchedItem = document.createElement('h1');
searchedItem.textContent = "Showing results for " + comicDets[0] + "#" + comicDets[1];
// resultsContainer.appendChild(searchedItem);
  
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
            <input type='checkbox' class='favorite' data-issue-details="${title + ' by ' + authors}"></input>
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
        for(let i = 0; i < resultsContainer.children.length; i++) {
          var favs = document.getElementsByClassName('favorite');
          favs[i].setAttribute('id', 'fav' + i);
          favs[i].setAttribute('onclick', 'saveFav(' + i +')');
        }
      } else {
        resultsContainer.innerHTML = 'No results found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultsContainer.innerHTML = 'An error occurred while fetching the data.';
    });

    // function to save favorite comics in ls
    function saveFav(i) {
      var comicsDetails = document.getElementsByClassName('result-item');
      var checkbox = document.getElementById('fav' + i);
      var checkboxes = document.getElementsByClassName('favorite');
      var favoritesList = JSON.parse(localStorage.getItem('favorites'));
      var tempList = [];
  
      if(checkbox.checked) {
          // check if ls has items
          if(favoritesList != null){
              // check if not in ls
              if(!(favoritesList.includes(comicsDetails[i].innerHTML))) {
                  favoritesList.push(comicsDetails[i].innerHTML);
                  localStorage.setItem('favorites', JSON.stringify(favoritesList));
              }
          }
          // ls has no items
          else {
              tempList.push(comicsDetails[i].innerHTML);
              localStorage.setItem('favorites', JSON.stringify(tempList));
          }
          // check if others match and check all others too
          for(let j = 0; j < checkboxes.length; j++) {
              if(comicsDetails[j].innerHTML === comicsDetails[i].innerHTML) {
                  checkboxes[j].checked = true;
              }
          }
      }
  
      else {
          if(favoritesList != null){
              // check if in ls
              if(favoritesList.includes(comicsDetails[i].innerHTML)) {
                  var index = favoritesList.indexOf(comicsDetails[i].innerHTML);
                  if(index > -1){
                      favoritesList.splice(index, 1);
                      localStorage.setItem('favorites', JSON.stringify(favoritesList));
                  }
              }
              // check for others match and uncheck all others too
              for(let j = 0; j < checkboxes.length; j++) {
                  if(comicsDetails[j].innerHTML === comicsDetails[i].innerHTML) {
                      checkboxes[j].checked = false;
                  }
              }
          }
      }
  }