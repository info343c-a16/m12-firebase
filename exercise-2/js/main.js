// Main.js
$(function() {

	// Setup: Initialize Firebase using the configuration of your project
	var config = {
		apiKey: "AIzaSyDpsLDR3ClbFD076UGEsWdZC6C_KA-8DY4",
		authDomain: "m13-ex1-ce6a7.firebaseapp.com",
		databaseURL: "https://m13-ex1-ce6a7.firebaseio.com",
		storageBucket: "m13-ex1-ce6a7.appspot.com",
		messagingSenderId: "155683451358"
	};

	firebase.initializeApp(config);

	// Set a reference to a "photos" point in your database
	var photos = firebase.database().ref('photos');
	var storage = firebase.storage();
	var fileRef = storage.ref('photos');

	// Create a variable to store the firebase storage object


	// Set listener: when an child is added, render each photo
	photos.on('child_added', function(photo){
		// Get the value of the data
		var photoUrl = photo.url;
		// Using jQuery, create a new img element with the URL of your data
		var img = $('<img src=' + photoUrl + '>');
		// Append your img to your element with id photos
		$("#photos").append(img);
	});
		




	// Reading Data: Form submission

		// Get the file
		var file = $("#file-upload")[0].files[0];

		// Create a reference on Firebase storage using the filename
		// Put a file in the specified location, then...
		fileRef.put(file).then(function(){
			// Get the download URL from the reference, then...
			fileRef.getDownloadURL.then(function(photoUrl){
				// Push the URL as a new child into your data structure
				photos.push({
					url: photoUrl
				})
			})
			

		});	
