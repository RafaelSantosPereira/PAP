import { searchMovie, searchSerie, movieID, serieID } from "./api.js";
import { getContent, ScrollSlider } from "../../index.js";

const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get('search');
const sliderInner = document.querySelector(".slider-inner");
const sliderInner2 = document.querySelector(".slider-inner2");
const sliderList = document.querySelector(".slider-list");
const sliderList2 = document.querySelector(".slider-list2");
const serieContainer = document.getElementById("series-container")
const movieContainer = document.getElementById("movie-container")

document.addEventListener('DOMContentLoaded', function() {
    searchContent();

    
});

async function searchContent() {
    var URLsearchMovie = searchMovie + search;
    var URLsearchSerie = searchSerie + search;

    sliderInner.innerHTML = '';
    sliderInner2.innerHTML = '';

    try {
        const movieResults = await getContent(URLsearchMovie, sliderInner, movieID);
        if (!movieResults || movieResults.length === 0) {
            movieContainer.innerHTML = ""
        }
        ScrollSlider(sliderList, sliderInner);

        const serieResults = await getContent(URLsearchSerie, sliderInner2, serieID);
        if (!serieResults || serieResults.length === 0) {
            serieContainer.innerHTML=""
        }
        ScrollSlider(sliderList2, sliderInner2);

    } catch (error) {
        console.error('Error fetching content:', error);
    }   
}
const listLink = document.querySelector('.base-list');
    listLink.addEventListener('click', function(){
      localStorage.clear();
      const Sort = 'popularity.desc&vote_count.gte=200';

      localStorage.setItem('CurrentURL', discover_movies + '&sort_by=' + Sort);      
      localStorage.setItem('id', movieID);
      localStorage.setItem('genreIndex', '1');
  })  
