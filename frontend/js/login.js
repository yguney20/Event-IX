// login.js
function toggleLoginModal() {
    var modal = document.getElementById('loginModal');
    modal.classList.toggle('is-active');
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
    });
});
