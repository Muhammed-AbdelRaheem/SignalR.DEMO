document.addEventListener("DOMContentLoaded", function () {

    var userName = prompt("Please Enter Your Name :)");

    var messageInput = document.getElementById("messageInp");
    var groupNameInput = document.getElementById("groupNameInp");
    var messageToGroupInput = document.getElementById("messageToGroupInp");

    var proxyConnection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

    proxyConnection.start().then(function () {
        document.getElementById("sendMessageBtn").addEventListener('click', function (e) {
            e.preventDefault();

            proxyConnection.invoke("SendMessage", userName, messageInput.value);
        });

        document.getElementById("joinGroupBtn").addEventListener('click', function (e) {
            e.preventDefault();

            proxyConnection.invoke("JoinGroup",  userName,groupNameInput.value);
        });

        document.getElementById("sendMessageToGroupBtn").addEventListener('click', function (e) {
            e.preventDefault();

            proxyConnection.invoke("SendMessageToGroup", groupNameInput.value, userName, messageToGroupInput.value);
        });

         


    }).catch(function (error) {
    console.log(error);
});

proxyConnection.on("RecieveMessage", function (userName, message) {
    var listElement = document.createElement('li');

    listElement.innerHTML = `<strong>${userName}: </strong> ${message}`;

    document.getElementById("conversation").appendChild(listElement);
});

proxyConnection.on("NewMemberJoin", function (userName, groupName) {
    var listElement = document.createElement('li');

    listElement.innerHTML = `<strong>${userName} has joined ${groupName}</strong>`;

    document.getElementById("groupConversationUL").appendChild(listElement);
});

proxyConnection.on("RecieveMessageFromGroup", function (sender, message) {
    var listElement = document.createElement('li');

    listElement.innerHTML = `<strong>${sender}: </strong> ${message}`;

    document.getElementById("groupConversationUL").appendChild(listElement);
});

})