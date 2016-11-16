// The initial set of buttons for the app
var initButtons = ["Ford", "Chevrolet", "Dodge", "Cadillac", "Volkswagen", "Porsche", "Ferrari", 
					"Maserati", "Rolls Royce", "Bentley"];

// init()
// Page initialization. Sets up the initial app buttons. The app uses the Materialize css framework
// for layout
function init() {

	// add the initial buttons to the page
	$(".buttonsRow").append("<div class='col s12 buttons'></div>");
	for (var i = 0; i < initButtons.length; i++) {
		$(".buttons").append(btnSearchNew(initButtons[i]));
	}

	// set up the button click handler for the app
	$(".buttonsRow").on("click", ".btnSearch", function () {
		showGifs($(this).val());
	});

	// set up the button click handler to add new buttons
	$("#addButton").on("click", function () {
		console.log($("#marqueName").val());
		console.log($("#marqueName").val().length);
		if ($("#marqueName").val().length > 0) {
			$(".buttons").append(btnSearchNew($("#marqueName").val()));
			$("#marqueName").val("");
		}
	});

	// set up the image click handler to animate the gif
	$("#areaGif").on("click", ".imgGif", function () {
		if ($(this).data("state") == "still") {
			$(this).attr("src", $(this).data("anim-url"));
			$(this).data("state", "anim");
		} else {
			$(this).attr("src", $(this).data("still-url"));
			$(this).data("state", "still");
		}
	});

}

// showGifs(srchTerm)
// Main function to load the selected gifs from the giphy site. Intended to be called from the
// button handler for the app buttons. Executes the ajax call for the API.
//		srchTerm - the search term sent to the giphy site
function showGifs(srchTerm) {

	// make the ajax call and initiate loading the returned gifs when it is done
	$.ajax({url: srchURLNew(srchTerm), method: "GET"}).done(function(response) 
	{
		// clear any existing gifs
		$("#gifs1").empty();
		$("#gifs2").empty();
		$("#gifs2").empty();
		$("#gifs4").empty();
		// iterate through the data for the 10 returned gifs, loading it into the app html
		for (var i = 0; i < 10; i++) {
			loadGif(response.data[i], i);
		};
	});

}

// loadGif(dataGif, ndx)
// Loads the gif urls and rating data into the app html. By design, the 10 gifs are loaded three to a row
// with a fourth row containing the 10th gif centered.
//		dataGif - the unculled JSON for the returned gif with the index 'ndx'
//		ndx - the index of this returned gif; used to determine which row it appears in
function loadGif(dataGif, ndx) {

	// get the appropriate row element for this gif to appear in
	var rowGif;
	switch (ndx) {
		case 0:
		case 1:
		case 2:
			rowGif = $("#gifs1")
			break;
		case 3:
		case 4:
		case 5:
			rowGif = $("#gifs2")
			break;
		case 6:
		case 7:
		case 8:
			rowGif = $("#gifs3")
			break;
		case 9:
			rowGif = $("#gifs4")
			break;
	}

	// load the gif html elements into the appropriate row
	$(rowGif).append(cellGifNew(dataGif.images.original_still.url, dataGif.images.original.url, dataGif.rating));

	// center the gif if it is in the last row
	if ($(rowGif).attr("id") == "gifs4") {
		$(rowGif).prepend("<div class='col s4'></div>");
	}

}

// btnSearchNew(value)
// Creates a new app button with the provided value
function btnSearchNew(value) {
	var strHTML = "<button class='btnSearch waves-effect waves-light btn' value='%val%'>%val%</button>";
	return strHTML.replace(/%val%/g, value);
}

// srchURLNew(srchTerm)
// Returns a giphy api url for the provided search term. Asks for a maximum of data for 10 gifs
// to be returned.
function srchURLNew(srchTerm) {
	var strURL = "https://api.giphy.com/v1/gifs/search?q=%srch%&limit=10&api_key=dc6zaTOxFJmzC";
	return strURL.replace(/%srch%/g, srchTerm);
}

// cellGifNew(still_url, anim_url, rating)
// Returns a new element for containing the gif specified by the provided urls
//		still_url - the url for a still version of the gif
//		anim_url - the url for an animated version of the gif
//		rating - the rating to be displayed for the gif
function cellGifNew(still_url, anim_url, rating) {

	// template for the img and paragraph tags associated with the gif
	var strHTML = "<img class='imgGif' src='%still_url%' data-still-url='%still_url%' data-anim-url='%anim_url%' data-state='still'><p>Rating: %rating%</p>";
	// a new container to hold the <img> and <p> elements for the gif
	var cell = $("<div>").attr("class", "col s4 cellGif");

	// replace the placeholders in the template with the appropriate data
	strHTML = strHTML.replace(/%still_url%/g, still_url);
	strHTML = strHTML.replace(/%anim_url%/g, anim_url);
	strHTML = strHTML.replace(/%rating%/g, rating);

	// insert the <img> and <p> elements into the container
	$(cell).append(strHTML);

	return cell;

}

// start the app up
init();
