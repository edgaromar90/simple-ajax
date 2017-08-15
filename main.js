(function(){
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');
    const nytimesApi = document.querySelector('#nytimesApi');
    const unsplashApi = document.querySelector('#unsplashApi');
    let searchedForText;

    form.addEventListener('submit', onFormSubmitted);

    function addArticle(){
        let htmlContent = '';
        const data = JSON.parse(this.responseText);

        if(data.response && data.response.docs && data.response.docs.length > 1){
            htmlContent += '<ul class="list-group">'
            data.response.docs.map(function(article){
                htmlContent += `<li class="list-group-item">
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                </li>`;
            });
            htmlContent += '</ul>'
        } else {
            htmlContent = '<div class="error-no-image">No Articles Available</div>';
        }

        responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
    }

    function addImage(){
        let htmlContent = '';
        const data = JSON.parse(this.responseText);

        if(data && data.results[0]){
            data.results.map(function(image){
                htmlContent += `<figure>
                    <img class="img-responsive" src="${image.urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by <strong>${image.user.name}</strong></figcaption>
                </figure>`;
            });
        } else {
            htmlContent = '<div class="error-no-image">No Images Available</div>';
        }

        responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
    }

    function onFormSubmitted(e){
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        const myRequest = new XMLHttpRequest();
        let myApiKey = '';
        if(nytimesApi.checked){
            myApiKey = '';//<---- Insert your nytimes APIKey right here!!
            myRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${myApiKey}`);
            myRequest.onload = addArticle;
        }else {
            myApiKey = '';//<---- Insert your unsplash APIKey right here!!
            myRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
            myRequest.setRequestHeader('Authorization',`Client-ID ${myApiKey}`);
            myRequest.onload = addImage;
        }
        myRequest.onerror = function(error){
            console.log('** An error occured during this transaction');
        };
        myRequest.send();
    }

})();