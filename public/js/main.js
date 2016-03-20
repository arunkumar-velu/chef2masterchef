function onSearch(){
	$.ajax({
	  url: "/post",
	  type: "GET",
	  dataType: "json",
	  success: function (data) {
	  	$('#c2mc_post').html('');
        for(var i=0; i< data.length; i++){
        	var post = '<p>'+data[i]._source.title+'</p><p>'+data[i]._source.comments.comment+'</p>';
        	$('#c2mc_post').append(post);
        }
      },
      error: function (err) {
        console.log(err)
      }
	})		
};

function onCreate(){
	var title = $('#c2mc_title').val();
	var comment = $('#c2mc_comment').val();
	var createdAt = Date.now(new Date());
	var updateAt = Date.now(new Date());
	var dataObj = {
		post: title,
		comment: comment,
		createAt : createdAt,
		updateAt : createdAt
	}
	$.ajax({
	  url: "/post",
	  type: "POST",
	  dataType: "text/json",
	  data: dataObj
	})
	  .done(function( msg ) {
	    alert( "Data Saved: " + msg );
	  });
}