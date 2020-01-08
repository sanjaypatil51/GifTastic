var items = ["dog", "cat", "lion", "elephant"]
// Function for displaying item buttons
function renderButtons() {

    // YOUR CODE GOES HERE
    $("#buttons-view").empty();
    for (i = 0; i < items.length; i++) {
        var newDiv = $("<button>")
        newDiv.attr({ "class": "item-button btn btn-info", "data-name": items[i] })
        //newDiv.attr("type","submit")
        newDiv.text(items[i])
        $("#buttons-view").append(newDiv)
    }

}

// This function handles events where one button is clicked
$("#add-item").on("click", function () {

    // YOUR CODE GOES HERE
    event.preventDefault();
    var newItem = $("#item-input").val().trim();
    items.push(newItem)
    renderButtons()
    $("#item-input").val("")


})


$("#buttons-view").on("click", ".btn", function () {
    console.log("on button")
    var items = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        items + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(results)
            newDiv = $("<div>")
            newDiv.attr({ "class": "row" })
            for (var i = 0; i < 5; i++) {
                var gifDiv = $("<div>");
                gifDiv.attr("class", "col-md-2")

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var itemImage = $("<img>");
                itemImage.attr({ "src": results[i].images.fixed_height.url, "class": "img-fluid" });

                gifDiv.prepend(p);
                gifDiv.prepend(itemImage);
                newDiv.append(gifDiv)

                $("#gifs-appear-here").prepend(newDiv);
            }
            newDiv = $("<div>")
            newDiv.attr({ "class": "row" })
            for (var i = 5; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.attr("class", "col-md-2")

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var itemImage = $("<img>");
                itemImage.attr({ "src": results[i].images.fixed_height.url, "class": "img-fluid" });

                gifDiv.prepend(p);
                gifDiv.prepend(itemImage);
                newDiv.append(gifDiv)

                $("#gifs-appear-here").prepend(newDiv);
            }
        });
})

renderButtons()
