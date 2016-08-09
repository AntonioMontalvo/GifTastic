//Host: api.giphy.com
//Path: /v1/gifs/search
//api_key - The public beta key is "dc6zaTOxFJmzC"
//q - search query term or phrase
// limit - (optional) number of results to return, maximum 100. Default 25.
// rating - limit results to those rated (y,g, pg, pg-13 or r).
//Sample: http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC   

	var topics = ['akira', 'disney', 'studio ghibli', 'nemo', 'superman', 'thor', 'tow-mater', 'bugs-bunny','zootpia', 'madagascar', 'minions'];

	$('#addTopic').on('click', function(){		
		var topic = $('#gif-input').val().trim();// store the input from the textbox
		if(topic ===""){
			alert('Add your topic or click on one provided for you!');
		}else{
		topics.push(topic);//add topic to topics array
		}
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
                    topicDiv.attr('class', 'frame');

                    var p = $('<p>').text("This Gif is rated: "+ results[i].rating);
                    var topicImage = $('<img>');
                    topicImage.attr('src', results[i].images.fixed_height_still.url);
                    topicImage.attr('class', 'topicSet');
                    topicImage.attr('data-animate', results[i].images.fixed_height.url);
                    topicImage.attr('data-still', results[i].images.fixed_height_still.url);
                    topicImage.attr('data-state', 'still');
                    topicDiv.append(p);
                    topicDiv.append(topicImage);

                    $('#gifScreens').append(topicDiv);
                    }
             });
    };
	$(document).on('click', '.gifs', displayGifs);



function startStopGif(){
	        var state = $(this).attr('data-state'); 
	   
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        
	    };

	 $(document).on('click', '.topicSet', startStopGif);   












	renderButtons();// calls renderButtons() so the movies in the array are shown the first time