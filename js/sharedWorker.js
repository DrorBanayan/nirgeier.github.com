// count active connections
var connections = 0;

// Instead of a single message processing function,
// the code here attaches multiple event listeners
self.addEventListener("connect", function (e) {

    // On each connection the port is always the first
    // (and only) port in the event ports list
    var port = e.ports[0];
    connections++;

    port.addEventListener("message", function (e) {
        port.postMessage("Message: " + JSON.stringify(e.data) + ", (Port #" + connections + ")");
    }, false);

    port.start();
}, false);  