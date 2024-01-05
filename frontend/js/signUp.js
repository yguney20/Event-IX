// signup.js
function toggleSignupModal() {
    var modal = document.getElementById('signupModal');
    modal.classList.toggle('is-active');
}

document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var firstName = document.querySelector('#signupForm input[name=firstName]').value;
    var lastName = document.querySelector('#signupForm input[name=lastName]').value;
    var email = document.querySelector('#signupForm input[name=email]').value;
    var phone = document.querySelector('#signupForm input[name=phone]').value;
    var password = document.querySelector('#signupForm input[name=password]').value;
    var passwordConfirmation = document.querySelector('#signupForm input[name=passwordConfirmation]').value;

        // Validate password length
        if (password.length < 6) {
            alert('Password should be at least 6 characters long.');
            return;
        }
    
        // Validate password matching
        if (password !== passwordConfirmation) {
            alert('Passwords do not match.');
            return;
        }

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password,
            passwordConfirmation: passwordConfirmation
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Signup failed');
            }
            return response.json();
        })
        .then(data => {
            // Signup successful
            console.log('Signup Success:', data);
            toggleSignupModal();

            // You can redirect or perform other actions upon successful signup
        })
        .catch((error) => {
            console.error('Error:', error);

            // Handle signup errors and display appropriate messages
            if (error.message) {
                alert(error.message); // Display the error message to the user
            } else {
                alert('Failed to sign up. Please try again.'); // Default error message
            }
        });
});
