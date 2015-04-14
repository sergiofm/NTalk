module.exports = function(app) {
	var ChatController = {
		index: function(req, res){
			var resultado = {
				usuario: req.session.usuario,
				email: req.params.email,
				sala: req.params.sala
			};
			res.render('chat/index', resultado);
		}
	};
	return ChatController;
};