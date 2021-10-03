const passwordConfirmation = document.getElementById('passwordConfirmation');
const registerBtn = document.getElementById('register');
const passwordContainer = document.getElementById('passwordContainer');
const invalidPassword = document.getElementById('invalidPasswordCf')
const empty = document.getElementById('empty')
const passwordVisibilityCf = document.getElementById('passwordVisibilityCf')
const passwordVisibilityLabelCf = document.getElementById('passwordVisibilityLabelCf')
const emailFeedback = document.getElementById('emailFeedback');
let userRegister;

//Checks if theres a current active session, if exists, User will be redirected to the home page
if (!isEmpty(localStorage.getItem('sessionUser')) || !isEmpty(sessionStorage.getItem('sessionUser'))) window.location.href = 'home_page.html';

function placeholderFix(input) {
    const span = document.querySelector(`#${input.id} ~ .span-animation-selector`);
    if (input.value == '' || input.value == null) {
        span.classList.remove('span-animation');
    } else {
        span.classList.add('span-animation');
    }
}
[username, email, password, passwordConfirmation].forEach(element => {
    element.addEventListener('keyup', () => {
        placeholderFix(element);
    });
});

// Registration class
class User {
    constructor(username, email, password, passwordConfirmation) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;

    }
}

//Creates a new user and adds it to the local storage
function allUsers() {
    userRegister = new User(username.value, email.value, password.value, passwordConfirmation.value);
    users.push(userRegister);
    localStorage.setItem('users', JSON.stringify(users));
}

//Checks if any of the inputs is empty
function isEmptyy() {
    if (isEmpty(username.value) || isEmpty(email.value) || isEmpty(password.value) || isEmpty(passwordConfirmation.value)) {
        container.classList.add('is-invalid')
        empty.innerText = 'All fields are Required!'

        return false;
    }
    container.classList.remove('is-invalid')
    return true;
}

//Validation for username and email if any already exists.
function validate(item, type) {
    let isInvalid = users.some(u => u[type].toLowerCase() == item.toLowerCase());
    switch (type) {
        case 'username':
            isInvalid ? this.username.classList.add('is-invalid') : this.username.classList.remove('is-invalid');
            break;
        case "email":
            if (!isInvalid) {
                if (emailValidation(email.value)) this.email.classList.remove('is-invalid');
            } else {
                this.email.classList.add('is-invalid');
                this.emailFeedback.innerText = 'This email is taken, please enter another email.';
            }
            break;
    }
    return !isInvalid;
}

//Email validation
let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function emailValidation(email) {
    if (emailRegex.test(email)) {
        this.email.classList.remove('is-invalid');
        return true;
    } else {
        this.emailFeedback.innerText = 'Please enter a valid email'
        this.email.classList.add('is-invalid');
        return false;
    }
}
//Password confirmation
function passwordCheck(password, passwordConfirm) {
    let validator = password.length >= 8 ? true : false;
    if (!validator) {
        this.passwordContainer.classList.add('is-invalid');
        invalidPassword.innerText = 'Password must be atleast 8 characters long'
        return false;
    } else if (password != passwordConfirm) {
        this.passwordContainer.classList.add('is-invalid');
        invalidPassword.innerText = 'Passwords don\'t match'
        return false;
    } else {
        this.passwordContainer.classList.remove('is-invalid');
        return true;
    }
}

//registraition validation
function registration() {
    if (isEmptyy()) {
        let x = validate(username.value, 'username');
        let z = validate(email.value, 'email');
        let b = passwordCheck(password.value, passwordConfirmation.value);
        if (x && z && b) {
            if (validate(username.value, 'username') && emailValidation(email.value) && validate(email.value, 'email') && passwordCheck(password.value, passwordConfirmation.value)) {
                allUsers()
                pass = localStorage.setItem('pass', 'Registration complete, login now!');
                setTimeout(() => window.location.href = 'index.html', 1000);
            }
        } else {
            return;
        }
    }
}

passwordVisibilityCf.addEventListener('change', () => {
    visibilityCheck(passwordVisibilityCf, passwordConfirmation, passwordVisibilityLabelCf)
});

// Registration button
registerBtn.addEventListener('click', registration);

//Event listeners to listen to the Enter key to go to the next action
let elementsArray = [username, email, password, passwordConfirmation]
for (let i = 0; i < elementsArray.length - 1; i++) {
    elementsArray[i].addEventListener('keyup', e => {
        e.stopPropagation()
        if (e.code == 'Enter') {
            elementsArray[i + 1].focus();
        }
    });
}
[window, passwordConfirmation].forEach(element =>
    element.addEventListener('keyup', e => {
        e.stopPropagation()
        if (e.code == 'Enter') {
            registerBtn.focus();
            registerBtn.click();
        }
    })
);