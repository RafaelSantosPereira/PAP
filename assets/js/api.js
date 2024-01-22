'use strict';

const api_key = '118d70f6e7cca5415f289da54f975540'
const ImageBaseURL = 'https://image.tmdb.org/t/p/'

const fetchDataFromServer = function(url, callback, optionalParam){
    fetch(url).then(response => response.json()).then(data => callback(data, optionalParam));
}

export{ImageBaseURL, api_key, fetchDataFromServer}