// Function to update the navbar for logged-in user
function updateNavbarForLoggedInUser() {
    var navbarButtons = document.querySelector('.navbar-item .buttons');
    navbarButtons.innerHTML = `
        <a class="button" id="logoutButton" onclick="logoutUser()">Log Out</a>
    `;
}

// Function to handle user logout
function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    updateNavbarForLoggedOutUser();
}

// Function to revert the navbar for logged-out user
function updateNavbarForLoggedOutUser() {
    var navbarButtons = document.querySelector('.navbar-item .buttons');
    navbarButtons.innerHTML = `
        <a class="button login" id="loginButton" onclick="toggleLoginModal()">Log In</a>
        <a class="button is-primary" onclick="toggleSignupModal()">
            <strong>Sign Up</strong>
        </a>
    `;
}

// Check if the user is already logged in when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('token')) {
        updateNavbarForLoggedInUser();
    }
});
