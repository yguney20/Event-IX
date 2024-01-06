// Function to parse eventId from the URL
function getEventIdFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('eventId');
}

// Fetch event details from the backend
function fetchEventDetails(eventId) {
    fetch(`/api/events/${eventId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(event => {
            displayEventDetails(event);
        })
        .catch(error => console.error('Error:', error));
}

function displayEventDetails(event) {
    const container = document.getElementById('eventDetailContainer');
    container.innerHTML = `
        <div class="event-header">
            <img src="${event.ImageURL}" alt="${event.Name}" class="event-image">
            <h1>${event.Name}</h1>
        </div>
        <div class="event-body">
            <p class="event-description">${event.Description}</p>
            <p class="event-info">
                <span>Venue: ${event.VenueName}, ${event.VenueLocation}</span> | 
                <span>Date: ${new Date(event.Date).toLocaleString('en-US', {
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit'
                })}</span>
            </p>
            <p class="event-organizer">Organized by: ${event.OrganizerName}</p>
            <div class="ticket-info">
                <p class="event-price">Ticket Price: $${event.TicketPrice}</p>
                <button class="buy-ticket-btn">Buy Tickets</button>
            </div>
        </div>
    `;
}


// Extract the eventId from the URL and fetch the event details
document.addEventListener('DOMContentLoaded', () => {
    const eventId = getEventIdFromUrl();
    if (eventId) {
        fetchEventDetails(eventId);
    } else {
        console.error('Event ID not found in the URL');
    }
});
