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
  trendingSeries,
  movieID,
  serieID,
  trending
} from './assets/js/api.js';

let sess = "";
export{showContent};

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
  
  document.addEventListener('DOMContentLoaded', function() {
  
   
    if (window.location.href.endsWith('/index.html')){
      BannerContent(trending);
      movies_div.innerHTML = '';
      getContent(trendingMovies, movies_div, movieID);
      ScrollSlider(slider,movies_div);
    
      list.appendChild(titleWrapper3);
      titleWrapper3.innerHTML = `<h3 class="title-large">Trending Series</h3>`
      list.appendChild(sliderlist3);
      sliderlist3.innerHTML = ` <i id="left" class="bi bi-chevron-left left"></i>
                               <i id="right" class="bi bi-chevron-right right"></i>`
      sliderlist3.appendChild(new_div3);
      getContent(trendingSeries, new_div3, serieID);
      ScrollSlider(sliderlist3, new_div3)
  
      list.appendChild(titleWrapper2);
      titleWrapper2.innerHTML = `<h3 class="title-large">Popular Movies</h3>`
      list.appendChild(sliderlist2);
      sliderlist2.innerHTML = ` <i id="left" class="bi bi-chevron-left left"></i>
                               <i id="right" class="bi bi-chevron-right right"></i>`
      sliderlist2.appendChild(new_div2);
      getContent(discover_movies, new_div2, movieID);
      ScrollSlider(sliderlist2, new_div2)
  
      list.appendChild(titleWrapper);
      titleWrapper.innerHTML = `<h3 class="title-large">Popular Series</h3>`
      list.appendChild(sliderlist);
      sliderlist.innerHTML = ` <i id="left" class="bi bi-chevron-left left"></i>
                               <i id="right" class="bi bi-chevron-right right"></i>`
      sliderlist.appendChild(new_div);
      getContent(discover_series + '&vote_count.gte=170', new_div, serieID);
      ScrollSlider(sliderlist, new_div);

      list.appendChild(titleWrapper4);
      titleWrapper4.innerHTML = `<h3 class="title-large">Top Rated Movies</h3>`
      list.appendChild(sliderlist4);
      sliderlist4.innerHTML = ` <i id="left" class="bi bi-chevron-left left"></i>
                               <i id="right" class="bi bi-chevron-right right"></i>`
      sliderlist4.appendChild(new_div4);
      getContent(topRatedMovies, new_div4, movieID);
      ScrollSlider(sliderlist4, new_div4)
      
      list.appendChild(titleWrapper5);
      titleWrapper5.innerHTML = `<h3 class="title-large">Top Rated Series</h3>`
      list.appendChild(sliderlist5);
      sliderlist5.innerHTML = ` <i id="left" class="bi bi-chevron-left left"></i>
                               <i id="right" class="bi bi-chevron-right right"></i>`
      sliderlist5.appendChild(new_div5);
      getContent(topRatedSeries, new_div5, serieID);
      ScrollSlider(sliderlist5, new_div5)
  
      const listLink = document.querySelector('.base-list');
        listLink.addEventListener('click', function(){
          localStorage.clear();
          const Sort = 'popularity.desc&vote_count.gte=200';

          localStorage.setItem('CurrentURL', discover_movies + '&sort_by=' + Sort);      
          localStorage.setItem('id', movieID);
          localStorage.setItem('genreIndex', '1');
      })  
    }
    
    
});
  
  

    
  export function ScrollSlider(Slider, parentElement){
    const arrowLeft = Slider.querySelector(".bi-chevron-left");
    const arrowRight = Slider.querySelector(".bi-chevron-right");
    let width = 660; // Largura de 3 moviecard
    arrowLeft.addEventListener("click", () => {
        parentElement.scrollLeft -= width;
    });

    arrowRight.addEventListener("click", () => {
        parentElement.scrollLeft += width;
    });
  }
 



  const searchField = document.querySelector(".search-field"); 
  const searchBtn = document.querySelector(".search-btn");

  searchBtn.addEventListener('click', redirect);
  export function redirect(){
    var query = searchField.value;
    if (!searchField.value.trim()) 
    return;
    var queryEncode = encodeURIComponent(query);
    window.location.href = "search.html?search=" + queryEncode;
  }
  document.addEventListener('keypress', function(event) {
      
      if (event.key === 'Enter') {
          redirect();
      }
  });



export function getContent(url, parentElement, ID) {
  return fetch(url).then(res => res.json()).then(data => {
    if (data.results.length === 0) {
      return false; 
  }
  console.log(data)
  // Se houver resultados, chama a função showContent
    showContent(data.results, parentElement, ID);
    

    return true; 
      
  });
}





function showContent(data,parentElement, ID) {
    
  data.forEach(movie => {
    const { name, title, first_air_date, poster_path, vote_average, release_date,id, genre_ids, original_language } = movie;
      if(!poster_path){
        return
      }
      const title_or_name = title || name;
      const year = release_date ? release_date.substring(0, 4) : first_air_date ? first_air_date.substring(0, 4) : '';
      const rate = vote_average.toFixed(1);
      
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie-card');   
      movieEl.innerHTML = `
        <a href="./detail.html?${ID}=${id} class="card-btn"> 
          <figure class="poster-box card-banner">
            <img src="${ImageBaseURL + poster_path}" class="img-cover" alt="${title_or_name}" >
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




function BannerContent(url) {
  return fetch(url).then(res => res.json()).then(data => {
          // Verifica se não há resultados
          if (data.results.length === 0) {
              return false;
          }console.log(data)

          const bannerImg = document.getElementById('banner-img');
          const bannerTitle = document.getElementById('banner-title');
          const bannerYear = document.getElementById('banner-date');
          const bannerRate = document.getElementById('banner-rate');
          const bannerGenre = document.getElementById('banner-genre');
          const watchBtn = document.getElementById('watchNowBtn');
          const control_inner = document.querySelector('.control-inner');
          const bannerSlider = document.querySelector(".banner-slider");
          const bannerOverview = document.querySelector(".banner-text");
          // Atualiza o banner com o primeiro resultado
          const firstResult = data.results[0];
          bannerImg.src = "https://image.tmdb.org/t/p/original/" + firstResult.backdrop_path;
          bannerTitle.textContent = firstResult.title || firstResult.name;
          bannerYear.textContent = (firstResult.release_date || firstResult.first_air_date).substring(0, 4);
          bannerRate.textContent = firstResult.vote_average.toFixed(1);
          bannerOverview.textContent = firstResult.overview;
          bannerGenre.textContent = ''; // Pode ser ajustado para exibir os gêneros
          watchBtn.href = firstResult.media_type === 'movie' ? `./detail.html?movieId=${firstResult.id}` : `./detail.html?serieId=${firstResult.id}`;

          control_inner.innerHTML = ``;
          data.results.forEach((result, index) => {
              const { title, name, poster_path, vote_average, release_date, first_air_date, id, overview, backdrop_path, media_type } = result;
              const year = (release_date || first_air_date).substring(0, 4);
              const rate = vote_average.toFixed(1);
              const poster = document.createElement('button');
              poster.classList.add('poster-box', 'slider-item');

              if (index === 0) {
                  poster.classList.add('active');
              }

              poster.innerHTML = `
                  <img src="${ImageBaseURL + poster_path}" class="img-cover" loading="lazy" draggable="false">
              `;
              control_inner.appendChild(poster);

              poster.addEventListener('click', function () {
                  document.querySelectorAll('.poster-box.active').forEach(poster => {
                      poster.classList.remove('active');
                  });
                  poster.classList.add('active');
                  const img = "https://image.tmdb.org/t/p/original/" + backdrop_path;
                  bannerSlider.innerHTML = '';

                  // Adiciona novamente todos os elementos necessários ao banner-slider
                  const sliderItem = document.createElement('div');
                  sliderItem.classList.add('slider-item', 'active');
                  sliderItem.innerHTML = `
                      <img src="${img}" alt="${title || name}"
                          class="img-cover bannerRatio" id="banner-img" loading="eager">
                      <div class="banner-content">
                          <h2 class="heading">${title || name}</h2>
                          <div class="meta-list">
                              <div class="meta-item">${year}</div>
                              <div class="meta-item card-badge">${rate}</div>                                    
                          </div>
                          <p class="genre"></p>
                          <p class="banner-text">${overview}</p>
                          <a href="./detail.html?${media_type === 'movie' ? 'movieId' : 'serieId'}=${id}" class="btn">
                              <img src="./assets/images/play_circle.png" width="24" height="24" alt="play-circle" aria-hidden="true">
                              <span class="span">Watch now</span>
                          </a>
                      </div>
                  `;
                  bannerSlider.appendChild(sliderItem);
              });
          });
      
          
        
               
        let isDragging = false, startX, scrollLeft;

        const dragStart = (e) => {
          isDragging = true;
          startX = e.pageX - control_inner.offsetLeft; // Calcula a posição inicial do clique em relação ao contêiner
          scrollLeft = control_inner.scrollLeft;// Armazena a posição inicial de rolagem do contêiner
        };

        const dragMove = (e) => {
          if (!isDragging) return; // parar a execução se não estiver arrastando
          e.preventDefault();// Prevê comportamento padrão do navegador (como seleção de texto)
          const x = e.pageX - control_inner.offsetLeft;// Calcula a posição atual do mouse em relação ao contêiner
          const walk = (x - startX) * 1.3; // Calcula a diferença de movimento desde o início do arrasto e multiplica por 1.3 para aumentar a velocidade
          control_inner.scrollLeft = scrollLeft - walk;// Atualiza a posição de rolagem do contêiner
        };

        const dragEnd = () => {
          isDragging = false;
        };

        control_inner.addEventListener('mousedown', dragStart);//evento de pressionar o botão do mouse ao contêiner
        control_inner.addEventListener('mousemove', dragMove);
        control_inner.addEventListener('mouseup', dragEnd);
        control_inner.addEventListener('mouseleave', dragEnd);

        return true;
      });


      
}











 

  






