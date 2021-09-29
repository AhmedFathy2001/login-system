const passwordVisibilityCf = document.getElementById('passwordVisibilityCf')
const resetBtn = document.getElementById('reset');
const invalidPassword = document.getElementById('invalid');
passwordVisibilityCf.addEventListener('change', () => {
    visibilityCheck(passwordVisibilityCf, passwordConfirmation, passwordVisibilityLabelCf)
});
//Email validation to check if it exists
function validate() {
    const invalid = users.find(u => u.email == email.value);
    !invalid == true ? email.classList.add('is-invalid') : email.classList.remove('is-invalid');
    if (invalid) {
        passwordCheck(password.value, passwordConfirmation.value) ? (invalid.password = password.value, invalid.passwordConfirmation = passwordConfirmation.value) : false;
        //Figure out how to get the current index the splice according to it (last step)
        users.splice(users.indexOf(invalid), 1, invalid)
        localStorage.setItem('users', JSON.stringify(users))
    }
    return !invalid;
}

//Password confirmation
function passwordCheck(password, passwordConfirm) {
    let validator = password.length >= 8 ? true : false;
    if (!validator) {
        container.classList.add('is-invalid');
        invalidPassword.innerText = 'Password must be atleast 8 characters long'
        return false;
    } else if (password != passwordConfirm) {
        container.classList.add('is-invalid');
        invalidPassword.innerText = 'Passwords don\'t match'
        return false;
    } else {
        container.classList.remove('is-invalid');
        return true;
    }
}

resetBtn.addEventListener('click', () => {
    !validate()
    container.classList.add('is-valid');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 5000)

})