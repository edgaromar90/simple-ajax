# Simple Ajax
This is a simple App that can search **articles** from the [New York Times API](http://developer.nytimes.com/) or **images** from [Unsplash API](https://unsplash.com/developers) and display the results in the same page. The purpose of creating this app was to use 3 different methods to accomplish the same result, which is to fetch data from an api, exploring 3 mehotds of Asynchronous data request.
* `XMLHttpRequest` or **`XHR`**
* JQuery **`$.ajax()`** method
* `Fetch` API

_**Note:**_ Each directory has the name of the method implemented in `main.js`.

## Prerequisites
You will need the API key from [NYtimes](http://developer.nytimes.com/) and [Unsplash](https://unsplash.com/developers). Once you have these API keys you can go to each `main.js` file and paste the keys. I've left some comments in those files to indicate where you have to insert your API Keys.

After that is done no installation of any software is required. Just open the `index.html` file with a browser of your choice and search anything you want.

## Exploring each method
If you want to switch between the methods go inside the HTML file `index.html` and you'll see this lines of code at the bottom of the file.

```
<!-- Using XMLHttpRequest for the Ajax call -->
    <!-- <script src="./xhr/main.js"></script> -->

    <!-- Using $.ajax with Jquery for the Ajax call -->
    <!-- <script
      src="https://code.jquery.com/jquery-2.2.4.js"
      integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
      crossorigin="anonymous"></script>
    <script src="./jquery/main.js"></script>-->

    <!-- Using the Fetch API for the Ajax call -->
    <script src="./fetch/main.js"></script>
```
As you can see the commented code is between `<!-- Comment -->`. Just comment all the methods and uncomment the one that you want to use. In this case we're using **`fetch`**.

**Caveat:** When trying the `JQuery` method make sure to uncomment the _JQuery CDN_ included before the call to `./jquery/main.js`.

## Important
Inside each JS file you'll find the Cliend ID for the APIs call.
One for the **New York Times API** and another one for the **Unsplash API** if by the time you're trying out this code these codes are no longer working, feel free to visit these websites and create an account to get the Key for these APIs. When you're done you can copy the `Client-ID` and exchange it with the old ones.

* [New York Times API](http://developer.nytimes.com/)
* [Unsplash API](https://unsplash.com/developers)

## Developed by
_Edgar Henriquez R._
