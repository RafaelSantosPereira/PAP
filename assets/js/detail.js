const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');
const serieId = urlParams.get('serieId')
const api_key = 'api_key=a5d66f53cd4d37e6c21ce410122b6b32';
const ImageBaseURL = 'https://image.tmdb.org/t/p/w500';
const base_url = 'https://api.themoviedb.org/3';
const movie_search = base_url + '/movie/' + movieId + '?' + api_key;
const credits_search = base_url + '/movie/' + movieId + '/credits?language=en-US&' + api_key
const video_search = base_url + '/movie/' + movieId + '/videos?language=en-US&' + api_key
const serie_search = base_url + '/tv/' + serieId + '?' + api_key;
console.log('ID do Filme:', movieId);
const movies_div = document.getElementById('container');
if(movieId){
  getmovies(movie_search);
  getCredits(credits_search);
  getvideos(video_search)
}
else if(serieId){
  getmovies(serie_search)

}

function getmovies(url) {
    fetch(url).then(res => res.json()).then(data => {
      
      showMovies(data);
      console.log(data);
    });
  }
function getCredits(url){
    fetch(url).then(res => res.json()).then(data => {
        
      showCredits(data);  
      console.log(data);
    });
  }
  function getvideos(url) {
    fetch(url).then(res => res.json()).then(data => {
      
      showVideos(data)
      console.log(data);
    });
  }
function showMovies(movie) {

      const { title, first_air_date, name, poster_path, vote_average, release_date, overview, genres, backdrop_path} = movie
      
      const genres_name = [];
      movie.genres.forEach(genres => {
        genres_name.push(" "+genres.name)
      })
      const title_or_name = title || name;
      const year = release_date ? release_date.substring(0, 4) : first_air_date ? first_air_date.substring(0, 4) : '';
      const rate = vote_average.toFixed(1);
      const duration = movie.runtime || (movie.seasons ? movie.seasons.length : 0);
      
      
      
      const movieTitleElement = document.getElementById('movie-title');
      const moviePosterElement = document.getElementById('movie-poster');
      const movieRatingElement = document.getElementById('movie-rating');
      const movieYearElement = document.getElementById('movie-year');
      const movieOverviewElement = document.getElementById('movie-overview');
      const movieBackdropImage = document.getElementById('backdrop-image');
      const movieGenresElement = document.getElementById('movie-genres');
      const DurationTimeElement = document.getElementById('duration-time');
      
      if(duration === movie.runtime){
        DurationTimeElement.textContent = `${duration}m`;
      }
      else{
        DurationTimeElement.textContent = `${duration} seasons`;
        if(duration <= 1){
          DurationTimeElement.textContent = `${duration} season`;
        }
      }

      movieTitleElement.textContent = `${title_or_name}`;
      moviePosterElement.src = ImageBaseURL + poster_path;
      movieOverviewElement.textContent = `${overview}`
      movieYearElement.textContent = `${year}`
      movieRatingElement.textContent = `${rate}`
      movieBackdropImage.style.backgroundImage = `url("${ImageBaseURL}${backdrop_path}")`;
      
      movieGenresElement.textContent = `${genres_name}`;
      
    };
    function showCredits(movie_cast){
      const{cast, crew} = movie_cast

      const cast_name = [];
      let director_name;
      for(let i = 0; i < 10 && i < cast.length; i++){
        cast_name.push(" "+cast[i].name)         
      }
      
      crew.forEach(person => {
        if(person.known_for_department === "Directing"){
          director_name = person.name;
          return; // Sai do forEach assim que encontrar o diretor
        }
      });
      
      const StarringElement = document.getElementById('Starring');
      const DirectorElement = document.getElementById('director');
      StarringElement.textContent = `${cast_name}`;
      DirectorElement.textContent = `${director_name}`;
      
    }
    function showVideos(trailers){
      const {results} = trailers
      
      const trailer_1 = `https://www.youtube.com/embed/${results[0].key}`
      const trailer_2 = `https://www.youtube.com/embed/${results[1].key}`
      const trailer_3 = `https://www.youtube.com/embed/${results[2].key}`
      const trailer_4 = `https://www.youtube.com/embed/${results[3].key}`

      const trailer1Element = document.getElementById('trailer-1');
      const trailer2Element = document.getElementById('trailer-2');
      const trailer3Element = document.getElementById('trailer-3');
      const trailer4Element = document.getElementById('trailer-4');

      trailer1Element.src =`${trailer_1}`;
      trailer2Element.src = `${trailer_2}`;
      trailer3Element.src = `${trailer_3}`;
      trailer4Element.src = `${trailer_4}`;
    }
