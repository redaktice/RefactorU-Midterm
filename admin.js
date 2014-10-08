
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
var User = function (firstName, lastName, email, age, image, isPublic, username, password) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.age = age;
	this.media = [];
	this.image = image;
	this.isPublic = isPublic || false;
	this.username = username;
	this.password = password;
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




/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					NEW POSTS
++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*--------------CONSTRUCTOR-----------------*/

/**
 * Creates base class for each kind of social media
 * @param {string}  postTime     The time this post was created
 * @param {Boolean}  username    Is this being sent to Facebook?
 * @param {Boolean}  twitter    Is this being sent to Twitter?
 * * @param {Boolean}  instagram    Is this being sent to Instagram?
 * * @param {Array}  tags    Array of random tags that can be used to identify the post and its contents
 * @param {Boolean} isPublic Determine if the user wants THIS MEDIA INSTANCE to be public (default private)
 */
var NewPost = function (postTime, facebook, twitter, instagram, tags, isPublic) {
	this.postTime = postTime;
	this.facebook = facebook;
	this.twitter = twitter;
	this.instagram = instagram;
	this.tags = tags;
	this.isPublic = isPublic || false;
};


/*----------------METHODS-------------------*/
