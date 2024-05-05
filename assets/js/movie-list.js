import { 
    api_key,
    ImageBaseURL,
    base_url,
    discover_movies,
    popular_series,
    topRatedMovies,
    topRatedSeries,
    searchMovie,
    searchSerie,
    trendingMovies,
    movieID,
    serieID
  } from './api.js';

import { getContent } from "../../index.js";
const container = document.querySelector(".container")
const gridList = document.querySelector(".grid-list")
const contentType = document.getElementById('type')
const sortBy = document.getElementById('sort')
const year = document.getElementById('year')
let ContentURL = "";
let id = "";
gridList.innerHTML=``;

   

const defaultSelectedOption = contentType.options[contentType.selectedIndex].value;
const defaultSortByOption = sortBy.options[sortBy.selectedIndex].value;
const defaultYearOption = year.options[year.selectedIndex].value;

if (defaultSelectedOption === 'movies' && defaultSortByOption === 'popularity.desc' && defaultYearOption === 'all years') {
    ContentURL = discover_movies;
    id = movieID;
    getContent(ContentURL, gridList, id);
}
    


sortBy.addEventListener('change', function(event) {
    const selectedValue = event.target.value;
    if(contentType.value == 'movies'){
        ContentURL = discover_movies;
    }
    ContentURL += "&sort_by="+ selectedValue + '&vote_count.gte=500'
    
    gridList.innerHTML=``;
    getContent(ContentURL, gridList, id)
      
});

let index = 2
container.addEventListener('scroll', function() {
    var ContainerHeight = container.scrollHeight;//altura total do container
    var ScrollTop = container.scrollTop//distancia entre a parte visivel do conteiner o topo do container
    var diff = ContainerHeight - ScrollTop//é o que sobra entre a parte visivel do conteiner e o seu fim
    var height = container.clientHeight;//altura da parte visivel do container
    console.log(diff)
    if (diff <= height){
        
        getContent(ContentURL+"&page="+index, gridList, movieID)
        index++;
    }
})


