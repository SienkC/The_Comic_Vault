// Sample data - replace with your own data
const data = [
    { title: 'Comic Book 1', category: 'Comic Books' },
    { title: 'Comic Book 2', category: 'Comic Books' },
    { title: 'Movie 1', category: 'Movies' },
    { title: 'Movie 2', category: 'Movies' }
  ];

var visited = JSON.parse(localStorage.getItem("visitedHome"));

// Get references to HTML elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const mediaType = document.getElementById('media-type');

  
// Event listener for search button click
searchButton.addEventListener('click', function(event) {
  event.preventDefault();

  // make input text lowercase and remove any spaces surrounding it
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Checks if search is not blank
  if(searchTerm){

    // seach for movie or tv show
    if(mediaType.value == "movies" || mediaType.value == "series_list"){
      var mediaSearchUrl = "https://floating-headland-95050.herokuapp.com/https://comicvine.gamespot.com/api/" + mediaType.value + "/?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json&filter=name:" + searchTerm;

      localStorage.setItem("tempUrl", mediaSearchUrl);

      location.replace('movie_show_list.html');
    }
    // search for character
    else {
      var charSearchUrl = "https://floating-headland-95050.herokuapp.com/https://comicvine.gamespot.com/api/search/?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json&resources=character&query=" + searchTerm;

      localStorage.setItem("tempUrl", charSearchUrl);

      location.replace('char_list.html');
    }
  }
})

var images = [
  'batman-1.jpg', 
  'spiderman-1.jpg', 
  'superman-1.jpeg', 
  'batman-2.jpg',
  'ironman-3.jpg',
  'the-dc-gang.jpg',
  'wonderwoman-2.jpg',
  'thor-1.jpg',
  ];
  
  $(function () {
    var i = 0;
    
    $('.bg-image').css('background-image', 'url(./assets/images/' + images[i] + ')', 
    'background-size', 'cover');
    setInterval (function () {
      i++;
      if (i == images.length) {
        i = 0;
      }
      $('.bg-image').fadeOut('slow', function (){
      $(this).css('background-image', 'url(./assets/images/' + images[i] + ')',
      'background-size', 'cover');
      $(this).fadeIn('slow');
      });
    }, 5000);
  
      });
  
// if user has never been to this page, intro will run
if(visited === null) {
  // save that they've been here in local storage
  localStorage.setItem("visitedHome", JSON.stringify(true));

  // run intro.js
  introJs().start();
}