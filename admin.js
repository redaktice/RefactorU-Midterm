
  
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
									STORAGE
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


/**
 * Save information for each User
 * @return {[object]} localStorage with values from the User
 */
var saveUsers = function() {

	localStorage.setItem('allData', JSON.stringify(allUsers));
};




/**
 * Save information for each Post
 * @return {[object]} localStorage with values from the Post
 */
var savePosts = function() {

	localStorage.setItem('allPosts', JSON.stringify(postsArray));
};


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
									CLASSES
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					USER
++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*--------------CONSTRUCTOR-----------------*/

/**
 * Creates base class for user
 * @param {string}  firstName     First Name
 * @param {string}  lastName     Last Name
 * @param {string}  email     User email
 * @param {number}  age      Age
 * @param {image}  image    User Picture
 * @param {Boolean} isPublic Determine if the user wants to have a public account (default private)
 * @param {string}  username    User username for Vibe
 * @param {string}  password    User password for Vibe
 */
var User = function (firstName, lastName, email, color, age, image, isPublic, username, password) {
	
	if (typeof(firstName) === 'string') {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.color = color;
		this.age = age;
		this.media = [];
		this.image = image;
		this.isPublic = isPublic || false;
		this.username = username;
		this.password = password;
	}
	else {
		for (var key in firstName) {
			this[key] = firstName[key];
		}
	}
};



/*----------------METHODS-------------------*/

/**
 * Adds a facebook method to the instance of the base user class
 * @param {object} facebook Information regarding the user's facebook account
 */
User.prototype.addFacebook = function (facebook) {
	this.media.push(facebook);
};

/**
 * Adds a twitter method to the instance of the base user class
 * @param {object} facebook Information regarding the user's twitter account
 */
User.prototype.addTwitter = function (twitter) {
	this.media.push(twitter);
};

/**
 * Adds a instagram method to the instance of the base user class
 * @param {object} facebook Information regarding the user's instagram account
 */
User.prototype.addInstagram = function (instagram) {
	this.media.push(instagram);
};




/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					MEDIA
++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*--------------CONSTRUCTOR-----------------*/

/**
 * Creates base class for each kind of social media
 * @param {string}  name     The kind of media
 * @param {string}  username     Username for this media
 * @param {string}  password      Password for this media
 * @param {Boolean} isPublic Determine if the user wants THIS MEDIA INSTANCE to be public (default private)
 */
var Media = function (name, username, password, isPublic) {
	this.name = name;
	this.username = username;
	this.password = password;
	this.isPublic = isPublic || false;
};


/*----------------METHODS-------------------*/

/**
 * Adds a facebook method to the instance of the base user class
 * @param {object} facebook Information regarding the user's facebook account
 */
var facebook = new Media('Facebook', 'h', 'd', false);


/**
 * Adds a twitter method to the instance of the base user class
 * @param {object} facebook Information regarding the user's twitter account
 */
var twitter = new Media ('Twitter');

/**
 * Adds a instagram method to the instance of the base user class
 * @param {object} facebook Information regarding the user's instagram account
 */
var instagram = new Media ('Instagram');





var usersArrayString = JSON.parse(localStorage.getItem('allData')) || [];

var allUsers = usersArrayString.map(function(objectLiteral) {
	return new User (objectLiteral);
});



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					NEW POSTS
++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


// var postToDOM = function (time, author) {
// 	var renderedPost = $('#template-post').clone();

// 	renderedPost.attr('id', '');
// 	renderedPost.find('.date').text(time);
// 	renderedPost.find('.post-author').text(author);
// 	renderedPost.removeClass('template');
// console.log("rendered", renderedPost);

// 	// savePosts();

// 	return (renderedPost);
// };

/*--------------CONSTRUCTOR-----------------*/

/**
 * Creates base class for each kind of social media
 * @param {String}  postTime     The time this post was created
 * @param {Object}  author    The user object that created this post
 * @param {Object}  content    The user actual content of the page
 * @param {Boolean}  facebook    Is this being sent to Facebook?
 * @param {Boolean}  twitter    Is this being sent to Twitter?
 * * @param {Boolean}  instagram    Is this being sent to Instagram?
 * * @param {Array}  tags    Array of random tags that can be used to identify the post and its contents
 * @param {Boolean} isPublic Determine if the user wants THIS MEDIA INSTANCE to be public (default private)
 */
var Post = function (postTime, id, author, content, facebook, twitter, instagram, tags, img, isPublic) {

	if (typeof(postTime) === 'string') {
		this.postTime = postTime;
		this.id = id;
		this.author = author;
		this.postAuthor = author.firstName + ' ' + author.lastName;
		this.content = content;
		this.color = author.color;
		this.reVibeTime = null;
		this.facebook = facebook;
		this.twitter = twitter;
		this.instagram = instagram;
		this.tags = tags;
		this.image = img || null;
		this.isPublic = isPublic || false;
	}

	else {
		for (var key in postTime) {
			this[key] = postTime[key];
		}
	}
};





var postsArrayString = JSON.parse(localStorage.getItem('allPosts')) || [];

var postsArray = postsArrayString.map(function(objectLiteral) {
	return new Post (objectLiteral);
});

