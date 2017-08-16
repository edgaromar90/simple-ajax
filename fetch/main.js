(function(){
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');
    const nytimesApi = document.querySelector('#nytimesApi');
    let searchedForText;

    form.addEventListener('submit', onFormSubmitted);

    function addArticle(articles){
        let htmlContent = '';

        if(articles.response && articles.response.docs && articles.response.docs.length > 1){
            htmlContent += '<ul class="row article">'
            articles.response.docs.map(function(article){
                htmlContent += `<li class="col-5">
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

    function addImage(images){
        let htmlContent = '';

        if(images && images.results[0]){
            images.results.map(function(image){
                htmlContent += `<figure>
                    <img class="img-responsive" src="${image.urls.small}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by <strong>${image.user.name}</strong></figcaption>
                </figure>`;
            });
        } else {
            htmlContent = '<div class="error-no-image">No Images Available</div>';
        }

        responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
    }

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend',
            `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }

    function onFormSubmitted(e){
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        let myApiKey = '';

        if(nytimesApi.checked){
            myApiKey = '';//<--- Insert your nytimes APIKey here!
            fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${myApiKey}`)
                .then(response => response.json())
                .then(addArticle)
                .catch(e => requestError(e, 'articles'));
        }else {
            myApiKey = '';//<--- Insert your Unsplash APIKey here!
            fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
                headers: {
                    Authorization: `Client-ID ${myApiKey}`
                }
            }).then(response => response.json())
            .then(addImage)
            .catch(e => requestError(e, 'images'));
        }
    }
})();