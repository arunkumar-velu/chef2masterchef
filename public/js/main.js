$(document).ready(function(){
	$.ajax({
	  url: "/post",
	  type: "GET",
	  dataType: "json",
	  success: function (data) {
	  	$('#c2mc_post').html('');
        for(var i=0; i< data.length; i++){
       		$('#c2mc_post').append(panelTemplate(data[i].title,data[i].comments.comment));
       		//$('#c2mc_post').append(panelTemplate(data[i]._source.title,data[i]._source.comments.comment));
        }
      },
      error: function (err) {
        console.log(err)
      }
	});
});

function onSearch(){
			
};

function panelTemplate(title, comment){
	var template = '<div class="panel panel-default">'+
					  '<div class="panel-heading">'+
					    '<h3 class="panel-title">'+title+'</h3>'+
					  '</div>'+
					  '<div class="panel-body">'+comment+
					  '</div>'+
					'</div>';
	return template;
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
	$('#c2mc-post-form').collapse('hide');
	$.ajax({
	  url: "/post",
	  type: "POST",
	  dataType: "text/json",
	  data: dataObj,
	  success:function(data){
	  	alert( "Data Saved: " + msg );
	    
	  }
	});
}