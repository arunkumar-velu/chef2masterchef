module.exports= function(app) {
	var postController = require(__dirname+'/app/controllers/postController')();
	app.post('/post',postController.create);
	app.get('/post',postController.fetch);
	app.get('/post/search',postController.search);
}