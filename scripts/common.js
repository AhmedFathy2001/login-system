//Common Javascript document between login.js and signup.js
"use strict";
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const container = document.getElementById('container');
const passwordVisibility = document.getElementById('passwordVisibility')
const passwordVisibilityLabel = document.getElementById('passwordVisibilityLabel')
let pass;
let sessionUser;


//Parses the array of users from local storage if exists, else generates a new empty array
let users = JSON.parse(localStorage.getItem("users")) || [];

//Changes password visibility
function visibilityCheck(checkBoxName, inputName, checkBoxLabel) {
    if (checkBoxName.checked) {
        inputName.type = "text";
        checkBoxLabel.innerHTML = '<i class="far fa-eye-slash"></i>';
    } else {
        inputName.type = "password";
        checkBoxLabel.innerHTML = '<i class="far fa-eye"></i>';
    }
}

passwordVisibility.addEventListener('change', () => {
    visibilityCheck(passwordVisibility, password, passwordVisibilityLabel)
});

//Checks if a value is empty
function isEmpty(value) {
    return !value;
}