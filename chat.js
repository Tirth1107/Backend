// Connect to the server
const socket = io();

const sendMessageBtn = document.getElementById('sendMessageBtn');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer');

// Function to create and display a message
function createMessage(content, sender = true) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (!sender) messageElement.classList.add('receiver'); // For messages from the other person
    messageElement.textContent = content;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the bottom
}

// Send message to server on button click
sendMessageBtn.addEventListener('click', function() {
    const message = messageInput.value.trim();
    if (message) {
        createMessage(message, true); // Sender's message
        socket.emit('sendMessage', message); // Emit the message to the server
        messageInput.value = ''; // Clear input field
    }
});

// Allow sending message with Enter key
messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && messageInput.value.trim() !== '') {
        createMessage(messageInput.value.trim(), true);
        socket.emit('sendMessage', messageInput.value.trim()); // Emit the message
        messageInput.value = ''; // Clear input field
    }
});

// Listen for incoming messages from the server
socket.on('receiveMessage', (message) => {
    createMessage(message, false); // Receiver's message
});
