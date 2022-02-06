// API variables
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c2f6e70ce0a24af06a7abec45c104d82&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=c2f6e70ce0a24af06a7abec45c104d82&query="'
//html variables
const home = document.getElementById('home')
const good = document.getElementById('gd')
const average = document.getElementById('avg')
const bad = document.getElementById('bd')
const search = document.getElementById('search')
const form = document.getElementById('form')
const main = document.getElementById('main')
// Get inital movies
getMovies(API_URL)
// home event
home.addEventListener('click', () => {
  window.location.reload()
})
//fetch function
async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  // show all movies
  showMovies(data.results)
  // show good movies
  good.addEventListener('click', () => {
    data.results.forEach(result => {
      showGoodMovies(data.results)
    })
  })
  // show average movies
  average.addEventListener('click', () => {
    data.results.forEach(result => {
      showAverageMovies(data.results)
    })
  })
  // show bad movies
  bad.addEventListener('click', () => {
    data.results.forEach(result => {
      showBadMovies(data.results)
    })
  })
}
// show movies functions
function showMovies(movies) {
  main.innerHTML = ''

  movies.forEach(movie => {
    const {title, poster_path, vote_average, overview} = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>overview</h3>
        ${overview}
      </div>
    `
    main.appendChild(movieEl)
  })
}

function showGoodMovies(movies) {
  main.innerHTML = ''

  movies.forEach(movie => {
    const {title, poster_path, vote_average, overview} = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>overview</h3>
        ${overview}
      </div>
    `
    if (vote_average>8) {
      main.appendChild(movieEl)
    }
  })
}

function showAverageMovies(movies) {
  main.innerHTML = ''

  movies.forEach(movie => {
    const {title, poster_path, vote_average, overview} = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>overview</h3>
        ${overview}
      </div>
    `
    if (vote_average<8 && vote_average>=5 ) {
      main.appendChild(movieEl)
    }
  })
}

function showBadMovies(movies) {
  main.innerHTML = ''

  movies.forEach(movie => {
    const {title, poster_path, vote_average, overview} = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>overview</h3>
        ${overview}
      </div>
    `
    if (vote_average<5 && vote_average>=0) {
      main.appendChild(movieEl)
    }
  })
}

function getClassByRate(vote) {
  if(vote >= 8) return 'green'
  else if (vote >=5) return 'orange'
  else return 'red'
}
// search function
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const search_term = search.value
  if (search_term && search_term !== '') {
    getMovies(SEARCH_API + search_term)
    search.value = ''
  } else {
    window.location.reload()
  }
})
