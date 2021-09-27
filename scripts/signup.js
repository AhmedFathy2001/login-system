const passwordConfirmation = document.getElementById('passwordConfirmation');
const registerBtn = document.getElementById('register')
let userRegister;


// Registration class
class UserRegisteration {
    constructor(username, email, password, passwordConfirmation) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
    }
}

function setInStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}
//Adds new user to the local storage
function allUsers() {
    userRegister = new UserRegisteration(username.value, email.value, password.value, passwordConfirmation.value);
    users.push(userRegister);
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
    if (password != passwordConfirm) {
        this.password.classList.add('is-invalid');
        this.passwordConfirmation.classList.add('is-invalid');
        return false;
    } else {
        this.password.classList.remove('is-invalid');
        this.passwordConfirmation.classList.remove('is-invalid');
        return true;
    }

}

// Registration button
registerBtn.addEventListener('click', () => {
    if (validate(username.value, 'username') && validate(email.value, 'email') && passwordCheck(password.value, passwordConfirmation.value)) {
        allUsers();
        setInStorage();
        setTimeout(() => window.location.href = 'index.html', 1000)

    } else {
        return;
    }
});