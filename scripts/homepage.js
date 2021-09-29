"use strict";
let h1 = document.querySelector('h1');
const logout = document.getElementById('logout');

//Checks if there's an existing session, if there is it'll redirect to the home page
let sessionUser = localStorage.getItem('sessionUser') || sessionStorage.getItem('sessionUser');
sessionUser == ('' || null) ? setTimeout(() => window.location.href = 'index.html', 1000) : h1.innerHTML = "Welcome " + sessionUser;


//Terminates all sessions on logout
logout.addEventListener('click', () => {
    sessionStorage.removeItem('sessionUser');
    localStorage.removeItem('sessionUser')
})