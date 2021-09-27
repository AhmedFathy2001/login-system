"use strict";
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
let users = JSON.parse(localStorage.getItem("users")) || [];
let sessionUser;