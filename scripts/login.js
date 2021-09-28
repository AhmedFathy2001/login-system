const passwordConfirmation = document.getElementById('passwordConfirmation');
const loginBtn = document.getElementById('login');
const invalid = document.getElementById('invalid')
if (!isEmpty(localStorage.getItem('sessionUser'))) setTimeout(() => window.location.href = 'home_page.html', 1000);

function login() {
    if (isEmpty(email.value) || isEmpty(password.value)) {
        invalid.innerHTML = 'All fields are required!'
        container.classList.add('is-invalid');
        return false;
    } else {
        container.classList.remove('is-invalid')
        try {
            const user = users.find(u => u.email == email.value)
            if (!user) throw email
            if (user.password != password.value) throw password
            localStorage.setItem('sessionUser', user.username)
            setTimeout(() => window.location.href = 'home_page.html', 1000)
        } catch (e) {
            container.classList.add('is-invalid');
            e == email ? invalid.innerHTML = 'Email doesn\'t exist' : invalid.innerHTML = 'Incorrect password'
        }
    }
}

loginBtn.addEventListener('click', login);