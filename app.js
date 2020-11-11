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
        $('#results-list').append(
    `<li>
    <hr>
         <p>${responseJson.data[i].fullName}</p>
         <p>${responseJson.data[i].description}</p>
         <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a> 
         
    </li>
        `
    )};

    $('#results').removeClass('hidden');
}
function getParkList(query, maxResults =10){ 
    const parasms = {
        api_key: apiKey,
        q: query, maxResults,  
        
    };
    const queryString = formatQueryParasms(parasms)
    const url = searchURL+'?'+queryString;
  console.log(url);
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
    // getParkList(searchTerm, maxResults);
    //$('#js-max-results').val();
    if(maxResults <= 20){
        getParkList(searchTerm, maxResults);
    }else{
        alert('Enter Number Less or equal to 20')
    }

  });
}
$(watchForm);




