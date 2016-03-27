module.exports = function(){
	//var es_helpers= require('../helpers/elasticSearchHelper')();
	var db = require('../../db/db');
	var uuid = require('uuid');
	return {
		//POST
		create: function(request,response){
			var params = request.body;
			// es_helpers.creatPost(params, function(){
			// 	response.send();	
			// });
			var mlab_object = {
				id: uuid.v1(),
				title: params.post ? params.post : '',
				createAt: params.createAt? params.createAt: '',
				updateAt: params.updateAt? params.updateAt : '',
				comments:{
					commentId: uuid.v1(),
					comment : params.comment ? params.comment: '',
					commentCreateAt: params.createAt? params.createAt: '',
					commentUpdatedAt: params.updateAt? params.updateAt : '',
				}
			};
			var collection = db.get().collection("posts");
	 		collection.insert(mlab_object);
	 		response.send({"success":"true","data": params});

		},
		//GET
		fetch: function(request,response){
			var params = request.body;
			response.type('application/json');
			// es_helpers.getAllPost(params, function(err, data){
				
			// 	response.send(JSON.stringify(data));	
			// });
			var collection = db.get().collection('posts');	
		  	collection.find().toArray(function(err, docs) {
		    	response.send(docs);
			});
		}
	}
}