'use strict'

const apiKey = 'kHvRxYq7KC2lbebj8eaYLwf2cOh4xHEqacKVJwkp';
const searchURL = "https://developer.nps.gov/api/v1/parks"

function formatQueryParasms(parasms){
    const queryItems = Object.keys(parasms)
    .map(key => `${encodeURIComponent(key)} = ${encodeURIComponent(parasms[key])}`)
    return queryItems.join('&');
}

function getParkList(parkCode, maxResults =10){ 
    const parasms = {
        key: apiKey,
        q:parkCode,
        maxResults
        
    };
    const queryString = formatQueryParasms(parasms)
    const url = searchURL + '?' + queryString;


fetch(url)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => console.log(JSON.stringtify(responseJson)))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm(){
$('form').submit(event => {
    event.preventDefault();
     const searchTerm = $('#js-search-term').val();
     const maxResults = $('#js-max-results').val();
     getParkList(searchTerm, maxResults);
    
  });

}
$(watchForm);


