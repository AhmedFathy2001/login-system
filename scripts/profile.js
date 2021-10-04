"use strict";
let h1 = document.querySelector('h1');
const logout = document.getElementById('logout');
const deleteBtn = document.getElementById('delete')
const modalBody = document.getElementById('modalBody');
const modalHeader = document.getElementById('modalHeader');
const dismissBtn = document.getElementById('dismissBtn');
let pass = localStorage.getItem('pass');
//Checks if there's an existing session, if there is it'll redirect to the home page
let sessionUser = localStorage.getItem('sessionUser') || sessionStorage.getItem('sessionUser');
sessionUser == ('' || null) ? setTimeout(() => window.location.href = 'index.html', 1000) : h1.innerHTML = "Welcome " + truncate(sessionUser);
let users = JSON.parse(localStorage.getItem("users"))


if (pass == 'Password has been successfully changed!') {
    modalAdjust('Dismiss', pass, 'Ok', 'none')
    triggerEvent(modal, 'click');
    localStorage.removeItem('pass')
}

[window, dismissBtn].forEach(element => {
    element.addEventListener('click', () => {
        setTimeout(() => modalAdjust('Delete account?', 'Are you sure you want to delete your account? deleting your account will erase all the data attached to it and it will not be retrieved.', 'Keep my Account', 'inline'), 1000)

    })
})

//cuts the string at the length of 12 (prevents long usernames from overflowing)
function truncate(input) {
    if (input.length > 12) {
        return input.substring(0, 12) + '...';
    }
    return input;
};

function modalAdjust(header, text, dismissText, styling) {
    modalHeader.innerText = `${header}`;
    modalBody.innerText = `${text}`;
    dismissBtn.innerText = `${dismissText}`;
    deleteBtn.style.display = `${styling}`;
    localStorage.removeItem('pass')
}

function triggerEvent(el, evName) {
    el.dispatchEvent(new CustomEvent(evName, {}));
}

//Account deleting function
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