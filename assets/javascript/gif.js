// Need to create array of initial gif buttons
// Need variables for still and animated images

var gifs = ["snowboarding", "surfing", "skydiving", "motocross", "scuba diving", "skateboarding", "skiing", "wing suit"];

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

$("#add-gif").on("click", function (event) {
    event.preventDefault();


    // Get the value from the input, save it to a variable
    // Normalize the data, check if the value is inside of the movies array
    // if its not we want to add it and call on renderButtons function again

    var newGif = $("#gif-input").val().trim().toLowerCase();

    if (gifs.indexOf(newGif) === -1 && newGif !== "") {
        gifs.push(newGif);
        $("#gif-input").val("");
        $("#buttons-view").append(newGif);
        renderButtons();

    } else {
        $("#alert-message").text("Already used it, try another!");
        $("#gif-input").val("");
    }

});



$("#gif-input").on("click", function () {
    $("#alert-message").text("");
})

$("#buttons-view").on("click", ".gif-btn", function () {
    var selectedGif = $(this).data("gif");
    // console.log(selectedGif);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        selectedGif + "&api_key=7EiJY9mrc7EqEPuPawrHUGKTDq4AG5pX&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            var results = response.data;
            console.log(results);
            $("#gif-view").empty();


            // We want to get the title, rating, and 2 images, still and animated
            // For each response item we want to create a div container, create an image, and some text elements
            
            var hr = $("<hr>");
            var p = $("<p>").text("Click on image to see it animate!").attr("align", "center");
            $("#gif-view").append(hr, p);

            for (var i = 0; i < results.length; i++) {

                //div container 
                var div = $("<div>").addClass("gifwrap");

                // image tag to display results
                var image = $("<img>");
                image.addClass("result");

                // src displays still gif when first loaded
                image.attr("src", results[i].images.fixed_height_still.url);

                // add alt attribute
                image.attr("alt", results[i].title);

                // add data attributes to make gifs animate 
                image.attr("data-state", "still");
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);

                // variables to hold rating and title
                var h3 = $("<h3>").text(results[i].rating);
                var p = $("<p>").text(results[i].title);

                $(div).append(image, h3, p);
                $("#gif-view").append(div);
            }
        })

})


// .on click function to play and pause gif

$(document).on("click", ".result", function () {

    // create variable to hold data-state of clicked gif

    var state = $(this).attr("data-state");
    // console.log(state);

    // if data state is still then click will change to animate 
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

        // if data state is animated click will change to still 
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});













