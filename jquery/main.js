$(document).ready(function(){
    const $form = $('#search-form');
    const $searchField = $('#search-keyword');
    const $responseContainer = $('#response-container');
    const $nytimesApi = $('#nytimesApi');
    let searchedForText;

    $form.on('submit', onFormSubmitted);

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

        $responseContainer.html(htmlContent);
    }

    function addImage(images){
        let htmlContent = '';

        if(images && images.results[0]){
            images.results.map(function(image){
                htmlContent += `<figure>
                    <img class="img-responsive" src="${image.urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by <strong>${image.user.name}</strong></figcaption>
                </figure>`;
            });
        } else {
            htmlContent = '<div class="error-no-image">No Images Available</div>';
        }

        $responseContainer.html(htmlContent);
    }

    function onFormSubmitted(e){
        e.preventDefault();
        $responseContainer.html('');
        searchedForText = $searchField.val();
        let myApiKey;

        if($nytimesApi.prop('checked')){
            myApiKey = '';//<--- Insert your nytimes APIKey here!
            $.ajax({
                url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${myApiKey}`,
            }).done(addArticle).fail(function(err){
                console.log(err);
            });
        }else {
            myApiKey = '';//<--- Insert your Unsplash APIKey here!
            $.ajax({
                url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
                headers: {
                    Authorization: `Client-ID ${myApiKey}`
                }
            }).done(addImage).fail(function(err){
                console.log(err);
            });
        }
    }
});