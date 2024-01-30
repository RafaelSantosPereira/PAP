
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
  const api_url = base_url + '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&' + api_key;
  const movies_div = document.getElementById('slider-inner');
  
  getmovies(api_url);

  function getmovies(url) {
    fetch(url).then(res => res.json()).then(data => {
      showMovies(data.results);
      console.log(data);
    });
  }
  
  function showMovies(data) {
    movies_div.innerHTML = '';
    data.forEach(movie => {
      const { title, poster_path, vote_average, release_date,id } = movie;
      const year = release_date.substring(0, 4);
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie-card');
      movieEl.innerHTML = `
        <a href="./detail.html?movieId=${id}" class="card-btn"> 
          <figure class="poster-box card-banner">
            <img src="${ImageBaseURL + poster_path}" class="img-cover" alt="" >
          </figure>
          <div class="card-wrapper">
            <h4 class="title">${title}</h4>
            <div class="meta-list">
              <div class="meta-item">
                <span class="span">${vote_average}</span>
                <img src="./assets/images/star.png" width="20px" height="20px" loading="lazy" alt="rating">             
              </div>
              <div class="card-badge">${year}</div>           
            </div>
          </div>
        </a>
      `;
      movies_div.appendChild(movieEl);
    });
  }
 
}


// Função que contém a lógica específica do Electron


