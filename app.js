
$(document).on('ready', function() {
  
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
									LOGIN
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

$('.form-container-tall').hide();

/*-------------------------GLOBAL VARIABLES------------------------*/


	var allUsers = localStorage.getItem('allData') || [];



/*----------------------------FUNCTIONS----------------------------*/

	/**
	 * Checks local storage for a user and password and confirms a matach
	 * @param  {string} inputUsername username entered in the login section
	 * @param  {string} inputPassword password entered in the login section
	 * @return {HTML/DOM}               If correct, loads HTML, else prompts an error
	 */
	var confirmUser = function(inputUsername, inputPassword) {

		var failedLogin = $('.failed-login');

		var confirmedUser = _.find(allUsers, function () {
			return ((allUsers.userName === inputUsername) && (allUsers.password === inputPassword));
		});

		if (confirmedUser) {
			// LOAD THE HOME PAGE
		}

		else {
			failedLogin.show();
			('.login-form input').css('background-color', '#CAA');
		}
	};


/*----------------------------EVENTS----------------------------*/

/**
 * Checks user idendity and will login the user if correct
 * @param  {event} e default event
 * @return {Boolean}   Log-in OR Retry
 */
	$('#login').on('click', function (e) {
		e.preventDefault();

		var inputUsername = $('#login .input-username').val();
		var inputPassword = $('#login .input-password').val();
	
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
		$('.form-container-tall').show(200);
		
	});



	var makeNewUser = function (tempUser) {
			

			var newUser = new User(tempUser.firstName, tempUser.firstName, tempUser.email, tempUser.age, tempUser.img, tempUser.bool, tempUser.username, tempUser.password);

			createUser(newUser);
	};




	var checkCreateComplete = function (tempUser) {

		var userCreated = false;

			for (var key in tempUser) {
				if (tempUser.key === "") {
					userCreated = false;
				}
			}
	
			if (tempUser.email.split('').indexOf('@') < 0 || tempUser.password < 8) {
				userCreated = false;
				console.log("UserCreated", false);
			}

			else {
				userCreated = true;

				console.log("UserCreated", false);
			}
	};


	$('#create').on('click', function (e) {
		e.preventDefault();

		var inputFirstName = $('#login .input-firstname').val();
		var inputLastName = $('#login .input-lastname').val();
		var inputAge = $('#login .input-age').val();
		var inputEmail = $('#login .input-email').val();
		var inputUsername = $('#login .input-username').val();
		var inputPassword = $('#login .input-password').val();

		var tempUser = {
			firstName: inputFirstName,
			lastName: inputLastName,
			email: inputEmail,
			age: inputAge,
			img: img,
			bool: false,
			username: inputUsername,
			password: inputPassword
		};

		checkCreateComplete(tempUser);

		if (userCreated) {

			makeNewUser(tempUser);

			// DIRECT USER TO HOME PAGE
		}

		else {
			$('.failed-signup').toggleClass('.hidden');
		}

	});

}); // --> END JQUERY





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

var createUser = function (userObject) {
	allUsers.push(userObject);
};

