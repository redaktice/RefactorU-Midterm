
/**
 * Bio constructor for all User instances
 * @param {String} firstName User first name
 * @param {String} lastName  User last name
 * @param {String} age       User age
 * @param {Image} picture   User image
 * @param {String} email     User email
 */
var Bio = function(firstName, lastName, age, picture, email) {
	name = {
		first: firstName,
		last: lastName
	};
	picture = picture;
	age = age;
	email = email;
};



var User = function(bio, color) {
	profile =  bio; // Bio object from Bio class
	color = color;
	post = kdjf; // Post method
};