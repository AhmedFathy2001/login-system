const passwordConfirmation = document.getElementById('passwordConfirmation');
const registerBtn = document.getElementById('register')

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
    if (isEmpty(username.value) || isEmpty(email.value) || isEmpty(password.value) || isEmpty(passwordConfirmation.value)) {
        return false
    }
    users.push(userRegister);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}
//Validation for username and email if any already exists.
function validate(item, type) {
    let invalid = users.some(u => u[type] == item);
    if (type == 'username' && invalid) {
        this.username.classList.add('is-invalid')
    } else if (type == 'email' && invalid) {
        this.email.classList.add('is-invalid')
    }
    return !invalid
}
//Password confirmation
function passwordCheck(password, passwordConfirm) {
    let validator = this.password.length > 8 ? true : false;
    if (validator) {
        this.password.innerHTML = 'Passwords less than 8 characters are easy to guess, maybe try a longer one?'
    } else if (password != passwordConfirm) {
        this.password.classList.add('is-invalid');
        this.passwordConfirmation.classList.add('is-invalid');
        return false;
    } else {
        this.password.classList.remove('is-invalid');
        this.passwordConfirmation.classList.remove('is-invalid');
        return true;
    }
}

//registraition validation
function registration() {
    if (validate(username.value, 'username') && validate(email.value, 'email') && passwordCheck(password.value, passwordConfirmation.value)) {
        if (!allUsers()) return;
        setTimeout(() => window.location.href = 'index.html', 1000);
    } else {
        return;
    }
}

// Registration button
registerBtn.addEventListener('click', registration);