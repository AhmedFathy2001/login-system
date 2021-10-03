"use strict";
const passwordConfirmation = document.getElementById('passwordConfirmation');
const loginBtn = document.getElementById('login');
const invalid = document.getElementById('invalid');
const rememberMeBtn = document.getElementById('remember');
pass = localStorage.getItem('pass');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody')

//Checks if theres a current active session, if exists, User will be redirected to the home page
if (!isEmpty(localStorage.getItem('sessionUser')) || !isEmpty(sessionStorage.getItem('sessionUser'))) window.location.href = 'home_page.html';

//Input animation fix
function placeholderFix(input) {
    const span = document.querySelector(`#${input.id} ~ .span-animation-selector`);
    if (input.value == '' || input.value == null) {
        span.classList.remove('span-animation');
    } else {
        span.classList.add('span-animation');
    }
}

email.addEventListener('keyup', () => {
    placeholderFix(email);
});
password.addEventListener('keyup', () => {
    placeholderFix(password);
});

//checks the pass from local storage (which page did the user come from) to edit the displayed modal
if (pass == 'Password has been successfully reset!') {
    modalAdjust(pass)
} else if (pass == 'Registration complete, login now!') {
    modalAdjust(pass)
} else if (pass == 'Account successfully deleted.') {
    modalAdjust(pass)
} else if (pass == 'Log out successful.') {
    modalAdjust(pass)
}

function modalAdjust(text) {
    triggerEvent(modal, 'click');
    modalBody.innerText = `${text}`;
    localStorage.removeItem('pass')
}

function triggerEvent(el, evName) {
    el.dispatchEvent(new CustomEvent(evName, {}));
}

//Login Function checks if the email and password match and exist in the local storage, else throws an error
function login() {
    if (isEmpty(email.value) || isEmpty(password.value)) {
        invalid.innerHTML = '<span>All fields are required!</span>'
        container.classList.add('is-invalid');
        return false;
    } else {
        container.classList.remove('is-invalid')
        try {
            const user = users.find(u => u.email.toLowerCase() == email.value.toLowerCase())
            if (!user) throw email
            if (user.password != password.value) throw password
            rememberMeBtn.checked ? localStorage.setItem('sessionUser', user.username) : sessionStorage.setItem('sessionUser', user.username)
            setTimeout(() => window.location.href = 'home_page.html', 1000)
        } catch (e) {
            container.classList.add('is-invalid');
            e == email ? invalid.innerHTML = '<span>Email doesn\'t exist</span>' : invalid.innerHTML = '<span>Incorrect password</span>'
        }
    }
}

loginBtn.addEventListener('click', login);

//Event listeners to listen to the Enter key to go to the next action
email.addEventListener('keyup', e => {
    e.stopPropagation()
    if (e.code == 'Enter') {
        password.focus();
    }
});
[window, password].forEach(element =>
    element.addEventListener('keyup', e => {
        e.stopPropagation()
        if (e.code == 'Enter') {
            loginBtn.focus();
            loginBtn.click();
        }
    })
);