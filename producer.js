var amqp       = require('amqp');

var connection = amqp.createConnection({url: "amqp://guest:guest@localhost:5672"}, {defaultExchangeName: "test-exchange"});

connection.on('ready', function(){
    connection.exchange('test-exchange', {type: 'direct', autoDelete: false, durable: false},  function (exchange) {
        console.log('Exchange ' + exchange.name + ' is open');
        exchange.publish('test-key', 'Hello World via node-ampq producer!');
        console.log(" [x] Sent 'Hello World!'");
    });
});
