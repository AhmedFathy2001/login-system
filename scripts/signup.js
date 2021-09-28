const passwordConfirmation = document.getElementById('passwordConfirmation');
const registerBtn = document.getElementById('register');
const passwordContainer = document.getElementById('passwordContainer');
let userRegister;

// Registration class
class User {
    constructor(username, email, password, passwordConfirmation) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;

    }
}

//creates a new user and adds it to the local storage
function allUsers() {
    userRegister = new User(username.value, email.value, password.value, passwordConfirmation.value);
    users.push(userRegister);
    localStorage.setItem('users', JSON.stringify(users));
}
//Checks if any of the inputs is empty
function isEmptyy() {
    if (isEmpty(username.value) || isEmpty(email.value) || isEmpty(password.value) || isEmpty(passwordConfirmation.value)) {
        container.classList.add('is-invalid')
        return false;
    }
    container.classList.remove('is-invalid')
    return true;
}
//Validation for username and email if any already exists.
function validate(item, type) {
    let invalid = users.some(u => u[type] == item);
    type == 'username' && invalid == true ? this.username.classList.add('is-invalid') : this.username.classList.remove('is-invalid');
    type == 'email' && invalid == true ? this.email.classList.add('is-invalid') : this.email.classList.remove('is-invalid');
    return !invalid
}
//Password confirmation
function passwordCheck(password, passwordConfirm) {
    let validator = password.length >= 8 ? true : false;
    if (!validator) {
        this.passwordContainer.classList.add('is-invalid');
        return false;
    } else if (password != passwordConfirm) {
        this.password.classList.add('is-invalid');
        this.passwordConfirmation.classList.add('is-invalid');
        return false;
    } else {
        this.password.classList.remove('is-invalid');
        this.passwordConfirmation.classList.remove('is-invalid');
        this.passwordContainer.classList.remove('is-invalid');
        return true;
    }
}

//registraition validation
function registration() {
    if (isEmptyy()) {
        if (validate(username.value, 'username') && validate(email.value, 'email') && passwordCheck(password.value, passwordConfirmation.value)) {
            allUsers()
            setTimeout(() => window.location.href = 'index.html', 1000);
        }
    } else {
        return;
    }
}

// Registration button
registerBtn.addEventListener('click', registration);