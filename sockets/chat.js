module.exports = function(io) {
	var crypto = require('crypto')
		, md5 = crypto.createHash('md5')
		, sockets = io.sockets;
	sockets.on('connection', function (client) {
		var session = client.handshake.session, 
			usuario = session.usuario;
		client.on('join', function(sala) {
			console.log('passando no join - ' + sala);
			if(sala) {
				sala = sala.replace('?','');
			} else {
				var timestamp = new Date().toString();
				var md5 = crypto.createHash('md5');
				sala = md5.update(timestamp).digest('hex');
			}
			console.log('entrando na sala ' + sala);
			client.set('sala', sala);
			client.join(sala);
		});
		client.on('send-server', function (msg) {
			console.log('passando no send-server - ' + msg);
			var msg = "<b>"+ usuario.nome +":</b> "+ msg +"<br>";
			client.get('sala', function(erro, sala) {
				var data = {email: usuario.email, sala: sala};
				client.broadcast.emit('new-message', data);
				sockets.in(sala).emit('send-client', msg);
			});
		});
		client.on('disconnect', function () {
			console.log('passando no disconnect ');
			client.get('sala', function(erro, sala) {
				console.log('saindo da sala ' + sala);
				client.leave(sala);
			});
		});
	});
	
}