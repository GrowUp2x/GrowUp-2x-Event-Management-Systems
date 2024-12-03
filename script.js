// Event Form Submission
document.getElementById("eventForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventLocation = document.getElementById("eventLocation").value;
    const eventDescription = document.getElementById("eventDescription").value;
    const eventCategory = document.getElementById("eventCategory").value;

    if (eventName && eventDate && eventCategory) {
        const event = { 
            name: eventName, 
            date: eventDate, 
            location: eventLocation,
            description: eventDescription, 
            category: eventCategory 
        };
        addEventToStorage(event);
        showNotification("Event Added Successfully!");
        resetForm();
        displayEvents();
    } else {
        alert("Please fill all fields.");
    }
});

// Add event to local storage
function addEventToStorage(event) {
    const events = getEventsFromStorage();
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
}

// Get events from local storage
function getEventsFromStorage() {
    const events = JSON.parse(localStorage.getItem('events'));
    return events ? events : [];
}

// Display events in the list
function displayEvents() {
    const events = getEventsFromStorage();
    const eventList = document.getElementById("eventList");
    eventList.innerHTML = '';

    events.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

    events.forEach((event, index) => {
        const eventItem = document.createElement("div");
        eventItem.classList.add("event-item");

        const countdown = getCountdown(new Date(event.date));
        eventItem.innerHTML = `
            <div class="event-name">${event.name}</div>
            <div class="event-date">${event.date}</div>
            <div class="event-category">${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</div>
            <div class="event-countdown">${countdown}</div>
            <button class="delete-btn" onclick="confirmDelete(${index})">Delete</button>
        `;

        eventList.appendChild(eventItem);
    });
}

// Countdown calculation
function getCountdown(eventDate) {
    const now = new Date();
    const timeDiff = eventDate - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} Days Left` : "Event Started!";
}

// Confirm Delete
function confirmDelete(index) {
    document.getElementById("deleteModal").style.display = "flex";
    document.getElementById("confirmDelete").onclick = () => deleteEvent(index);
    document.getElementById("cancelDelete").onclick = () => document.getElementById("deleteModal").style.display = "none";
}

// Delete event
function deleteEvent(index) {
    const events = getEventsFromStorage();
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    document.getElementById("deleteModal").style.display = "none";
    showNotification("Event Deleted Successfully!");
    displayEvents();
}

// Search function
function searchEvents() {
    const searchQuery = document.getElementById("eventSearch").value.toLowerCase();
    const events = getEventsFromStorage();
    const filteredEvents = events.filter(event => event.name.toLowerCase().includes(searchQuery));
    displayFilteredEvents(filteredEvents);
}

// Display filtered events
function displayFilteredEvents(events) {
    const eventList = document.getElementById("eventList");
    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const eventItem = document.createElement("div");
        eventItem.classList.add("event-item");

        const countdown = getCountdown(new Date(event.date));
        eventItem.innerHTML = `
            <div class="event-name">${event.name}</div>
            <div class="event-date">${event.date}</div>
            <div class="event-category">${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</div>
            <div class="event-countdown">${countdown}</div>
            <button class="delete-btn" onclick="confirmDelete(${index})">Delete</button>
        `;

        eventList.appendChild(eventItem);
    });
}

// Theme toggle function
document.getElementById("toggleTheme").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    const button = document.getElementById("toggleTheme");
    button.textContent = document.body.classList.contains("dark-mode") ? "Switch to Light Mode" : "Switch to Dark Mode";
});

// Initialize events display
displayEvents();

// Show notification
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.innerText = message;
    notification.style.opacity = 1;
    setTimeout(() => notification.style.opacity = 0, 3000);
}

// Reset the form
function resetForm() {
    document.getElementById("eventName").value = '';
    document.getElementById("eventDate").value = '';
    document.getElementById("eventLocation").value = '';
    document.getElementById("eventDescription").value = '';
    document.getElementById("eventCategory").value = '';
}
