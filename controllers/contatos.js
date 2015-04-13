module.exports = function(app) {
	var ContatoController = {
		index: function(req, res) {
			var usuario = req.session.usuario
			, params = {usuario: usuario};
			res.render('contatos/index', params);
		}
	}
	
	return ContatoController;
};