

$(document).on('ready', function() {

	$('#sign-in .input-username').focus();



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
									LOGIN
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



/*-------------------------GLOBAL VARIABLES------------------------*/


var defaultImage = "./attachments/IMG_2440.JPG"; //'http://placehold.it/150x150';




/*----------------------------FUNCTIONS----------------------------*/



var createUser = function (userObject) {
	allUsers.push(userObject);
};

// 
	/**
	 * Checks local storage for a user and password and confirms a matach
	 * @param  {string} inputUsername username entered in the login section
	 * @param  {string} inputPassword password entered in the login section
	 * @return {HTML/DOM}               If correct, loads HTML, else prompts an error
	 */
	var confirmUser = function(inputUsername, inputPassword) {
		var failedLogin = $('.failed-login');

		var confirmedUser = _.find(allUsers, function (userObject) {

console.log("User found");
console.log(userObject.username,  inputUsername);
			return ((userObject.username === inputUsername) && (userObject.password === inputPassword));
		});

console.log("confirmedUser", confirmedUser);

		if (confirmedUser) {
			window.location.href='file:///Users/student/projects/week5/midterm-project/index.html?userId=' + allUsers.indexOf(confirmedUser);

		}

		else {
			failedLogin.show();
			$('#sign-in input').css('background-color', '#CAA');
		}
	};



	/**
	 * Creates an instance of User
	 * @param  {Object} tempUser object created during sign-up
	 * @return {Object}          new instance of User saved into the allUsers array
	 */
	var makeNewUser = function (tempUser) {
		var newUser = new User(tempUser.firstName, tempUser.lastName, tempUser.email, tempUser.color, tempUser.age, tempUser.img, tempUser.bool, tempUser.username, tempUser.password);
		createUser(newUser);	
		saveUsers();
								console.log("New User", newUser);
	};



	/**
	 * Check if the new user has completed the sign-up form
	 * @param  {Object} tempUser [tempUser object created during sign-up]
	 * @return {Boolean}          [Returns a check of the completed form and throws an error if incomplete]
	 */
	var checkCreateComplete = function (tempUser) {
		if (tempUser.password.length < 8) {
			$('.failed-signup').removeClass('absent');
				return false;
		}
		else {
			return true;
		}
	};


/*----------------------------EVENTS----------------------------*/

/**
 * Checks user idendity and will login the user if correct
 * @param  {event} e default event
 * @return {Boolean}   Log-in OR Retry
 */
	$('#sign-in').on('submit', function (e) {
		e.preventDefault();
		var inputUsername = $('#sign-in .input-username').val();
		var inputPassword = $('#sign-in .input-password').val();
	
		confirmUser(inputUsername, inputPassword);
	});

	/**
	 * [Directs the user to create a new account]
	 * @param  {[type]} e default event
	 * @return {[DOM]}   [Shows new centered form to create a new account]
	 */
	$('#sign-up').on('click', function (e) {
		e.preventDefault();
		$('.form-container-avg').hide(200);
		$('#new-user').show(200);
		$('#new-user .input-firstname').focus();
	});


	/**
	 * Submits the sign-up form and runs check for completed form
	 * @param  {Event} e default event
	 * @return {Window}   Takes user to the home page upon completed form
	 */
	$('.form-wide').on('submit', function (e) {
		e.preventDefault();

		var inputFirstName = $('#new-user .input-firstname').val();
		var inputLastName = $('#new-user .input-lastname').val();
		var inputAge = $('#new-user .input-age').val();
		var inputEmail = $('#new-user .input-email').val();
		var inputUsername = $('#new-user .input-username').val();
		var inputPassword = $('#new-user .input-password').val();


		// Create a temporary object to store information for checks
		var tempUser = {
			firstName: inputFirstName,
			lastName: inputLastName,
			email: inputEmail,
			color: 'red',
			age: inputAge,

			img: defaultImage,
			bool: false,
			username: inputUsername,
			password: inputPassword
		};


		// Navigate to home page upon completion
		if (checkCreateComplete(tempUser)) {
			makeNewUser(tempUser);
			window.location.href='file:///Users/student/projects/week5/midterm-project/index.html?userId=' + (allUsers.length-1);
console.log("Successfully created new user");
		}

	});



}); // --> END JQUERY





