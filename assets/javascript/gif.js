// Need to create onlick event for buttons already on page

// $("button").on("click", function() {
//     var gif = $(this).attr("data-gif");
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//       gif + "&api_key=7EiJY9mrc7EqEPuPawrHUGKTDq4AG5pX&limit=10";

// // ajax call 

// $.ajax({
//     url: queryUrl,
//     method: "GET"
//   })

// Need to create array of initial gif buttons
// Need variables for still and animated images

var gifs = ["snowboarding", "surfing", "skydiving", "motocross"];

// function for displaying gif data

function renderButtons() {

    // take each element inside of gifs and create a button with the element text inside button
    // display button on the html 

    $("#buttons-view").empty();

    for (var i = 0; i < gifs.length; i++) {
        var button = $("<button>").text(gifs[i]).addClass("gif-btn btn").data("gif", gifs[i]);
        $("#buttons-view").append(button);
    }
}

renderButtons();



// Function that handles events where one button is clicked 

    $("#add-gif").on("click", function(event) {
        event.preventDefault();


// Get the value from the input, save it to a variable
// Normalize the data, check if the value is inside of the movies array
// if its not we want to add it and call on renderButtons function again

    var newGif = $("#gif-input").val().trim().toLowerCase();

    if(gifs.indexOf(newGif) === -1 && newGif !== "") {
        gifs.push(newGif);
        $("#gif-input").val("");
        renderButtons();

    }else{
    $("#alert-message").text("Try another Giphy!");
    $("#gif-input").val("");
  }

});

$("#gif-input").on("click", function() {
    $("#alert-message").text("");
})

$("#buttons-view").on("click", ".gifbtn", function() {
    var selectedGif = $(this).data("gif");
    console.log(selectedGif);
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + selectedGif + "&api_key=7EiJY9mrc7EqEPuPawrHUGKTDq4AG5pX&limit=10";
    $.get(queryUrl, function(giphyResponse){
    var giphyArray = giphyResponse.data;
    console.log(giphyResponse.data);
    })
});






