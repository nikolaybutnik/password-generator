// Get a reference to the "Generate Password" button element
let generateBtn = document.getElementById("generate");
// Add a "click" event listener to the button that will display a new password
generateBtn.addEventListener("click", displayNewPassword);

/**
 * This `click` event handler function will generate a new password
 * and then display it as the value for the `#password` element
 * @returns {void} Nothing
 */

// Define a function that will output the password and push it to the screen.
function displayNewPassword() {
  // criteria is an array of user selections.
  let criteria = getCriteria();
  // password is a result of a function that takes criteria array as an argument and processes it to return a string of scrambled characters.
  let password = generatePassword(criteria);
  // passwordText is a reference to the HTML that displays the generated password to the user.
  let passwordText = document.getElementById("password");
  // Update the passwordText once the string has been generated.
  passwordText.value = password;
}

// Define a function that asks the user for password generation criteria, and logs the answers as an array.
// Ask for how long the password should be and assign the answer to a variable.
function getCriteria() {
  var howLong = prompt(
    "How long should your password be? Must be between 8 and 128 characters long."
  );
  // Break out of the code if user clicks cancel.
  if (howLong === null) {
    return;
  }
  // Continually ask user for input until the response meeets 8 to 128 character length criteria.
  // Make sure value entered is an integer. Multiply howLong by 1 to make sure value being checked is a number and not a string.
  while (
    howLong < 8 ||
    howLong > 128 ||
    Number.isInteger(howLong * 1) === false
  ) {
    var howLong = prompt(
      "Your password must be between 8 and 128 characters long and use whole numbers."
    );
    // Break out of the loop if user clicks cancel.
    if (howLong === null) {
      return;
    }
  }
  let lowercaseYesNo = confirm(
    "Include lowercase letters? Ok = Yes, Cancel = No"
  );
  let uppercaseYesNo = confirm(
    "Include uppercase letters? Ok = Yes, Cancel = No"
  );
  let numbersYesNo = confirm("Include numbers? Ok = Yes, Cancel = No");
  let specialYesNo = confirm(
    "Include special characters? Ok = Yes, Cancel = No"
  );

  // Create an empty array and append it with user selections.
  userCriteria = [];
  if (lowercaseYesNo === true) {
    userCriteria.push("lowercase");
  }
  if (uppercaseYesNo === true) {
    userCriteria.push("uppercase");
  }
  if (numbersYesNo === true) {
    userCriteria.push("numbers");
  }
  if (specialYesNo === true) {
    userCriteria.push("special");
  }
  userCriteria.push(howLong);
  // make sure the user enters at least one criteria. If the array only has the howLong value (always present), alert the user.
  // Else, return the userCriteria as a product of the getCriteria function to be used in displayNewPassword function.
  if (userCriteria.length === 1) {
    alert(
      "You need to select a criteria for password generation. Generate password again and select criteria."
    );
  } else {
    return userCriteria;
  }
}

// Define a function that will take an array that was generated by getCriteria() and assigned to a variable,
// and generate a randomized passwords based on the contents of the array.
function generatePassword(criteria) {
  // Define variables that store all the possible characters to be used in password generation.
  let specialCharacters = [
    "!",
    "#",
    "$",
    "%",
    "&",
    "(",
    ")",
    "*",
    "+",
    "-",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "[",
    "\\",
    "]",
    "^",
    "_",
    "{",
    "|",
    "}",
    "~",
  ];
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let lowercaseLetters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let uppercaseLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  // Define a new array to be used for the final password generation.
  let concatArray = [];
  // Check the user's criteria responses, and concatenate the empty array with the relevant character arrays.
  // Use the spread operator (...) to spread out the items in each individual array into different arguments
  // and push them to the new array.
  if (criteria.includes("lowercase") === true) {
    concatArray.push(...lowercaseLetters);
  }
  if (criteria.includes("uppercase") === true) {
    concatArray.push(...uppercaseLetters);
  }
  if (criteria.includes("special") === true) {
    concatArray.push(...specialCharacters);
  }
  if (criteria.includes("numbers") === true) {
    concatArray.push(...numbers);
  }
  // Use a for loop to create a new array based on the resulted array. Scramble the order of characters
  // by calling a random number, and using the number as index to append item at index to new list.
  // For length, use the user defined value that has been appended to the end of the criteria array.
  randArray = [];
  for (i = 0; i < criteria[criteria.length - 1]; i++) {
    let randInt = Math.floor(Math.random() * concatArray.length);
    randArray.push(concatArray[randInt]);
  }
  // Convert the array into a string, and get rid of all commas in the string.
  // Return the completed string as a product of the generatePassword function to be used in displayNewPassword function.
  return randArray.toString().replace(/,/g, "");
}
