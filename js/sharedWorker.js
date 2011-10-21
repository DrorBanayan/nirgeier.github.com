// count active connections
var connections = 0;

var uniqeId = Date.now();

// Instead of a single message processing function,
// the code here attaches multiple event listeners
self.addEventListener("connect", function (e) {

    // On each connection the port is always the first
    // (and only) port in the event ports list
    var port = e.ports[0];
    connections++;

    port.addEventListener("message", function (e) {
        var message = [];

        // Performance wise...
        message.push("Message: ");
        message.push(JSON.stringify(e.data));
        message.push(", (uniqeId #");
        message.push(uniqeId);
        message.push(", Connections:");
        message.push(connections);

        // Send the message
        port.postMessage(message.join(''));
    }, false);

    port.start();
}, false);  
