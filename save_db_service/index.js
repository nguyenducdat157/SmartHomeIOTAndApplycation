require('dotenv').config({ path: '../server/.env'});

const mqtt = require('mqtt');
const mongoose = require('mongoose');
const Sensor = require('./models/Sensor');

//========================= create server socket local
const aedes = require('aedes')()
const httpServer = require('http').createServer()
const ws = require('websocket-stream')
const port = 9001

ws.createServer({ server: httpServer }, aedes.handle)

httpServer.listen(port, function () {
	console.log('websocket local server listening on port ', port)
});


//==============================client local
var clientLocal = mqtt.connect({
	host: 'localhost',
	protocol: 'ws',
	port: 9001
});
clientLocal.on('connect', function () {
	clientLocal.subscribe('local', function (err) {
		// if (!err) {
		//     setInterval(() => {
		//         clientLocal.publish('presence', 'Hello mqtt')
		//     }, 2000);
		// }
	})
	clientLocal.on('message', async function (topic, message) {
		// message is Buffer
		const recvFromSocket = JSON.parse(message.toString());
		console.log('localContent =>', recvFromSocket);
	})
})

//========================================================= client mqtt
//Connect to mongodb database
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/iot', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));

var client = mqtt.connect({
	host: 'ithust.xyz',
});

client.on('connect', function () {
	client.subscribe('demo', function (err) {
		if (!err) {
			console.log('Subcribing to MQTT Broker!');
			//test
			client.publish(
				'demo',
				JSON.stringify({
					humidityLand: 40,
					humidityAir: 50,
					temperature: 25,
				})
			);
		}
	});
});

db.once('open', () => {
	console.log('Connected to Database');
	client.on('message', async function (topic, message) {
		//test
		//console.log(`${topic.toString()}=>${message.toString()}`);

		// message is Buffer
		let content = JSON.parse(message.toString());
		clientLocal.publish('local', message.toString());
		console.log(content);

		//Save to db
		//Create a new Sensor
		const sensor = new Sensor({
			humidityLand: content.humidityLand,
			humidityAir: content.humidityAir,
			temperature: content.temperature,
		});
		try {
			const savedSensor = await sensor.save();
			console.log('[Saved DB] =>',savedSensor);
		} catch (err) {
			console.error(err);
		}
	});
});


//dung de test
// setInterval(() => {
// 	client.publish(
// 		'demo',
// 		JSON.stringify({
// 			humidityLand: Math.floor(Math.random() * 100),
// 			humidityAir: Math.floor(Math.random() * 100),
// 			temperature: Math.floor(Math.random() * 100),
// 		})
// 	);
// }, 2000);
