"use strict";
const passwordVisibilityCf = document.getElementById('passwordVisibilityCf')
const resetBtn = document.getElementById('reset');
const invalidPassword = document.getElementById('invalid');


//Email validation to check if it exists
function validate() {
    const invalid = users.find(u => u.email.toLowerCase() == email.value.toLowerCase());
    !invalid == true ? email.classList.add('is-invalid') : email.classList.remove('is-invalid');
    if (invalid) {
        if (passwordCheck(password.value, passwordConfirmation.value)) {
            invalid.password = password.value;
            invalid.passwordConfirmation = passwordConfirmation.value
        } else { return false; }
        //Figure out how to get the current index the splice according to it (last step)
        users.splice(users.indexOf(invalid), 1, invalid)
        localStorage.setItem('users', JSON.stringify(users))
        pass = localStorage.setItem('pass', 'Password has been successfully reset!');
        window.location.href = 'index.html'
    }
    return !invalid;
}

function placeholderFix(input) {
    const span = document.querySelector(`#${input.id} ~ .span-animation-selector`);
    if (input.value == '' || input.value == null) {
        span.classList.remove('span-animation');
    } else {
        span.classList.add('span-animation');
    }
}
[email, password, passwordConfirmation].forEach(element => {
    element.addEventListener('keyup', () => {
        placeholderFix(element);
    });
});

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




//redirects to homepage if reset was successful otherwise throws an error
resetBtn.addEventListener('click', () => {
    !validate()
})

//For password visiblity function
passwordVisibilityCf.addEventListener('change', () => {
    visibilityCheck(passwordVisibilityCf, passwordConfirmation, passwordVisibilityLabelCf)
});

let elementsArray = [email, password, passwordConfirmation]
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
            resetBtn.focus();
            resetBtn.click();
        }
    })
);