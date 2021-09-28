const passwordConfirmation = document.getElementById('passwordConfirmation');
const loginBtn = document.getElementById('login');
const invalid = document.getElementById('invalid');
const rememberMeBtn = document.getElementById('remember');
if (!isEmpty(localStorage.getItem('sessionUser')) || !isEmpty(sessionStorage.getItem('sessionUser'))) setTimeout(() => window.location.href = 'home_page.html', 1000);

function login() {
    if (isEmpty(email.value) || isEmpty(password.value)) {
        invalid.innerHTML = '<span>All fields are required!</span>'
        container.classList.add('is-invalid');
        return false;
    } else {
        container.classList.remove('is-invalid')
        try {
            const user = users.find(u => u.email == email.value)
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