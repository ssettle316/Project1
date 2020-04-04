// Creating Global functionality for youtube player
//  This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// This function creates an <iframe> (and YouTube player)
//    after the API code downloads
// Setting global player variable which will become our video player object.
var player;
function onYouTubeIframeAPIReady() {
    var storageID = localStorage.getItem("id");
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}


// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}
// The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

// Setting up functionality to query Youtube based on cuisine type
// var apiKey = "&apiKey=03c52fdc9d7a467aa7f8489135117004";
var apiKey = "&apiKey=342d9fcabf2745f3b540175f5ce635b0";
var recipesObject = []
var randomRecipe = [];

var youtubeApiKey = "&key=AIzaSyBRK5moDnRGsxK7xpVFcx8F_vDNuV-2vdg";
var youtubeQueryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=";
var searchValue;

// Generating Youtube search utilizing title in random recipe object
function youtubeSearch(searchValue) {
    searchValue = randomRecipe[0]["title"];
    var recipeString;
    var arraySearchVal = [...searchValue]
    var spaceIndeces = []
    var firstChar = [0];

    for (i = 0; i < searchValue.length; i++) {
        if (arraySearchVal[i] === " ") {
            spaceIndeces.push(i);
        }
    }

    for (i = 0; i < spaceIndeces.length; i++) {
        var firstCharIndex = spaceIndeces[i] + 1
        firstChar.push(firstCharIndex);
    }

    // Creating words array from search and appending all ingredients in search
    var wordArray = [searchValue.substring(0, spaceIndeces[0])];

    if (spaceIndeces.length >= 1) {

        for (i = 1; i < spaceIndeces.length; i++) {
            var newWordVal = searchValue.substring(firstChar[i], spaceIndeces[i]);
            wordArray.push(newWordVal);
        }
        var lastValFirstChar = spaceIndeces[spaceIndeces.length - 1] + 1
        wordArray.push(searchValue.substring(lastValFirstChar, (searchValue.length)));
    }

    var firstValue = wordArray[0];
    var newWordArray = [];
    for (i = 1; i < wordArray.length; i++) {
        var stringWordArray = "%20" + wordArray[i]
        newWordArray.push(stringWordArray);
    }
    var finalRecipeString = firstValue.concat(newWordArray.join(""));
    var newQueryURL = youtubeQueryURL + finalRecipeString + youtubeApiKey;

    $.ajax({
        url: newQueryURL,
        method: "GET"
    }).then(function (response) {
        var id = response.items[0]["id"]["videoId"];
        player.cueVideoById({'videoId': id});

    });
}
// Functionality to generate recipe 

       
    //     var ingValues = $("#ings").val();
    //     var arrayVal = [... ingValues];
    //     var commaIndeces = [];
    //     var firstChar = [0];

        
    //     for (i=0; i<arrayVal.length; i++) {
    //         if (arrayVal[i]===",") {
    //             commaIndeces.push(i);
    //         }
    //     }

    //     for (i=0; i<commaIndeces.length; i++) {
    //         var firstCharIndex = commaIndeces[i] + 2
    //         firstChar.push(firstCharIndex);
    //     }
    //     // Creating Ingredients array from search and appending all ingredients in search
    //     var ingArray = [ingValues.substring(0, commaIndeces[0])];

    //     if (commaIndeces.length >= 1) {
        
    //     for (i=1; i< commaIndeces.length; i++) { 
    //         var newIngVal = ingValues.substring(firstChar[i], commaIndeces[i]);
    //         ingArray.push(newIngVal);
    //         }
    //     var lastValFirstChar = commaIndeces[commaIndeces.length - 1] + 2
    //     ingArray.push(ingValues.substring(lastValFirstChar, (ingValues.length))); 
    //     }
    // //   Take array and use to populate queryURL using for loop

    // var newIngArray = []
    // var firstValue = ingArray[0]
    
    // for (i=1; i<(ingArray.length); i++) {
    //     var stringIngArray = ",+" + ingArray[i]
    //     newIngArray.push(stringIngArray);
    //     }

    // var finalIngString = firstValue.concat(newIngArray.join(""));
    // var spoonQueryURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + finalIngString + apiKey
    // // console.log(queryURL)

    // Get Recipe by Ingredients ajax call + 
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {

    //     recipeIDs.push(repsonse[i]["id"]
    //     // var randomIndex = Math.floor(Math.random()*10)
    //     // // Appending 
    //     // var recipeName = $("<p>")
    //     // recipe.text(response[randomIndex].title)
    //     // $("#rec-name").append(recipe);
    //     // // Appending Image
    //     // var recipeImg = $("<img>");
    //     // recipeImg.attr("scr", response.)

    //       });

     //  Serach by Cuisine Functionality
function getRecipeByCuisine(cuisine) {

    var cuisineQueryURL = "https://api.spoonacular.com/recipes/search?cuisine="
    var newCuisineURL = cuisineQueryURL + cuisine + "&number=100" + apiKey;

    $.ajax({
        url: newCuisineURL,
        method: "GET"
    }).then(function (response) {

        // Storing each result's id and title as an object in the recipes array

        for (i = 0; i < response.results.length; i++) {
            var newRecipeObject = { "id": response.results[i]["id"], "title": response.results[i]["title"] };
            recipesObject.push(newRecipeObject);
        }


        // Using randomly generated number to form ajax search to get full recipe information
        randomRecipe.push(recipesObject[Math.floor(Math.random() * 100)]);
        var newid = randomRecipe[0]["id"]
        var ingredientsURL = "https://api.spoonacular.com/recipes/" + newid + "/information?includeNutrition=false" + apiKey
        $.ajax({
            url: ingredientsURL,
            method: "GET"
        }).then(function (response) {
            // console.log(genRecObject);
            // Dynamically updating HTML/CSS for Wine pairing and Recipe Goes HERE
            var recipeDiv = $("#recipeParent2");
            var centerDiv = $("#recipeParent");

            var title = $("<h5>").text(response.title);
            var totalMinutes = $("<p>").text("Total Minutes: " + response.readyInMinutes + " minutes");
            var imageEl = $("<img>").attr("src", response.image);
            var servings = $("<p>").text("Servings: " + response.servings);
            var ingredients = $("<div>");

            var ingredientsList = $("<ul>");
            // console.log(response.extendedIngredients[]);
            for (i = 0; i < response.extendedIngredients.length; i++) {
                var insListEl = $('<li>').text((response.extendedIngredients[i]["name"]) + "," + " " + response.extendedIngredients[i]["amount"] + " " + response.extendedIngredients[i]["unit"])
                ingredientsList.append(insListEl);
            }
            ingredients.append(ingredientsList);
            var pairedWine = response.winePairing.pairedWines
            if (pairedWine == null || pairedWine.length === 0) {
                switch (cuisine) {
                    case (cuisine = "Italian"):
                        newPairedWine = "Pinot Grigio, Chianti"
                        break;

                    case (cuisine = "American"):
                        newPairedWine = "Chardonnay, Pinot Noir"
                        break;

                    case (cuisine = "French"):
                        newPairedWine = "Bordeaux Blend, Champagne"
                        break;

                    case (cuisine = "Mexican"):
                        newPairedWine = "Rioja, Chardonnay";
                        break;
                    case (cuisine = "Mediterranean"):
                        newPairedWine = "Pinot Grigio, Cabernet";
                        break;
                    case (cuisine = "European"):
                        newPairedWine = "Chardonnay, Nebiolo";
                        break;
                    case (cuisine = "Vegan"):
                        newPairedWine = "Pinot Noir, Chardonnay";
                        break;
                    case (cuisine = "Vegetarian"):
                        newPairedWine = "Cabernet Sauvignon, Sauvignon Blanc";
                        break;
                }
                var winePairingEl = $("<p>").text("Wine Suggestions: " + newPairedWine)
                recipeDiv.append(totalMinutes, servings, ingredients, winePairingEl);
            }
            else {
                var pairing = $("<p>").text("Wine Suggestions: " + response.winePairing.pairedWines);
                var text = $("<p>").text(response.winePairing.pairingText);
                var suggestedWineDiv = $("<div>");
                var suggestedWineTitle = $("<p>")
                var suggestedWineURL = response.winePairing.productMatches[0]["link"];
                var suggestedWineLink = $("<a>").attr("href", suggestedWineURL);
                suggestedWineLink.text(response.winePairing.productMatches[0]["title"]);
                suggestedWineTitle.append(suggestedWineLink);
                var suggestedWineImg = $("<img>").attr("src", response.winePairing.productMatches[0]["imageUrl"]);
                var suggestedWinePrice = $("<p>").text(response.winePairing.productMatches[0]["price"]);
                var suggestedWineText = $("<p>").text(response.winePairing.productMatches[0]["description"]);
                suggestedWineDiv.append(suggestedWineTitle, suggestedWineImg, suggestedWinePrice, suggestedWineText);
                recipeDiv.append(totalMinutes, servings, ingredients, pairing, text, suggestedWineDiv);
            }
            var recSummary = $("<p>").html(response.summary);
            console.log(response);

            // Displaying instructions for recipe if not null in response
            if (recipeDiv.analyzedInstructions !== null || recipeDiv.analyzedInstructions.length !== 0) {
                var instructions = $("<div>");
                var instructionsHeader = $("<h6>").text("Instructions")
                var instructionsList = $("<ol>");
                instructions.append(instructionsHeader, instructionsList);
                for (i = 0; i < response.analyzedInstructions[0]["steps"].length; i++) {
                    var steps = $('<li>').text(response.analyzedInstructions[0]["steps"][i]["step"]);
                    instructionsList.append(steps);
                }
            }
            else {
                console.log("this")
            }

            // recipeDiv.append(totalMinutes, prepMinutes, cookingMinutes, servings, ingredients, winePairing, pairing, instructions);
            centerDiv.prepend(title, recSummary, imageEl);
            recipeDiv.append(instructions);






        });


        youtubeSearch(searchValue);
        recipesObject = [];
        randomRecipe = [];
        $("#ings").val(" ");
    })
}        

$("#meals").on("change", function () {
    $("#recipeParent").empty();
    $("#recipeParent2").empty();
    var cuisine = $("#meals").val();  
     getRecipeByCuisine(cuisine);

    // Load Youtube Video for Recipe

 });

$("#randomEatButton").on("click", function(){
    $("#recipeParent").empty();
    $("#recipeParent2").empty();
    var cuisineArray = ["Italian", "American", "French", "Mexican", "Mediterranean", "European", "Vegan", "Vegetarian"];
    var cuisine;
    for (i=0; i<cuisineArray.length; i++) {
        cuisine = cuisineArray[Math.floor(Math.random()*cuisineArray.length)]
    }    
   getRecipeByCuisine(cuisine) 
}); 






