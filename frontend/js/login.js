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

function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    var navbarButtons = document.querySelector('.navbar-item .buttons');
    navbarButtons.innerHTML = `
        <a class="button login" id="loginButton" onclick="toggleLoginModal()">Log In</a>
        <a class="button is-primary" onclick="toggleSignupModal()">
            <strong>Sign Up</strong>
        </a>
    `;
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
        // Login successful
        updateNavbarForLoggedInUser();
        console.log('Login Success:', data);
        toggleLoginModal();
        
        if (data.accessToken) {
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('userID', data.userID);
            console.log('Access:', data.accessToken);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle login errors (show an error message on the page)
        var loginErrorElement = document.getElementById('loginError');
        if (loginErrorElement) {
            loginErrorElement.classList.add('show'); // This should correctly show the error message
        } else {
            console.log('Error message element not found');
        }
    });
});
