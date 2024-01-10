// login.js
function toggleLoginModal() {
    var modal = document.getElementById('loginModal');
    modal.classList.toggle('is-active');
}

function updateNavbarForLoggedInUser() {
    var navbarButtons = document.querySelector('.navbar-item .buttons');
    navbarButtons.innerHTML = `
        <a class="button" id="logoutButton" onclick="logoutUser()">Log Out</a>
    `;
}

function updateNavbarForLoggedOutUser() {
    var navbarButtons = document.querySelector('.navbar-item .buttons');
    navbarButtons.innerHTML = `
        <a class="button login" id="loginButton" onclick="toggleLoginModal()">Log In</a>
        <a class="button is-primary" onclick="toggleSignupModal()">
            <strong>Sign Up</strong>
        </a>
    `;
}

function logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userID');
    updateNavbarForLoggedOutUser();
}

function checkLoginStateAndUpdateNavbar() {
    if (localStorage.getItem('accessToken')) {
        updateNavbarForLoggedInUser();
    } else {
        updateNavbarForLoggedOutUser();
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.querySelector('#loginForm input[type=email]').value;
    var password = document.querySelector('#loginForm input[type=password]').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('userID', data.userID);
            updateNavbarForLoggedInUser();
            console.log('Login Success:', data);
            toggleLoginModal();
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        var loginErrorElement = document.getElementById('loginError');
        if (loginErrorElement) {
            loginErrorElement.classList.add('show');
        }
    });
});

// Check login state on page load
document.addEventListener('DOMContentLoaded', checkLoginStateAndUpdateNavbar);
