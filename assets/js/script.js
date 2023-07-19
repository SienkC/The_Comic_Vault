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

      localStorage.setItem("tempUrl", mediaSearchUrl);

      location.replace('movie_show_list.html');

      // movieShowDisplay(mediaSearchUrl);
    }
    // search for character
    else {
      // TODO: Add character search
      var charSearchUrl = "https://floating-headland-95050.herokuapp.com/https://comicvine.gamespot.com/api/search/?api_key=871377ac063cfca6e414991a01d6b3fdfce67591&format=json&resources=character&query=" + searchTerm;

      // test
      console.log(charSearchUrl);

      localStorage.setItem("tempUrl", charSearchUrl);

      location.replace('char_list.html');

      // charSelectDisplay(charSearchUrl);
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
  
  