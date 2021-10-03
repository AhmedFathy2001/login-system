"use strict";
const passwordVisibilityCf = document.getElementById('passwordVisibilityCf')
const resetBtn = document.getElementById('reset');
const invalidPassword = document.getElementById('invalid');
const changeBtn = document.getElementById('changePw');
const oldPassword = document.getElementById('oldPassword');
const oldPasswordVisibility = document.getElementById('oldPasswordVisibility');
const oldPasswordVisibilityLabel = document.getElementById('oldPasswordVisibilityLabel');
sessionUser = localStorage.getItem('sessionUser') || sessionStorage.getItem('sessionUser');

if (isEmpty(sessionUser)) window.location.href = 'home_page.html';


//Old password validation to check if it exists
function validate() {
    const currentUser = users.find(u => u.username.toLowerCase() == sessionUser.toLowerCase());
    let invalid = currentUser.password == oldPassword.value;
    if (!invalid) {
        container.classList.add('is-invalid');
        invalidPassword.innerText = 'Old password incorrect.'
    } else {
        if (invalid) {
            if (passwordCheck(password.value, passwordConfirmation.value)) {
                currentUser.password = password.value;
                currentUser.passwordConfirmation = passwordConfirmation.value
            } else { return false; }
            //Figure out how to get the current index the splice according to it (last step)
            users.splice(users.indexOf(currentUser), 1, currentUser)
            localStorage.setItem('users', JSON.stringify(users))
            pass = localStorage.setItem('pass', 'Password has been successfully changed!');
            //could change to profile.html later when exists
            window.location.href = 'home_page.html'
        }
    }
    return !invalid;
}


//Password confirmation
function passwordCheck(password, passwordConfirm) {
    let validator = password.length >= 8 ? true : false;
    if (!validator) {
        container.classList.add('is-invalid');
        invalidPassword.innerText = 'New password must be atleast 8 characters long'
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


//For password visiblity function
oldPasswordVisibility.addEventListener('change', () => {
    visibilityCheck(oldPasswordVisibility, oldPassword, oldPasswordVisibilityLabel)
});

passwordVisibilityCf.addEventListener('change', () => {
    visibilityCheck(passwordVisibilityCf, passwordConfirmation, passwordVisibilityLabelCf)
});

//redirects to homepage if reset was successful otherwise throws an error
changeBtn.addEventListener('click', () => {
    !validate()
})

let elementsArray = [oldPassword, password, passwordConfirmation]
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
            changePw.focus();
            changePw.click();
        }
    })
);