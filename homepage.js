

$(document).on('ready', function() {


/*----------------------------FUNCTIONS----------------------------*/


	/*FROM STACKOVERFLOW*/
	var getParameterByName = function (name) {

	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};

	/**
	 * [createUserPage description]
	 * @param  {[type]} currentUser [description]
	 * @return {[type]}             [description]
	 */
	var createUserPage = function(currentUser) {

		$('.user img').attr('src', currentUser.image);
		$('.user-firstName').text(currentUser.firstName + " ");
		$('.user-lastName').text(currentUser.lastName);
		$('.user-age').text('(' + currentUser.age + ')');

console.log("create page");
	};

var postArea = $("#new-post");

var renderFeed = function () {

	var feed = $('#feed');
	feed.empty();


console.log('postsArray', postsArray);
// console.log
	var rendederedPostsArray = postsArray.map(function (postObject) {

		return postObject.renderPost;
	});

	feed.append($(rendederedPostsArray));
};

	/**
	 * User object
	 * @type {Instance of class User}
	 */
	var currentUser = allUsers[getParameterByName('userId')];
	createUserPage(currentUser);


/*----------------------------EVENTS----------------------------*/
	
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					NEW POSTS
++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	
	var tempPost = {
		postTime: null,
		author: null,
		postAuthor: null,
		content: null,
		color: null,
		facebook: false,
		twitter: false,
		instagram: false,
		tags: [],
		image: null,
		isPublic: false
	};

	/**
	 * KEEP DROPUP OPEN
	 * @param  {event} e defualt
	 * @return {function}   stop propogation from bootstrap
	 */
	$('#post-menu').on('click', function(e) {
		e.stopPropagation();
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

	var checkMedia = function (media) {

		if ($('.to-media' + media).hasClass('highlight')) {
		return true;
		}

		else {
			return false;
		}
	};

	$('.vibe').on('click', function(e) {

		var currentTime = new Date();
		var postDate = 'Vibed: ' + (currentTime.getMonth() + 1) + '.' + currentTime.getDate() + '.' + currentTime.getYear();
		var postTime = ' @ ' + currentTime.getHours() +':' + currentTime.getMinutes();

		var tags = $('.tag-post').val() || null;

		tempPost.author = currentUser;
		tempPost.postTime = (postDate + postTime);
		tempPost.facebook = checkMedia('.facebook');
		tempPost.twitter = checkMedia('.twitter');
		tempPost.instagram = checkMedia('.instagram');
		tempPost.content = postArea.val();

		if (tags) {
			tempPost.tags = tags.split("#");
		}

		postsArray.push(tempPost);

		renderFeed();

		// postArea.val('');
		if (tags) {
			tags.val('');
		}


		// EMPTY OUT THE FIELDS

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


console.log("This user", currentUser);



}); // --> END JQUERY