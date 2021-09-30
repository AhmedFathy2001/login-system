"use strict";
let h1 = document.querySelector('h1');
const logout = document.getElementById('logout');
const deleteBtn = document.getElementById('delete')
    //Checks if there's an existing session, if there is it'll redirect to the home page
let sessionUser = localStorage.getItem('sessionUser') || sessionStorage.getItem('sessionUser');
sessionUser == ('' || null) ? setTimeout(() => window.location.href = 'index.html', 1000) : h1.innerHTML = "Welcome " + sessionUser;
let users = JSON.parse(localStorage.getItem("users"))

function deleteAccount() {
    const user = users.find(u => u.username.toLowerCase() == sessionUser.toLowerCase())
    users.splice(users.indexOf(user), 1)
    localStorage.setItem('users', JSON.stringify(users));
    sessionUser = localStorage.getItem('sessionUser') ? localStorage.removeItem('sessionUser') : sessionStorage.removeItem('sessionUser');
    pass = localStorage.setItem('pass', 'Account successfully deleted.');
}
deleteBtn.addEventListener('click', () => {
        deleteAccount()
    })
    //Terminates all sessions on logout
logout.addEventListener('click', () => {
    sessionStorage.removeItem('sessionUser');
    localStorage.removeItem('sessionUser');
    pass = localStorage.setItem('pass', 'Log out successful.');
})