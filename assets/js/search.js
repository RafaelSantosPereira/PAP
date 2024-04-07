const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get('search');
import { searchMovie, searchSerie, movieID,serieID } from "./api.js";
import { getContent } from "../../index.js";
const sliderInner = document.querySelector(".slider-inner")
const sliderInner2 = document.querySelector(".slider-inner2")
const sliderList = document.querySelector(".slider-list")
const sliderList2 = document.querySelector(".slider-list2")

const list = document.querySelector(".list")
document.addEventListener('DOMContentLoaded', function() {
  searchContent();
});


function searchContent(){
   var URLsearchMovie = searchMovie + search;
   var URLsearchSerie = searchSerie + search;
   

   sliderInner.innerHTML = '';
   sliderInner2.innerHTML = '';
   getContent(URLsearchMovie, sliderInner, sliderList, movieID)
   .then(movieResults => {
       if (!movieResults) {
           list.innerHTML = ""; // Limpa o conteúdo se não houver resultados para filmes
       }
   });
   getContent(URLsearchSerie, sliderInner2, sliderList2, serieID)
   .then(movieResults => {
       if (!movieResults) {
           list.innerHTML = ""; // Limpa o conteúdo se não houver resultados para filmes
       }
   });


    
}