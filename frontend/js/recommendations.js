
function getCurrentUserId() {
    return localStorage.getItem('userID');
}



function renderEvents(events) {
    const eventsContainer = document.querySelector('.events .event-container .columns');
    eventsContainer.innerHTML = ''; // Clear existing events

    // Loop through the events and create HTML for each one
    events.forEach(event => {
        const eventHTML = `
            <div class="column is-one-third">
                <div class="card event-card" data-event-id="${event.EventID}">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img src="/${event.ImageURL || 'path/to/default-image.png'}" alt="${event.Name}">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content has-text-centered">
                                <p class="title is-4">${event.Name}</p>
                                <p class="subtitle is-6">${event.Type}</p>
                                <p class="subtitle is-6">${new Date(event.Date).toLocaleString('en-US', {
                                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit'
                                })}</p>
                            </div>
                        </div>
                        <div class="content">
                            ${event.Description}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append the event HTML to the container
        eventsContainer.insertAdjacentHTML('beforeend', eventHTML);
    });
    // Add the event listeners after the HTML for the cards has been inserted
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventId = card.getAttribute('data-event-id');
            handleEventCardClick(eventId);
        });
    });
}

function handleEventCardClick(eventId) {
    const accessToken = localStorage.getItem('token');
    
    if (accessToken) {
        window.location.href = `/event-detail.html?eventId=${eventId}`;
    } else {
        showLoginAlert(); // Show the login alert message
    }
}

function fetchUserRecommendations() {
    const userId = getCurrentUserId();
    if (!userId) {
        showLoginAlert();
        return;
    }

    fetch(`/api/user-recommendations/${userId}`)
        .then(response => response.json())
        .then(data => {
            renderEvents(data);  // Use the same function for rendering events
        })
        .catch(error => console.error('Error fetching user recommendations:', error));
}

document.addEventListener('DOMContentLoaded', fetchUserRecommendations);
