"use strict";
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const container = document.getElementById('container');
let users = JSON.parse(localStorage.getItem("users")) || [];
let sessionUser;


function isEmpty(value) {
    return !value;
}