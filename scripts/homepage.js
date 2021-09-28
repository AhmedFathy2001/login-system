"use strict";
let h1 = document.querySelector('h1');
let sessionUser = localStorage.getItem('sessionUser');
sessionUser == ('' || null) ? setTimeout(() => window.location.href = 'index.html', 1000) : h1.innerHTML = "Welcome " + sessionUser;
const logout = document.getElementById('logout');

logout.addEventListener('click', () => {
    localStorage.setItem('sessionUser', '');
})