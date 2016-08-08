//Host: api.giphy.com
//Path: /v1/gifs/search
//api_key - The public beta key is "dc6zaTOxFJmzC"
//q - search query term or phrase
// limit - (optional) number of results to return, maximum 100. Default 25.
// rating - limit results to those rated (y,g, pg, pg-13 or r).
//Sample: http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC   

	var topics = ['matrix', 'notebook', 'mister', 'lion'];

	function displayGifs() {
		$('#gifScreens').empty();
        var topic = $(this).data('name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
               

                console.log(response)

                var results = response.data;
          
                for (var i = 0; i < results.length; i++) {
                    var topicDiv =  $('<div>');

                    var p = $('<p>').text(results[i].rating);
                    var topicImage = $('<img>');
                    topicImage.attr('src', results[i].images.fixed_height.url);
                    topicImage.attr('class', 'gifs')
                    topicDiv.append(p);
                    topicDiv.append(topicImage);

                    $('#gifScreens').append(topicDiv);
                    }
             });
    };


	$('#addTopic').on('click', function(){		
		var topic = $('#gif-input').val().trim();// store the input from the textbox
		topics.push(topic);//add topic to topics array

		renderButtons();
	
		return false;
	});


	function renderButtons(){ 
		$('#topicsButtons').empty();//delete the movies shown

		for (var i = 0; i < topics.length; i++){
			// Then dynamicaly generates buttons for each movie in the array
		    var newButtons = $('<button>') // This creates a button
		    newButtons.addClass('gifs'); // Add a class 
		    newButtons.attr('data-name', topics[i]); // Add a data-attribute
		    newButtons.text(topics[i]); // Provided the initial button text
		    $('#topicsButtons').append(newButtons); // Add the button to the HTML

		}
	}

	$(document).on('click', '.gifs', displayGifs);




	renderButtons();// calls renderButtons() so the movies in the array are shown the first time