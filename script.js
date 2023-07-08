/*

Validation required:
1. All fields are mandatory
2. Email must be in the correct format
3. Password should be:
  3.a. At least 8 characters, and must contain;
  3.b. 1 lowercase
  3.c. 1 uppercase
  3.d. 1 number, and;
  3.e. 1 special character
4. Confirm Password must be the same as the Password

*/

// Define DOM Variables
let firstName = document.querySelector("#firstname");
let lastName = document.querySelector("#lastname");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirmPassword");
let signUp = document.querySelector("#signup");
let register = document.querySelector("#register");

const inputFields = [firstName, lastName, email, password, confirmPassword];

let registrationArr = [];

let registrationObj = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

let okToSave = [];

// Clear the error class and styling added by the validations
inputFields.forEach((field) => {
  field.addEventListener("focus", () => {
    let formField = field.parentElement;
    let errMsg = formField.querySelector("small");

    formField.classList.remove("error");
    errMsg.textContent = "";
  });
});

// Attach Event Listeners to the Form using addEventListener()
register.addEventListener("submit", (event) => {
  // Prevents the form from actually submitting to a server,
  // since we do not have a server setup yet
  event.preventDefault();

  // Utility / Helper Functions
  // Create a function that shows correct error messages
  // for each required field
  validateInputs(inputFields);

  // console.log(okToSave.includes(false));

  if (registrationObj && !okToSave.includes(false)) {
    registrationObj.id = Date.now();

    // console.log(registrationObj);

    registrationArr.push(registrationObj);

    // Save to localStorage using setItem()
    localStorage.setItem("userList", JSON.stringify(registrationArr));
  }

  let sampleVar = localStorage.getItem("userList");

  console.log(JSON.parse(sampleVar));

  okToSave = [];
  registrationObj = {};
});

const validateInputs = ([
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
]) => {
  // First Name - empty
  if (firstName.value === "") {
    errorNotification(firstName, "First Name should not be empty");
    okToSave.push(false);
  } else {
    firstName.value.trim();
    registrationObj.firstName = firstName.value;
    okToSave.push(true);
  }

  // Last Name - empty
  if (lastName.value === "") {
    errorNotification(lastName, "Last Name should not be empty");
    okToSave.push(false);
  } else {
    lastName.value.trim();
    registrationObj.lastName = lastName.value;
    okToSave.push(true);
  }

  // Email - empty
  if (email.value === "") {
    errorNotification(email, "Email should not be empty");
    okToSave.push(false);
  } else {
    email.value.trim();
    registrationObj.email = email.value;
    okToSave.push(true);
  }

  // Should not begin with a digit          -  ^(?=.*\d)
  // Any single or more occurrences of      -  ?=.*
  //   lowercase                            -  [a-z]
  //   uppercase                            -  [A-Z]
  //   a-z, A-Z, and 0-9                    -  [^a-zA-Z0-9]
  // Not followed by a whitespace character -  (?!.*\s)
  // Sequence of 8 to 20 characters         -  {8,20}
  let regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;

  if (password.value === "") {
    // Password - empty
    errorNotification(password, "Password should not be empty");
    okToSave.push(false);
  } else if (password.value.length < 8) {
    // Password - less than 8 characters
    errorNotification(
      password,
      "Password should be at least 8 characters long"
    );
    okToSave.push(false);
  } else if (!password.value.match(regex)) {
    // Password - not containing at least
    //   1 lowercase, 1 uppercase, 1 number, and 1 special character
    errorNotification(
      password,
      "Password must contain 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character"
    );
    okToSave.push(false);
  } else {
    password.value.trim();
    registrationObj.password = password.value;
    okToSave.push(true);
  }

  if (confirmPassword.value != password.value) {
    // Confirm Password - not matching with Password
    errorNotification(
      confirmPassword,
      "Confirm Password should match with Password"
    );
    okToSave.push(false);
  } else {
    confirmPassword.value.trim();
    registrationObj.confirmPassword = confirmPassword.value;
    okToSave.push(true);
  }
};

const errorNotification = (field, message) => {
  // Reference the <div> containing the input field
  let formField = field.parentElement;
  // Reference the <small> tag inside the <div>
  let error = formField.querySelector("small");

  formField.classList.add("error");
  error.textContent = message;

  okToSave.push(false);
};
