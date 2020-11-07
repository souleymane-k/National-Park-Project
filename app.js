'use strict'

const apiKey = 'kHvRxYq7KC2lbebj8eaYLwf2cOh4xHEqacKVJwkp';
const searchURL = "https://developer.nps.gov/api/v1/parks"

function formatQueryParasms(parasms){
    const queryItems = Object.keys(parasms)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parasms[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    for(let i=0; i<responseJson.data.length; i++){
        $('#results-list').append(`
        <li>
        <h2>${responseJson.date[i].fullName}</h2>
        </li>
        `)
    };

    $('#results').removeClass('.hidden');
}
function getParkList(query, maxResults =10){ 
    const parasms = {
        api_key: apiKey,
              q:query,
              maxResults
        
    };
    const queryString = formatQueryParasms(parasms)
    const url =searchURL+'?'+queryString;


fetch(url)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
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


