// Function to update the unread messages badge
function updateUnreadMessagesBadge() {
    const unreadMessagesCount = localStorage.getItem("unreadMessagesCount") || 0;
    const badge = document.getElementById("unread-messages-badge");
    
    if (unreadMessagesCount > 0) {
        badge.textContent = unreadMessagesCount;
        badge.style.display = "inline"; // Show the badge as inline
    } else {
        badge.style.display = "none"; // Hide the badge if there are no unread messages
    }
}

// Call the function to update the badge when the page loads
updateUnreadMessagesBadge();

/*
// Handle navigation to "admin-messages.html"
const mensajesLink = document.getElementById("mensajes-link");
mensajesLink.addEventListener("click", function () {
    // Reset the unread message count when entering the "admin-messages.html" page
    localStorage.setItem("unreadMessagesCount", 0);
    
    // Hide the badge
    const badge = document.getElementById("unread-messages-badge");
    badge.style.display = "none";
});
*/