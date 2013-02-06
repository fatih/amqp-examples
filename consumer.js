var amqp = require('amqp');

var connection = amqp.createConnection({url: "amqp://guest:guest@localhost:5672"}, {defaultExchangeName: "test-exchange"});

connection.on('ready', function(){

    connection.exchange('test-exchange', {type: 'direct', autoDelete: false, durable: false},  function (exchange) {
        console.log('Exchange ' + exchange.name + ' is open');
        connection.queue('test-key', function(queue){

            queue.bind(exchange, 'test-key');
            queue.on('queueBindOk', function() {
                console.log(' [*] Waiting for messages. To exit press CTRL+C')

                queue.subscribe(function(msg, headers, deliveryInfo){
                    console.log(" [x] Received %s", msg.data.toString('utf-8'));
                    console.log('Got a message with routing key ' + deliveryInfo.routingKey);
                    
                });
            });
        });
    });
});
