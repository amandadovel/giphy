// Need to create array of initial gif buttons
// Need variables for still and animated images

var gifs = ["snowboarding", "surfing", "skydiving", "motocross"];

// function for displaying gif data

function renderButtons() {

    // take each element inside of gifs and create a button with the element text inside button
    // display button on the html 

    $("buttons-view").empty();

    for (var i = 0; i < gifs.length; i++) {
        var button = $("<button>").text(gifs[i]).addClass("gif-btn btn").data("gif", gifs[i]);
        $("buttons-view").append(button);
    }
}

