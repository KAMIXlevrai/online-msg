document.addEventListener("DOMContentLoaded", function () {
    displayMessages();

    var socket = io.connect();

    socket.on('message', function (data) {
        var messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(data);
        localStorage.setItem("messages", JSON.stringify(messages));
        displayMessages();
    });
});

function sendMessage() {
    var userInput = document.getElementById("user-input");
    var message = userInput.value.trim();

    if (message !== "") {
        var username = "User"; // Vous pouvez personnaliser ceci ultérieurement
        var newMessage = { user: username, message: message };

        var socket = io.connect();
        socket.emit('message', newMessage);

        userInput.value = "";
    }
}

function displayMessages() {
    var messagesContainer = document.getElementById("messages-container");
    var messages = JSON.parse(localStorage.getItem("messages")) || [];

    var messagesHTML = messages.map(function (msg) {
        return "<p><strong>" + msg.user + ":</strong> " + msg.message + "</p>";
    });

    messagesContainer.innerHTML = messagesHTML.join("");
}
