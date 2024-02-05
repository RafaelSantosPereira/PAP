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
const serie_video_search = base_url + '/tv/'+ serieId + '/videos?language=en-US&'+ api_key;
const serie_credits = base_url + '/tv/'+ serieId + '/credits?language=en-US&'+ api_key;

console.log('ID do Filme:', movieId);
const content_div = document.getElementById('container');
if(movieId){
  getContent(movie_search);
  getCredits(credits_search);
  getvideos(video_search)
}
else if(serieId){
  getContent(serie_search)
  getvideos(serie_video_search)
  getCredits(serie_credits);
}

function getContent(url) {
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
      
      const { results } = trailers;
      const videoInnerElement = document.getElementById('video-inner');
      videoInnerElement.innerHTML = ''; // Limpa o conteúdo anterior
      if(results.length == 0){
        const label = document.getElementById('label-trailers');
        label.innerHTML= ``;
      }
      for (let i = 0; i < results.length; i++) {
          const trailer = `https://www.youtube.com/embed/${results[i].key}`;
          const videoCard = document.createElement('div');
          videoCard.classList.add('video-card');
  
          videoCard.innerHTML = `
              <iframe frameborder="0" allowfullscreen src="${trailer}"></iframe>
          `;
  
          videoInnerElement.appendChild(videoCard);
      }

     
    }
