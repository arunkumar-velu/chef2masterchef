$(document).ready(function(){
	$.ajax({
	  url: "/post",
	  type: "GET",
	  dataType: "json",
	  success: function (result) {
	  	$('#c2mc_post').html('');
        for(var i=0; i< result.length; i++){
       		$('#c2mc_post').append(panelTemplate(result[i].title,result[i].comments.comment));
       		//$('#c2mc_post').append(panelTemplate(data[i]._source.title,data[i]._source.comments.comment));
        }
      },
      error: function (err) {
        console.log(err)
      }
	});
});

function onSearch(){
	var searchInput = $("#c2mc-search-input").val();
	$.ajax({
	  url: "/post/search",
	  type: "GET",
	  dataType: "json",
	  data: {search:searchInput},
	  success: function (result) {
	  	$('#c2mc_post').html('');
        for(var i=0; i< result.length; i++){
       		$('#c2mc_post').append(panelTemplate(result[i].title,result[i].comments.comment));
       		//$('#c2mc_post').append(panelTemplate(data[i]._source.title,data[i]._source.comments.comment));
        }
      },
      error: function (err) {
        console.log(err)
      }
	});
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
                $('#c2mc_post').prepend(_self.panelTemplate(result.title,result.comments.comment));
              },
              error: function(err){
              	console.log(err)
              }
            });
}