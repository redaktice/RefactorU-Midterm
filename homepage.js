

$(document).on('ready', function() {


/*----------------------------GLOBAL VARIABLES----------------------------*/
	var postArea = $("#new-post");


/*----------------------------INITIALIZATION FUNCTIONS----------------------------*/

	/**
	 * CREATE DOME VALUES FOR POST
	 * @param  {Object} postObject Instance of a Post
	 * @return {DOM}            DOM elements with values for the Post instance
	 */
	var postToDOM = function (postObject) {

		
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

			var postDOMElement = $('#template.template-post').clone();

			var postMedia = postDOMElement.find('.media-list');


			postDOMElement.attr('id', '');
			postDOMElement.find('.date').text(postObject.postTime);
			postDOMElement.find('.post-author').text(postObject.postAuthor);
			postDOMElement.find('.post-text').text(postObject.content);


			if (postObject.facebook) {
				postMedia.append(makeMediaIndicator('facebook'));
			}
			if (postObject.twitter) {
				postMedia.append(makeMediaIndicator('twitter'));
			}
			if (postObject.instagram) {
				postMedia.append(makeMediaIndicator('instagram'));
			}


			if (!(postObject.facebook && postObject.twitter && postObject.instagram)) {
				postMedia.find('.add-media-xs').attr('id', '');
			}

// console.log("Media Icon:", mediaIconXS());

			postDOMElement.removeClass('template');

			return (postDOMElement);
	};




	/**
	 * RENDER THE FEED ON THE PAGE
	 * @return {DOM} Updated feed section
	 */
	var renderFeed = function () {

		var feed = $('#feed');
		feed.empty();

		var renderedPostsArray = postsArray.map(function (postObject) {
			feed.prepend(postToDOM(postObject));
		});
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
		var newPost = new Post(tempPost.postTime, tempPost.author, tempPost.content, tempPost.facebook, tempPost.twitter, tempPost.instagram, tempPost.tags, tempPost.image, tempPost.isPublic);
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




	/**
	 * KEEP DROPUP OPEN
	 * @param  {event} e defualt
	 * @return {function}   stop propogation from bootstrap
	 */
	$('#post-menu').on('click', function(e) {
		e.stopPropagation();
		// savePosts();
	});


	/**
	 * CHOOSE TO WRITE A NEW POST
	 * @param  {event} e default
	 * @return {DOM}   Focuses on the new post text area
	 */
	// $('#btn-post').on('click', function(e) {
		// var postArea = $("#new-post");
	// 	postArea.focus();
	// });




	/**
	 * CREATES A POST
	 * @param  {[Event]} e default
	 * @return {DOM}   Posts to Feed and social media
	 */
	$('.vibe').on('click', function(e) {

		var currentTime = new Date();
		var postDate = 'Vibed: ' + (currentTime.getMonth() + 1) + '.' + currentTime.getDate() + '.' + currentTime.getYear();
		var postTime = ' @ ' + currentTime.getHours() +':' + currentTime.getMinutes();

		var tags = $('.tag-post').val() || null;

		var tempPost = {
			postTime: (postDate + postTime),
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

		makeNewPost(tempPost);
			
		renderFeed();

		savePosts();

		if (tags) {
			tags.val('');
		}
	
		// Close post menu
		$('#btn-post').click();
	});



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					SELECT MEDIA
++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

	/**
	 * CLICK A MEDIA ICON
	 * @return {[Adds Class]} Highlights the clicked button
	 */
	$('.icon-btn, .to-media').on('click', function () {
		$(this).toggleClass('highlight');
	});




}); // --> END JQUERY