// Function to show the profile panel
function showProfilePanel() {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID'); 

    if (!token || !userID) {
        alert('Please login first');
        return;
    }

    var profilePanel = document.getElementById('profilePanel');
    profilePanel.classList.add('open'); // Use class to show the panel
    fetchUserProfile();
}

// Function to hide the profile panel
function closeProfilePanel() {
    var profilePanel = document.getElementById('profilePanel');
    profilePanel.classList.remove('open'); // Use class to hide the panel
}

// Rest of your functions...

document.addEventListener('DOMContentLoaded', () => {
    // Load the profile panel content dynamically
    loadProfilePanel();

    const navbar = document.querySelector('.navbar');
    
    const navbarHeight = navbar.offsetHeight;
    const profilePanel = document.getElementById('profilePanel');
    profilePanel.style.top = `${navbarHeight}px`;
    profilePanel.style.height = `calc(100% - ${navbarHeight}px)`;

    // Attach event listeners to your profile icon
    var profileIcon = document.getElementById('profileIcon');
    profileIcon.addEventListener('click', showProfilePanel);
});

function loadProfilePanel() {
    fetch('profilePanel.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('profilePanel').innerHTML = data;
            document.getElementById('closeProfilePanel').addEventListener('click', closeProfilePanel);
        })
        .catch(error => console.error('Error loading profile panel:', error));
}
// Function to fetch user profile from the backend
function fetchUserProfile() {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID'); 

    if (!token || !userID) {
        console.error('No token or user ID found');
        return;
    }

    fetch(`/api/user/profile/${userID}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("data : ", data)
        updateProfilePanel(data);
        fetchUserTicketCount();
        fetchUserEmergencyContact();
        fetchUserUpcomingBookings();
        fetchUserPastBookings();
    })
    .catch(error => {
        console.error('Error fetching profile:', error);
    });
}

function updateProfilePanel(userData) {
    const profileContent = document.getElementById('profilePanel');
    const fullName = `${userData.firstName} ${userData.lastName}`;

    // Updating full name
    let nameElement = profileContent.querySelector('#userName');
    if (!nameElement) {
        nameElement = document.createElement('h3');
        nameElement.id = 'userName';
        profileContent.appendChild(nameElement);
    }
    nameElement.textContent = fullName;

    // Updating email
    let emailElement = profileContent.querySelector('#userEmail');
    if (!emailElement) {
        emailElement = document.createElement('p');
        emailElement.id = 'userEmail';
        profileContent.appendChild(emailElement);
    }
    emailElement.textContent = `Email: ${userData.email}`;

    // Updating phone
    let phoneElement = profileContent.querySelector('#userPhone');
    if (!phoneElement) {
        phoneElement = document.createElement('p');
        phoneElement.id = 'userPhone';
        profileContent.appendChild(phoneElement);
    }
    phoneElement.textContent = `Phone: ${userData.phone}`;

    let ticketCountElement = profileContent.querySelector('#userTickets');
    if (!ticketCountElement) {
        ticketCountElement = document.createElement('p');
        ticketCountElement.id = 'userTickets';
        profileContent.appendChild(ticketCountElement);
    }
    let userEmergencyContact = profileContent.querySelector('#userEmergencyContact');
    if (!userEmergencyContact) {
        userEmergencyContact = document.createElement('p');
        userEmergencyContact.id = 'userEmergencyContact';
        profileContent.appendChild(userEmergencyContact);
    }
}

function fetchUserTicketCount() {
    const token = localStorage.getItem('token'); 

    if (!token) {
        console.error('No authentication token found.');
        return;
    }

    fetch('/api/user/tickets', { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if(data && data.ticketCount !== undefined) {
            document.getElementById('userTickets').textContent = `Ticket Count: ${data.ticketCount}`;
        } else {
            throw new Error('Ticket count not available in the response.');
        }
    })
    .catch(error => {
        console.error('Error fetching ticket count:', error);
    });
}
function fetchUserEmergencyContact() {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (!token || !userID) {
        console.error('No token or user ID found');
        return;
    }

    fetch('/api/user/emergency-contact', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(emergencyContact => {
        if (emergencyContact) {
            const contactInfo = `Emergency Contact: ${emergencyContact.Name}, Phone: ${emergencyContact.Phone}, Relation: ${emergencyContact.Relation}`;
            document.getElementById('userEmergencyContact').textContent = contactInfo;
        } else {
            throw new Error('Emergency contact not available in the response.');
        }
    })
    .catch(error => {
        console.error('Error fetching emergency contact:', error);
    });
}

function fetchUserUpcomingBookings() {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (!token || !userID) {
        console.error('No token or user ID found');
        return;
    }

    fetch('/api/user/upcoming-bookings', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.upcomingBookings) {
            updateUpcomingBookingsUI(data.upcomingBookings);
        } else {
            throw new Error('Upcoming bookings not available in the response.');
        }
    })
    .catch(error => {
        console.error('Error fetching upcoming bookings:', error);
    });
}
function updateUpcomingBookingsUI(bookings) {
    const bookingsList = document.getElementById('userUpcomingBookings');
    bookingsList.innerHTML = ''; // Clear existing bookings

    if (bookings.length === 0) {
        const noBookingsElement = document.createElement('li');
        noBookingsElement.textContent = 'None';
        bookingsList.appendChild(noBookingsElement);
    } else {
        bookings.forEach(booking => {
            const bookingElement = document.createElement('li');
            const eventName = document.createElement('span');
            eventName.textContent = booking.Name;
            eventName.className = 'event-name';

            const eventDetails = document.createElement('span');
            eventDetails.textContent = ` - Date: ${new Date(booking.EventDate).toLocaleString()}, Location: ${booking.Location}`;
            eventDetails.className = 'event-details';

            bookingElement.appendChild(eventName);
            bookingElement.appendChild(eventDetails);
            bookingsList.appendChild(bookingElement);
        });
    }
}

function fetchUserPastBookings() {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (!token || !userID) {
        console.error('No token or user ID found');
        return;
    }

    fetch('/api/user/past-bookings', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.pastBookings) {
            updatePastBookingsUI(data.pastBookings);
        } else {
            throw new Error('Past bookings not available in the response.');
        }
    })
    .catch(error => {
        console.error('Error fetching past bookings:', error);
    });
}
function updatePastBookingsUI(bookings) {
    const bookingsList = document.getElementById('userPastBookings');
    bookingsList.innerHTML = ''; // Clear existing bookings

    if (bookings.length === 0) {
        const noBookingsElement = document.createElement('li');
        noBookingsElement.textContent = 'None';
        bookingsList.appendChild(noBookingsElement);
    } else {
        bookings.forEach(booking => {
            const bookingElement = document.createElement('li');
            const eventName = document.createElement('span');
            eventName.textContent = booking.Name;
            eventName.className = 'event-name';

            const eventDetails = document.createElement('span');
            eventDetails.textContent = ` - Date: ${new Date(booking.EventDate).toLocaleString()}, Location: ${booking.Location}`;
            eventDetails.className = 'event-details';

            bookingElement.appendChild(eventName);
            bookingElement.appendChild(eventDetails);
            bookingsList.appendChild(bookingElement);
        });
    }
}

