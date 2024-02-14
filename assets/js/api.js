const fetchDataFromServer = function(url, callback, optionalParam) {
    fetch(url).then(response => response.json()).then(data => callback(data, optionalParam));
}
   
   
   const api_key = 'api_key=a5d66f53cd4d37e6c21ce410122b6b32';
   const ImageBaseURL = 'https://image.tmdb.org/t/p/w500';
   const base_url = 'https://api.themoviedb.org/3';
   const popular_movies = base_url + '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&' + api_key;
   const popular_series = base_url + '/discover/tv?language=en-US&sort_by=popularity.desc&page=1&watch_region=PT&with_watch_providers=2|119|8|9|10|337&' + api_key;
   const topRatedMovies = base_url + "/movie/top_rated?language=en-US&page=1&" + api_key;
   const topRatedSeries = base_url + "/tv/top_rated?language=en-US&page=1&" + api_key;
   const searchMovie = base_url + "/search/movie?language=en-US&"+ api_key + "&query=";
   const movieID = 'movieId';
   const serieID = 'serieId';

   export { 
    fetchDataFromServer,
    api_key,
    ImageBaseURL,
    base_url,
    popular_movies,
    popular_series,
    topRatedMovies,
    topRatedSeries,
    searchMovie,
    movieID,
    serieID
};