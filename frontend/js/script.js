document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
});

function loadEvents() {
    // Simulate fetching event data
    const events = [
        { name: 'Concert', date: '2023-07-01', venue: 'Venue A' },
        { name: 'Conference', date: '2023-08-15', venue: 'Venue B' },
        { name: 'Sports Match', date: '2023-09-05', venue: 'Venue C' }
    ];

    const eventsContainer = document.getElementById('events-container');
    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerHTML = `<h3>${event.name}</h3><p>Date: ${event.date}</p><p>Venue: ${event.venue}</p>`;
        eventsContainer.appendChild(eventDiv);
    });
}
