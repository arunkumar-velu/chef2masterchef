module.exports = function(){
	var es_mappings = require('../mapping/es_mapping');
	var elasticsearch = require('elasticsearch');
	var uuid = require('uuid');

	var elasticSearchClient = new elasticsearch.Client({
	  host: 'localhost:9200',
	  log: 'trace'
	});
	return{
		createIndex:function(indexName){
			var mapping = {};
			var index = indexName ? indexName : 'post'
			mapping[index] = es_mappings.mappings;
			elasticSearchClient.indices.create({index: 'post',body: {mappings: mapping}})
		},
		creatPost: function(params, callback){
			var es_object = {
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
			elasticSearchClient.create({index : 'post',type: 'post',body:es_object}, function(err, response){
				if(err){
					console.log('Error while create........',err)
				}
				callback(err, response);
			})

		},
		getAllPost: function(params, callback){
			elasticSearchClient.search({index: 'post', body: { "query": {"match_all" : {}}}},function(err, response){
				var records = {};
				if(err){
					console.log('Error while fetch All post.........',err);
				}
				if(response){
					var records = response.hits.hits
				}
				callback(err, records);
			})
		}
	}
}