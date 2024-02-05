
const isElectron = typeof require === 'function';
if (isElectron) {
  const { app, BrowserWindow, Menu} = require('electron');
  const path = require('path');

  let mainWindow;

  app.on('ready', () => {
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
      width: 1400,
      height: 800,
    });

    const iconPath = path.join(__dirname, 'assets', 'images', 'logo.ico');
    mainWindow.setIcon(iconPath);
    mainWindow.loadURL(`file:${__dirname}/index.html`);

    // Chame aqui a lógica específica do Electron, se necessário
    
  });
} else {
  // Chame aqui a lógica específica do navegador
  
  const api_key = 'api_key=a5d66f53cd4d37e6c21ce410122b6b32';
  const ImageBaseURL = 'https://image.tmdb.org/t/p/w500';
  const base_url = 'https://api.themoviedb.org/3';
  const popular_movies = base_url + '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&' + api_key;
  const popular_series = base_url + '/trending/tv/day?language=en-US&' + api_key;

  const movieID = 'movieId';
  const serieID = 'serieId';

  const movies_div = document.getElementById('slider-inner');
  const list = document.getElementById('list');
  const sliderlist = document.createElement('div');
  const new_div = document.createElement('div');
  const titleWrapper = document.createElement('div');
  sliderlist.classList.add('slider-list');
  new_div.classList.add('slider-inner');
  titleWrapper.classList.add('title-wrapper')
  

  
  
  getPopularMovies(popular_movies, movies_div, movieID);
  getPopularSeries(popular_series, new_div, serieID);

  function getPopularMovies(url, parentElement, ID) {
    movies_div.innerHTML = '';
    fetch(url).then(res => res.json()).then(data => {  
      showContent(data.results,parentElement, ID);
      console.log(data);
    });
  }
  function getPopularSeries(url,parentElement, ID) {
    
    list.appendChild(titleWrapper);
    titleWrapper.innerHTML = `<h3 class="title-large">Popular Series</h3>`
    list.appendChild(sliderlist);
    sliderlist.appendChild(new_div);
    
    fetch(url).then(res => res.json()).then(data => {
      showContent(data.results,parentElement, ID)
      console.log(data);
    });
  }
  function showContent(data, parentElement, ID) {
    
    data.forEach(movie => {
      const { name, title, first_air_date, poster_path, vote_average, release_date,id } = movie;
      const title_or_name = title|| name;
      const year = release_date ? release_date.substring(0, 4) : first_air_date ? first_air_date.substring(0, 4) : '';
      const rate = vote_average.toFixed(1);
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
 
 
}





