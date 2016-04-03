$(document).ready(function(){
	$.ajax({
	  url: "/post",
	  type: "GET",
	  dataType: "json",
	  success: function (result) {
	  	$('#c2mc_posts').html('');
        for(var i=0; i< result.length; i++){
       		$('#c2mc_posts').append(panelTemplate(result[i]));
       		//$('#c2mc_post').append(panelTemplate(data[i]._source.title,data[i]._source.comments.comment));
        }
      },
      error: function (err) {
        console.log(err)
      }
	});
	$('#c2mc-search-input').on('keyup',function(e){
		if(e.keyCode == 13 || e.target.value == ''){
			onSearch();
		}
	});

	
});

function parseJSON(data){
	return JSON.parse(data);
}

function parseString(data){
	return JSON.stringify(data);
}

function onSearch(){
	var searchInput = $("#c2mc-search-input").val();
	$.ajax({
	  url: "/post/search",
	  type: "GET",
	  dataType: "json",
	  data: {search:searchInput},
	  success: function (result) {
	  	$('#c2mc_posts').html('');
        for(var i=0; i< result.length; i++){
       		$('#c2mc_posts').append(panelTemplate(result[i]));
       		//$('#c2mc_post').append(panelTemplate(data[i]._source.title,data[i]._source.comments.comment));
        }
      },
      error: function (err) {
        console.log(err)
      }
	});
};

function panelTemplate(data){
	var template = '<div class="c2mc-post">'+
						'<div class="panel panel-default">'+
						  '<div class="panel-heading">'+
						    '<h3 class="panel-title pull-left">'+data.title+'</h3>'+
						    '<a href="#" class="pull-right c2mc_edit post_'+data.id+'" onclick="editPost("'+data.title+'","'+data.comments.comment+'")"> Edit </a>'+
						  '</div>'+
						  '<div class="panel-body">'+data.comments.comment+
						  '</div>'+
						'</div>'+
					'</div>';
	return template;
};

function editPost(title, comment){
	var target = event.target;
	$(target).parent().parent().parent().html(editTemplate(title, comment));

}

function editTemplate(title, comment){
	data = parseJSON(data);
	var template = "<div id='c2mc-post-form' class='c2mc-post-form clearfix' >"+
					"<h5>Edit Post</h5>"+
					"<div>"+
						"<div class='form-group'>"+
							"<input type='text' name='new' class='form-control' id='c2mc_title' value="+title+">"+
						"</div>"+
					"</div>"+
					"<div>"+
						"<div class='form-group'>"+
							"<textarea placeholder='Comments' class='form-control' id='c2mc_comment'>"+comment+"</textarea>"+
						"</div>"+
					"</div>"+
					"<div class='pull-right'>"+
						"<button onclick='onEdit('"+title+"','"+comment+"')' class='btn btn-primary' >Edit</button>"+
						"<button onclick='onCancel('"+title+"','"+comment+"')' class='btn btn-secondary' >Cancel</button>"+
					"</div>"+
				"</div>";
	return template;
}

function onCreate(){
	var _self = this;
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
              method: "POST",
              dataType:"json",
              contentType: "application/json; charset=utf-8",
              url: "/post",
              jsonpCallback : "callback",
              data: JSON.stringify(dataObj),
              success: function(result){
				$('#c2mc-post-form').collapse('hide');
                $('#c2mc_posts').prepend(_self.panelTemplate(result));
                $('#c2mc_title').val('');
                $('#c2mc_comment').val('');
              },
              error: function(err){
              	console.log(err)
              }
            });
};

function onEdit(title, comment){
	cancel(title, comment);
};

function cancel(title, comment){
	var target = event.target;
	data = parseJSON(data);
	var template = '<div class="panel panel-default">'+
					  '<div class="panel-heading">'+
					    '<h3 class="panel-title pull-left">'+title+'</h3>'+
					    '<a href="#" class="pull-right post_'+data+'"> Edit </a>'+
					  '</div>'+
					  '<div class="panel-body">'+comment+
					  '</div>'+
					'</div>'+
					
	$(target).parent().parent().parent().html(template);
}