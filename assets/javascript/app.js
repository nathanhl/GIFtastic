$(document).ready(function() {
    // creates array of characters
    var topics = ['Ron Swanson', 'Leslie Knope', 'Andy Dwyer', 'April Ludgate', 'Tom Haverford', 'Ben Wyatt', 'Ann Perkins', 'Chris Traeger', 'Jerry Gergich', 'Donna Meagle'];


    //  create a button for each character
    function gifExpress() {
        $('#buttonsView').empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $('<button>');
            a.addClass('character');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }
    gifExpress();

    //on button click
    $(document).on('click', '.character', function() {

            var express = $(this).html();
            console.log(express);

            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + express + "&api_key=dc6zaTOxFJmzC&limit=10";
            $.ajax({ url: queryURL, method: 'GET' })
                .done(function(response) {
                    var results = response.data;
                    $('#gifView').empty();
                    for (var j = 0; j < results.length; j++) {
                        var imageDiv = $('<div>');
                        var imageView = results[j].images.fixed_height.url;
                        var still = results[j].images.fixed_height_still.url;
                        var expressGIF = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                        expressGIF.attr('data-state', 'still');
                        $('#gifView').prepend(expressGIF);
                        expressGIF.on('click', playGif);
                        var rating = results[j].rating;
                        var displayRated = $('<p>').text("Rating: " + rating);
                        $('#gifView').prepend(displayRated);

                    };
                }); 
            function playGif() {
                var state = $(this).attr('data-state');
                console.log(state);
                if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                };

            };
        });
// adding new buttons
    $(document).on('click', '#addCharacter', function() {
        if ($('#express-input').val().trim() == '') {
            alert("Don't leave it blank!");
        } else {
            var express = $('#express-input').val().trim();
            topics.push(express);
            $('#express-input').val('');
            gifExpress();
            return false;

        };

    });

});
