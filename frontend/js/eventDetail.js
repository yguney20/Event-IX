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
                <span>Venue: ${event.VenueName}, ${event.Location}</span> | 
                <span>Date: ${new Date(event.Date).toLocaleString()}</span>
            </p>
            <p class="event-organizer">Organized by: ${event.OrganizerName}</p>
            <div class="ticket-info">
                <p class="event-price">Ticket Price: $${event.Price}</p>
                <div class="ticket-quantity">
                    <label for="ticketCount">Tickets:</label>
                    <input type="number" id="ticketCount" value="1" min="1" max="10" onchange="updateTotalPrice(${event.Price})">
                </div>
                <p id="totalPrice">Total Price: $${event.Price}</p>
                <button class="buy-ticket-btn">Buy Tickets</button>
            </div>
        </div>
    `;
    const buyButton = container.querySelector('.buy-ticket-btn');
    buyButton.addEventListener('click', () => purchaseTickets(event.EventID));
}

function updateTotalPrice(ticketPrice) {
    const ticketCount = document.getElementById('ticketCount').value;
    const totalPrice = ticketPrice * ticketCount;
    document.getElementById('totalPrice').textContent = `Total Price: $${totalPrice}`;
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
