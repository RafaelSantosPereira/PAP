import { 
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
    serieID,
  } from './api.js';

import { getContent } from "../../index.js";
const container = document.querySelector(".container")
const gridList = document.querySelector(".grid-list")
const contentType = document.getElementById('type')
const sortBy = document.getElementById('sort')
const year = document.getElementById('year')
const logo = document.querySelector('.logo')
let ContentURL = "";
let id = localStorage.getItem('id');
gridList.innerHTML=``;
let index = 2



let defaultSelectedOption = contentType.options[contentType.selectedIndex].value;
let defaultSortByOption = sortBy.options[sortBy.selectedIndex].value;
let defaultYearOption = year.options[year.selectedIndex].value;

function removeActiveButton() {
    let btgenres = document.querySelectorAll('.genre-bt'); // Seleciona todos os elementos com a classe 'genre-bt'

    btgenres.forEach(function(button) {
        button.classList.remove('genre-bt-active'); // Remove a classe 'genre-bt-active' de cada botão
    });
}



  


document.addEventListener('DOMContentLoaded', function() {
    
    //mudar depois.
    const SortOption = localStorage.getItem('SortOption');
    const ContentOption = localStorage.getItem('ContentOption');
    let genreIndex = localStorage.getItem('genreIndex');
    const event = new Event('change');
    const genreList = document.querySelector('.genre-sidebar')
    let button = document.getElementById('btScience'); 
    let buttonAction = document.getElementById('btAction'); 
    let buttonAdventure = document.getElementById('btAdventure'); 
    
    if(ContentOption == 'series'){   
        button.value = '10765'
        button.textContent = 'Sci-Fi'
        buttonAction.value = '10759'
        buttonAdventure.value = '10759'
    }


    
     const url =localStorage.getItem('CurrentURL')
     if(!genreIndex){
        localStorage.setItem('genreIndex','1')
     }
    gridList.innerHTML=``;
    getContent(url, gridList, id)

    let activeGenres = JSON.parse(localStorage.getItem('activeGenres')) || []; //trassmora em array a string do local storage

    activeGenres.forEach(function(value) {
        let button = document.querySelector(`button[value="${value}"]`);
        if (button) {
            button.classList.add('genre-bt-active');
        }
    });
    
});


logo.addEventListener('click', function(){
    localStorage.clear();
})

    

contentType.addEventListener('change',function(event){
    removeActiveButton();
    localStorage.removeItem('activeGenres')
    localStorage.setItem('genreIndex', '1');
    const selectedValue = event.target.value;
    const SortOption = localStorage.getItem('SortOption');
    let buttonFiction = document.getElementById('btScience'); 
    let buttonAction = document.getElementById('btAction'); 
    let buttonAdventure = document.getElementById('btAdventure'); 


    gridList.innerHTML=``;
    if(contentType.selectedIndex =='0'){
        ContentURL = discover_movies
        localStorage.setItem('ContentOption', 'movies');
        localStorage.setItem('id', movieID);  
        let id = localStorage.getItem('id');
        ContentURL += '&sort_by='+ SortOption + '&vote_count.gte=300'            
        getContent(ContentURL, gridList, id)  
        buttonFiction .value = '878'
        buttonFiction .textContent = 'Sciece Fiction'
        buttonAction.value = '28'
        buttonAdventure.value = '12'
    }
    if(contentType.selectedIndex =='1'){

        ContentURL = discover_series
        
        localStorage.setItem('ContentOption', 'series');
        localStorage.setItem('id', serieID);
        let id = localStorage.getItem('id');
        
        ContentURL += '&sort_by='+ SortOption + '&vote_count.gte=300'
        getContent(ContentURL, gridList, id)
        index = 2

        buttonFiction.value = '10765'
        buttonFiction .textContent = 'Sci-Fi'
        buttonAction.value = '10759'
        buttonAdventure.value = '10759'
        
        
    }
    localStorage.setItem('CurrentURL', ContentURL);
    localStorage.setItem('ID', id);
    localStorage.setItemItem('ContentOption',contentType.value);
})

sortBy.addEventListener('change', function(event) {
    const selectedValue = event.target.value;
    localStorage.setItem('SortOption', selectedValue);

    if(contentType.value == 'movies'){
        ContentURL = discover_movies;
        localStorage.setItem('id', movieID);  
        let id = localStorage.getItem('id');
        ContentURL += "&sort_by="+ selectedValue + '&vote_count.gte=300'
        gridList.innerHTML=``;
        getContent(ContentURL, gridList, id)
        index = 2
    }
    else{
        ContentURL = discover_series;
        localStorage.setItem('id', serieID); 
        let id = localStorage.getItem('id'); 
        ContentURL += "&sort_by="+ selectedValue + '&vote_count.gte=400'
        gridList.innerHTML=``;
        getContent(ContentURL, gridList, id)
        index=2
    }

    localStorage.setItem('CurrentURL', ContentURL);
    removeActiveButton();
    localStorage.setItem('genreIndex','1')
    localStorage.removeItem('activeGenres')
});



container.addEventListener('scroll', function() {
    const url =localStorage.getItem('CurrentURL')
    var ContainerHeight = container.scrollHeight;//altura total do container
    var ScrollTop = container.scrollTop//distancia entre a parte visivel do conteiner o topo do container
    var diff = ContainerHeight - ScrollTop//é o que sobra entre a parte visivel do conteiner e o seu fim
    var height = container.clientHeight;//altura da parte visivel do container
    let id = localStorage.getItem('id'); 
    console.log(diff)
    if (diff <= height+100 ){
        
        getContent(url+"&page="+index, gridList, id )
        console.log(url+"&page="+index)
        index++;
        

    }
})

genresSearch();
function genresSearch(){
    let genres = document.querySelectorAll('.genre-bt')
        genres.forEach(function(button) {
        button.addEventListener('click', function(event) {
            let genreIndex = localStorage.getItem('genreIndex');
            let url = localStorage.getItem('CurrentURL');
            if(genreIndex == 1){            
                url += "&with_genres=" + event.target.value;
                localStorage.setItem('CurrentURL', url);           
            }
            else{          
                url += "|" + event.target.value;
                localStorage.setItem('CurrentURL', url);
            }

            localStorage.setItem('genreIndex', genreIndex + 1);
            gridList.innerHTML = '';
            let id = localStorage.getItem('id'); 
            getContent(url, gridList, id);
            
            console.log(url)
            event.target.classList.add('genre-bt-active');

            let activeGenres = JSON.parse(localStorage.getItem('activeGenres')) || [];//comverte a string do local storage em array
                if (!activeGenres.includes(event.target.value)) {// se a lista de generos nao incluir o mesmo, o genero é adicionado
                    activeGenres.push(event.target.value);
                }
            localStorage.setItem('activeGenres', JSON.stringify(activeGenres));
        });
    });
}

        
