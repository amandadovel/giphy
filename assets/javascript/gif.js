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

$("button").on("click", function() {
    var selectedGif = $(this).data("gif");
    console.log(selectedGif);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    selectedGif + "&api_key=7EiJY9mrc7EqEPuPawrHUGKTDq4AG5pX&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){
    console.log(response);

    // We want to get the title, rating, and 2 images, still and animated
    // For each response item we want to create a div container, create an image, and some text elements

    // for(var i = 0; i < results.length; i ++) {
    //     var div = $("<div>").addClass("gifwrap");
    //     var image = $("<img>").attr("src", results[i].images.original_still.url).attr("alt", results[i].title).data("still", results[i].images.original_still.url).data("animate", results[i].images.original.url);
    //     var h3 = $("<h3>").text(results[i].rating);
    //     var p = $("<p>").text(results[i].title);
    //     $(div).append(image, h3, p);
    //     $("gif-view").append(div);
    // }
    })
})

//renderButtons();






