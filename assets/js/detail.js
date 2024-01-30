const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');
const api_key = 'api_key=a5d66f53cd4d37e6c21ce410122b6b32';
const ImageBaseURL = 'https://image.tmdb.org/t/p/w500';
const base_url = 'https://api.themoviedb.org/3';
const movie_search = base_url + '/movie/' + movieId + '?' + api_key;
const certification_search = base_url + `/movie/` + movieId + '/release_dates?' + api_key 
console.log('ID do Filme:', movieId);
const movies_div = document.getElementById('container');

getmovies(movie_search);
function getmovies(url) {
    fetch(url).then(res => res.json()).then(data => {
      
      showMovies(data);
    
    });
  }

function showMovies(movie) {
    
      
      const { title, poster_path, vote_average, release_date, overview, backdrop_path} = movie
      
      const year = release_date.substring(0, 4);
      const rate = vote_average.toFixed(1);
      const duration = movie.runtime;
      const certification = movie.certification;
      
      const movieTitleElement = document.getElementById('movie-title');
      const moviePosterElement = document.getElementById('movie-poster');
      const movieRatingElement = document.getElementById('movie-rating');
      const movieYearElement = document.getElementById('movie-year');
      const movieOverviewElement = document.getElementById('movie-overview');
      const movieBackdropImage = document.getElementById('backdrop-image');
      const movieGenresElement = document.getElementById('movie-genres');
      const DurationTimeElement = document.getElementById('duration-time');
      

      movieTitleElement.textContent = `${title}`;
      moviePosterElement.src = ImageBaseURL + poster_path;
      movieOverviewElement.textContent = `${overview}`
      movieYearElement.textContent = `${year}`
      movieRatingElement.textContent = `${rate}`
      movieBackdropImage.style.backgroundImage = `url("${ImageBaseURL}${backdrop_path}")`;
      DurationTimeElement.textContent = `${duration}m`;
      
    };
