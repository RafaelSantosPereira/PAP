
import { 
  api_key,
  ImageBaseURL,
  base_url,
  popular_movies,
  popular_series,
  topRatedMovies,
  topRatedSeries,
  searchMovie,
  searchSerie,
  trendingMovies,
  movieID,
  serieID
} from './assets/js/api.js';

  
  const movies_div = document.getElementById('slider-inner');
  const slider = document.getElementById('slider-list');
  const list = document.getElementById('list');

  const test = "https://api.themoviedb.org/3/discover/tv?page=1&with_watch_providers=8|9|2|10|337&watch_region=PT&sort_by=popularity.desc&api_key=a5d66f53cd4d37e6c21ce410122b6b32"
  const test2 = "https://api.themoviedb.org/3/watch/providers/regions?language=en-US&api_key=a5d66f53cd4d37e6c21ce410122b6b32"
  const provider="https://api.themoviedb.org/3/watch/providers/tv?language=en-US&"+ api_key
  
  
  
  
  const { sliderlist, new_div, titleWrapper } = createElements();
  const { sliderlist: sliderlist2, new_div: new_div2, titleWrapper: titleWrapper2 } = createElements();
  const { sliderlist: sliderlist3, new_div: new_div3, titleWrapper: titleWrapper3 } = createElements();
  const { sliderlist: sliderlist4, new_div: new_div4, titleWrapper: titleWrapper4 } = createElements();
  const { sliderlist: sliderlist5, new_div: new_div5, titleWrapper: titleWrapper5 } = createElements();


  function createElements() {

    const sliderlist = document.createElement('div');
    const new_div = document.createElement('div');
    const titleWrapper = document.createElement('div');
    sliderlist.classList.add('slider-list');
    new_div.classList.add('slider-inner');
    titleWrapper.classList.add('title-wrapper');
    
    return { sliderlist, new_div, titleWrapper };
  }

  movies_div.innerHTML = '';
  getContent(popular_movies, movies_div, slider,  movieID);

  list.appendChild(titleWrapper);
  titleWrapper.innerHTML = `<h3 class="title-large">Popular Series</h3>`
  list.appendChild(sliderlist);
  sliderlist.innerHTML = ` <i id="left" class="bi bi-chevron-left left"></i>
                           <i id="right" class="bi bi-chevron-right right"></i>`
  sliderlist.appendChild(new_div);
  getContent(popular_series, new_div,sliderlist, serieID);

  list.appendChild(titleWrapper2);
  titleWrapper2.innerHTML = `<h3 class="title-large">Top Rated Movies</h3>`
  list.appendChild(sliderlist2);
  sliderlist2.innerHTML = ` <i id="left" class="bi bi-chevron-left left"></i>
                           <i id="right" class="bi bi-chevron-right right"></i>`
  sliderlist2.appendChild(new_div2);
  getContent(topRatedMovies, new_div2,sliderlist2, movieID);

  list.appendChild(titleWrapper3);
  titleWrapper3.innerHTML = `<h3 class="title-large">Top Rated Series</h3>`
  list.appendChild(sliderlist3);
  sliderlist3.innerHTML = ` <i id="left" class="bi bi-chevron-left left"></i>
                           <i id="right" class="bi bi-chevron-right right"></i>`
  sliderlist3.appendChild(new_div3);
  getContent(topRatedSeries, new_div3,sliderlist3, serieID);



  const searchField = document.querySelector(".search-field"); 
  const searchBtn = document.querySelector(".search-btn");
  const container = document.querySelector(".container");

  searchBtn.addEventListener('click', searchHandler);

document.addEventListener('keypress', function(event) {
    
    if (event.key === 'Enter') {
        searchHandler();
    }
});

function searchHandler() {
  const urlSearchMovie = searchMovie + searchField.value; // Construir a URL aqui com o valor atual do campo de pesquisa para filmes
  const urlSearchSerie = searchSerie + searchField.value; 
  if (!searchField.value.trim()) {
      return;
  } else {
      new_div4.innerHTML = ""; // Limpa o conteúdo anterior para filmes
      new_div5.innerHTML = ""; // Limpa o conteúdo anterior para séries

      const list2 = document.createElement('div');
      container.appendChild(list2);
      list2.classList.add('list');

      // Adiciona título para filmes
      list2.appendChild(titleWrapper4);
      titleWrapper4.innerHTML = `<h3 class="title-large">Movies</h3>`;
      // Adiciona slider para filmes
      list2.appendChild(sliderlist4);
      sliderlist4.innerHTML = ` <i id="left" class="bi bi-chevron-left left"></i>
                         <i id="right" class="bi bi-chevron-right right"></i>`;
      sliderlist4.appendChild(new_div4);

      // Adiciona título para séries
      list2.appendChild(titleWrapper5);
      titleWrapper5.innerHTML = `<h3 class="title-large">Series</h3>`;
      // Adiciona slider para séries
      list2.appendChild(sliderlist5);
      sliderlist5.innerHTML = ` <i id="left" class="bi bi-chevron-left left"></i>
                         <i id="right" class="bi bi-chevron-right right"></i>`;
      sliderlist5.appendChild(new_div5);

      // Limpa o conteúdo do contêiner antes de adicionar os novos resultados
      container.innerHTML = '';
      container.appendChild(list2);

      // Obtém conteúdo para filmes e séries
      getContent(urlSearchMovie, new_div4, sliderlist4, movieID)
          .then(movieResults => {
              if (!movieResults) {
                  list2.innerHTML = ""; // Limpa o conteúdo se não houver resultados para filmes
              }
          });

      getContent(urlSearchSerie, new_div5, sliderlist5, serieID)
          .then(serieResults => {
              if (!serieResults) {
                  list2.innerHTML = ""; // Limpa o conteúdo se não houver resultados para séries
              }
          });
  }
}


function getContent(url, parentElement,Slider, ID) {

  return fetch(url).then(res => res.json()).then(data => {
          // Verifica se não há resultados
          if (data.results.length === 0) {
              return false; 
          }
          console.log(data)
          // Se houver resultados, chama a função showContent
            showContent(data.results,Slider, parentElement, ID);
            

            return true; 
      });
}

function showContent(data, Slider, parentElement, ID) {
    
  data.forEach(movie => {
    const { name, title, first_air_date, poster_path, vote_average, release_date,id, genre_ids, original_language } = movie;
      if(!poster_path){
        return
      }
      const title_or_name = title || name;
      const year = release_date ? release_date.substring(0, 4) : first_air_date ? first_air_date.substring(0, 4) : '';
      const rate = vote_average.toFixed(1);
      const arrowLeft = Slider.querySelector(".bi-chevron-left");
      const arrowRight = Slider.querySelector(".bi-chevron-right");
      let width = 660; // Largura de um cartão, ajuste conforme necessário

      arrowLeft.addEventListener("click", () => {
          parentElement.scrollLeft -= width;
      });

      arrowRight.addEventListener("click", () => {
          parentElement.scrollLeft += width;
      });
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie-card');   
      movieEl.innerHTML = `
        <a href="./detail.html?${ID}=${id}" class="card-btn"> 
          <figure class="poster-box card-banner">
            <img src="${ImageBaseURL + poster_path}" class="img-cover" alt="" >
          </figure>
          <div class="card-wrapper">
            <h4 class="title">${title_or_name}</h4>
            <div class="meta-list">
              <div class="meta-item">
                <span class="span">${rate}</span>
                <img src="./assets/images/star.png" width="20px" height="20px" loading="lazy" alt="rating">             
              </div>
              <div class="card-badge">${year}</div>           
            </div>
          </div>
        </a>
      `;
      parentElement.appendChild(movieEl);

  });
}
document.addEventListener('DOMContentLoaded', function() {
  
  BannerContent(trendingMovies);
});

function BannerContent(url) {
  return fetch(url).then(res => res.json()).then(data => {
          // Verifica se não há resultados
          if (data.results.length === 0) {
              return false;
          }
         
          const bannerImg = document.getElementById('banner-img')
          const bannerTitle = document.getElementById('banner-title')
          const bannerYear = document.getElementById('banner-date')
          const bannerRate = document.getElementById('banner-rate')
          const bannerGenre = document.getElementById('banner-genre')
          bannerImg.src = "https://image.tmdb.org/t/p/original/" + data.results[0].backdrop_path;
          bannerTitle.textContent= `${data.results[0].title}`
          bannerYear.textContent= `${data.results[0].release_date}`
          bannerRate.textContent= `${data.results[0].vote_average}`
          bannerGenre.textContent= ``

          const control_inner = document.querySelector('.control-inner');
          let bannerSlider = document.querySelector(".banner-slider")
         

          control_inner.innerHTML = ``;
          data.results.forEach(movie => {
            const { title, poster_path, vote_average, release_date,id, overview, backdrop_path} = movie;
              const poster = document.createElement('button');
              poster.classList.add('poster-box', 'slider-item');
              poster.innerHTML = `
                  <img src="${ImageBaseURL + poster_path}" class="img-cover" loading="lazy" draggable="false">
              `;
              control_inner.appendChild(poster);
              
            
          
              poster.addEventListener('click',function(){
                document.querySelectorAll('.poster-box.active').forEach(poster => {
                  poster.classList.remove('active');
                });
                poster.classList.add('active')
                const img = "https://image.tmdb.org/t/p/original/" + backdrop_path;
                bannerSlider.innerHTML = '';

                    // Adiciona novamente todos os elementos necessários ao banner-slider
                    const sliderItem = document.createElement('div');
                    sliderItem.classList.add('slider-item', 'active');
                    sliderItem.innerHTML = `
                        <img src="${img}" alt="${title}"
                            class="img-cover bannerRatio" id="banner-img" loading="eager">
                        <div class="banner-content">
                            <h2 class="heading">${title}</h2>
                            <div class="meta-list">
                                <div class="meta-item">${release_date}</div>
                                <div class="meta-item card-badge">${vote_average}</div>                                    
                            </div>
                            <p class="genre"></p>
                            <p class="banner-text">${overview}</p>
                            <a href="./detail.html?movieId=${id}" class="btn">
                                <img src="./assets/images/play_circle.png" width="24" height="24" alt="play-circle" aria-hidden="true">
                                <span class="span">Watch now</span>
                            </a>
                        </div>
                    `;
                    bannerSlider.appendChild(sliderItem);
                
              })
          });
          
          return true;
      });
}









 

  






