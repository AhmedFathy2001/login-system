const passwordConfirmation = document.getElementById('passwordConfirmation');
const loginBtn = document.getElementById('login');

function login() {
    try {
        user = users.find(u => u.email == email.value)
        if (!user) throw email
        if (user.password != password.value) throw password
        return true
    } catch (e) {
        e.classList.add('is-invalid');
    }
    // console.log(users.findindexOf(user));
}

loginBtn.addEventListener('click', () => {
    if (login()) {
        window.location.href = 'home_page.html'
    }
    isLogged()
})

function isLogged() {
    if (login()) {
        sessionUser = localStorage.setItem('sessionUser', users[index].username);
    }
}