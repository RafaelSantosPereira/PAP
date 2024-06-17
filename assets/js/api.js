const api_key = 'api_key=a5d66f53cd4d37e6c21ce410122b6b32';
const ImageBaseURL = 'https://image.tmdb.org/t/p/w500';
const base_url = 'https://api.themoviedb.org/3';
const discover_movies = base_url + '/discover/movie?include_adult=false&include_video=false&language=en-US&' + api_key;
const discover_series = base_url + '/discover/tv?&' + api_key;
const topRatedMovies = base_url + "/discover/movie?sort_by=vote_average.desc&vote_count.gte=300&" + api_key;
const topRatedSeries = base_url + "/discover/tv?sort_by=vote_average.desc&vote_count.gte=300&" + api_key;
const searchMovie = base_url + "/search/movie?include_adult=false&language=en-US&page=1&"+ api_key + "&query=";
const searchSerie = base_url + "/search/tv?include_adult=false&language=en-US&page=1&"+ api_key + "&query="
const trendingMovies = base_url + "/trending/movie/day?language=en-US&"+api_key;
const movieID = 'movieId';
const serieID = 'serieId';

export { 
    api_key,
    ImageBaseURL,
    base_url,
    discover_movies,
    discover_series,
    topRatedMovies,
    topRatedSeries,
    searchMovie,
    searchSerie,
    trendingMovies,
    movieID,
    serieID
};