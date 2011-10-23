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

        // Check to see if we are closing any worker
        if (e.data.cmd === 'kill') {
            connections--;
        }

        // Performance wise...
        message.push("[Worker] Message: ");
        message.push(JSON.stringify(e.data));
        message.push(", workerId #");
        message.push(uniqeId);
        message.push(", Connections:");
        message.push(connections);

        // Send the message
        port.postMessage(message.join(''));
    }, false);

    port.start();
}, false);  
