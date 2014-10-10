

var currentTime = new Date();
$(document).on('ready', function() {


/*----------------------------GLOBAL VARIABLES----------------------------*/
	var postArea = $("#new-post");

	var currentTime = new Date();
	var postDate = (currentTime.getMonth() + 1) + '.' + currentTime.getDate() + '.' + currentTime.getFullYear();
	var postTime = ' @ ' + currentTime.getHours() +':' + currentTime.getMinutes();
/*----------------------------INITIALIZATION FUNCTIONS----------------------------*/

	/**
	 * CREATE DOME VALUES FOR POST
	 * @param  {Object} postObject Instance of a Post
	 * @return {DOM}            DOM elements with values for the Post instance
	 */
	var postToDOM = function (postObject) {

// console.log("postToDOM");
// 
// 
		/**
		 * HELPER FUNCTION CREATES DOM ELEMENTS FOR SMALL MEDIA ICONS
		 * @param  {String} media Media name
		 * @return {DOM}       Items specific to Media
		 */
		var makeMediaIndicator = function (media) {
			var mediaIndicator = $('#icon-template').clone();
			mediaIndicator.attr('id', '');
			mediaIndicator.removeClass('template');
			mediaIndicator.find('i').addClass(media + ' fa-' + media);

			return mediaIndicator;
		};


		/**
		 * HELPER FUNCTION CREATES DOM ELEMENTS FOR SMALL MEDIA ADDITION/SUBTRACTION ICONS
		 * @param  {String} media Media name
		 * @return {DOM}       Items specific to Media
		 */
		var makeOptionIndicator = function (media) {
			var mediaOptionIndicator = $('#add-media-template').clone();
			mediaOptionIndicator.attr('id', '');
			mediaOptionIndicator.removeClass('template');
			mediaOptionIndicator.find('i').addClass(media + ' fa-' + media);

// console.log("Media Option", mediaOptionIndicator);

			return mediaOptionIndicator;
		};

			var postDOMElement = $('#template.template-post').clone();

			var removeMediaPost = postDOMElement.find('.minus-media-xs');
			var addMediaPost = postDOMElement.find('.add-media-xs');
			var postMedia = postDOMElement.find('.media-list');

// console.log("addMediaPost", addMediaPost);
// console.log("removeMediaPost", removeMediaPost);

			postDOMElement.attr('id', '');
			if (postObject.reVibeTime) {
				postDOMElement.find('.date').text(postObject.reVibeTime + postObject.postTime);
			}
			else {
				postDOMElement.find('.date').text(postObject.postTime);
			}

// console.log("Post ID", postObject.id);

			postDOMElement.attr('data-post-id', postObject.id);


// console.log(postDOMElement.find('.img-post-user').attr('src'));
			postDOMElement.find('.img-post-user').attr('src', postObject.author.image);
			postDOMElement.addClass( postObject.author.color);
			postDOMElement.find('.post-author').text(postObject.postAuthor);
			postDOMElement.find('.post-text').text(postObject.content);
			
// console.log(postObject);


// console.log("Add Media: list", addMediaPost.find('alter-media-list'));
			if (postObject.facebook) {
				removeMediaPost.after(makeMediaIndicator('facebook'));
				removeMediaPost.find('.alter-media-list').append(makeOptionIndicator('facebook'));

// console.log("Remove facebook", addMediaPost.find('alter-media-list'));
			}

			else {
				addMediaPost.find('.alter-media-list').prepend(makeOptionIndicator('facebook'));
// console.log("TEST");
// console.log($('.add-media-xs').find('li').attr('class'));
			}



			if (postObject.twitter) {
				removeMediaPost.after(makeMediaIndicator('twitter'));
				removeMediaPost.find('.alter-media-list').append(makeOptionIndicator('twitter'));

			}
			else {
				addMediaPost.find('.alter-media-list').prepend(makeOptionIndicator('twitter'));
			}



			if (postObject.instagram) {
				removeMediaPost.after(makeMediaIndicator('instagram'));
				removeMediaPost.find('.alter-media-list').append(makeOptionIndicator('instagram'));
			}
			else {
				addMediaPost.find('.alter-media-list').prepend(makeOptionIndicator('instagram'));
			}


			// if ((postObject.facebook && postObject.twitter && postObject.instagram)) {
			// 	postDOMElement.find('.add-media-xs').addClass('absent');
			// }

			// else {
			// 	// postDOMElement.find('.add-media-xs').show();
			// }

// console.log("Media Icon:", mediaIconXS());

			postDOMElement.removeClass('template');

			return (postDOMElement);
	};

	/**
	 * FILTER POSTSARRAY BY SELECTED MEDIA
	 * @return {[Array]} [Filtered Posts from postsArray]
	 */
	var filterPosts = function () {

console.log("FILTER");

		var showFacebook = true;
		var showTwitter = true;
		var showInstagram = true;

		var iconButton = $('.icon-btn');
		var allIconsButton = $('#btn-all');

		// All is selected
		if (allIconsButton.hasClass('highlight')) {
			showFacebook = true;
			showTwitter = true;
			showInstagram = true;
// console.log("All selected");

		}
		else {
			showFacebook = $('.media-filter.facebook').hasClass('highlight');
			showTwitter = $('.media-filter.twitter').hasClass('highlight');
			showInstagram = $('.media-filter.instagram').hasClass('highlight');
		}

		return _.filter(postsArray, function (postObject) {
// console.log('showFacebook', showFacebook);
// console.log('showTwitter', showTwitter);
// console.log('showInstagram', showInstagram);
// console.log(postObject);

			if (showFacebook && (postObject.facebook === showFacebook)){
				return postObject;
			}
			else if (showTwitter && (postObject.twitter === showTwitter)) {
				return postObject;
			}
			else if (showInstagram && (postObject.instagram === showInstagram)) {
				return postObject;
			}
		});
	};

	filterPosts();

 // console.log("Filtered Posts", filterPosts());


	/**
	 * RENDER THE FEED ON THE PAGE
	 * @return {DOM} Updated feed section
	 */
	var renderFeed = function () {

		var feed = $('#feed');
		feed.empty();

			if ((!($('.media-filter')).hasClass('highlight') && !$('#btn-all').hasClass('highlight'))) {

console.log("resfj;alkdfadf;lksad");
		$('#btn-all').addClass('highlight');
	}


// console.log(filterPosts());

		var renderedPostsArray = filterPosts().map(function (postObject) {
			feed.append(postToDOM(postObject));
		});


console.log("RENDER");



	};

	renderFeed();



/*----------------------------FUNCTIONS----------------------------*/




	/** FROM STACKOVERFLOW	
	 * LOAD PAGE FOR PARTICULAR USER
	 * @param  {URL string} name From the URL
	 * @return {String}      Unique User ID
	 */
	var getParameterByName = function (name) {

	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};



	/**
	 * [CHANGES DOM VALUES FOR THE PROFILE]
	 * @param  {[Object]} currentUser [Instance of User]
	 * @return {[DOM]}             [DOM values to create unique profile]
	 */
	var createUserPage = function(currentUser) {

		$('.user img').attr('src', currentUser.image);
		$('.user-firstName').text(currentUser.firstName + " ");
		$('.user-lastName').text(currentUser.lastName);
		$('.user-age').text('(' + currentUser.age + ')');
	};


	/**
	 * User object
	 * @type {Instance of class User}
	 */
	var currentUser = allUsers[getParameterByName('userId')];
	createUserPage(currentUser);






/*----------------------------FUNCTIONS----------------------------*/


	/**
	 * ADDS NEW POSTS TO POSTSARRAY
	 * @param  {Object} postObject instance of Post
	 * @return {Array}            postsArray
	 */
	var pushPostsArray = function (postObject) {
		postsArray.push(postObject);
	};


	/**
	 * CREATE INSTANCE OF POST
	 * @param  {Object} tempPost temporary object for holding Post values
	 * @return {Object}          Push new instance of Post to postsArray
	 */
	var makeNewPost = function (tempPost) {
		var newPost = new Post(tempPost.postTime, tempPost.id, tempPost.author, tempPost.content, tempPost.facebook, tempPost.twitter, tempPost.instagram, tempPost.tags, tempPost.image, tempPost.isPublic);
		pushPostsArray(newPost);
	};



	/**
	 * DETERMINE WHAT MEDIA WAS CHECKED WHEN CREATING POST
	 * @param  {DOM} media Media icon object that were selected
	 * @return {Boolean}       If the Media icon was checked
	 */
	var checkMedia = function (media) {

		if ($('.to-media' + media).hasClass('highlight')) {
			return true;
		}
		else {
			return false;
		}
	};



/*----------------------------EVENTS----------------------------*/
	
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					NEW POSTS
++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/




	

var newID = 0;
	/**
	 * CREATES A POST
	 * @param  {[Event]} e default
	 * @return {DOM}   Posts to Feed and social media
	 */
	$('.vibe').on('click', function(e) {

console.log("Post Date", postDate);
console.log("Post Time", postTime);
console.log(postDate + postTime);


		var tags = $('.tag-post').val() || null;

		var tempPost = {
			postTime: 'Vibed: ' + (postDate + postTime),
			id: newID,
			author: currentUser,
			postAuthor: null,
			content: postArea.val(),
			color: null,
			facebook: checkMedia('.facebook'),
			twitter: checkMedia('.twitter'),
			instagram: checkMedia('.instagram'),
			tags: [],
			image: null,
			isPublic: false
		};

		if (tags) {
			tempPost.tags = tags.split("#");
		}

		if (!tempPost.facebook && !tempPost.twitter && !tempPost.instagram) {
			return;
		}

		else {

			makeNewPost(tempPost);
			renderFeed();
			savePosts();

			if (tags) {
				tags.val('');
			}
		

			// Close post menu
			$('#btn-post').click();

			newID++;

			postArea.val('');
		}
	});



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					SELECT MEDIA
++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

	/**
	 * HIGHLIGHT MEDIA ICONS AND FILTER FEED BY MEDIA TYPE
	 * @return {Function} Re-render Feed in DOM
	 */
	$('.icon-btn').on('click', function () {

		var nthis = $(this);
		var allIconsButton = $('#btn-all');

		nthis.toggleClass('highlight');


		if (nthis.hasClass('icon')) {
			$('.media-filter').removeClass('highlight');
		}

		else {
			allIconsButton.removeClass('highlight');
		}
		renderFeed();
	});









// $('.dropdown-menu').on('click', function (e) {
// 	e.stopPropagation();
// });






	$(document).on('click', '.to-media', function (e) {
		e.stopPropagation();
		$(this).toggleClass('highlight');

		console.log("highlight");
	});





	$(document).on('click', '.re-vibe', function (e) {
		e.stopPropagation();
		var nthis = $(this);

		var postID = nthis.parent().closest('.post').attr('data-post-id');

	// console.log("Returned Post ID", postID);


		var highlightedElements = "";
		var selectedMedia = nthis.closest('ul').find('i.highlight');

	// console.log("selectedMedia", selectedMedia);


		var reVibedPost = _.find(postsArray, function (postObject) {

	// console.log("Object ID from postsArray", postObject.id);

			return postObject.id == postID;
	});





// console.log("Pushed this", nthis);

		selectedMedia.map(function(index, domElement) {

			if($(domElement).hasClass('facebook')) {
				reVibedPost.facebook = !reVibedPost.facebook;
				highlightedElements += 'Facebook~ ';
			}

			if ($(domElement).hasClass('twitter')) {
				reVibedPost.twitter = !reVibedPost.twitter;
				highlightedElements += 'Twitter~ ';
			}

			if ($(domElement).hasClass('instagram')) {
				reVibedPost.instagram = !reVibedPost.instagram;
				highlightedElements += 'Instagram~ ';
			}
		});



		if (nthis.closest('.dropup').hasClass('add-media-xs')) {
			reVibedPost.reVibeTime = 'ReVibed to ' + highlightedElements + ' On ' + (postDate + postTime) + ' -Originally ';
		}

		if (nthis.closest('.dropup').hasClass('minus-media-xs')) {
			reVibedPost.reVibeTime = 'Vibe removed from ' + highlightedElements + ' On ' + (postDate + postTime) + ' -Originally ';
		}


	console.log("highlightedElements", highlightedElements);

		renderFeed();
		savePosts();

	});

	/**
	 * KEEP DROPUP OPEN
	 * @param  {event} e defualt
	 * @return {function}   stop propogation from bootstrap
	 */
	$('#post-menu textarea').on('click', function(e) {
		e.stopPropagation();
	});


}); // --> END JQUERY