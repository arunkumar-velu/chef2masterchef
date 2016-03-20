module.exports = function(){
	var es_helpers= require('../helpers/elasticSearchHelper')();
	return {
		//POST
		create: function(request,response){
			var params = request.body;
			es_helpers.creatPost(params, function(){
				response.send();	
			});
		},
		//GET
		fetch: function(request,response){
			var params = request.body;
			response.type('application/json');
			es_helpers.getAllPost(params, function(err, data){
				
				response.send(JSON.stringify(data));	
			});
		}
	}
}