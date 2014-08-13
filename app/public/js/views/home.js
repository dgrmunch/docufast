$(document).ready(function(){

	var hc = new HomeController();
	
	$('#document-form').ajaxForm({
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') hc.onUpdateSuccess();
		}
	});

// customize the account settings form //
	
	$('#account-form h1').text('Create a new Document');
	$('#account-form #sub1').text('Upload the PDFs you want to merge');
	$('#account-form-btn').html('Update');

	function urlParam(name){
		var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
		if(results !== null)
			return results[1] || 0;
		else
			return false;
	}
	
	if(urlParam('upload'))
		$.ajax({
			url: '/list',
			type: 'POST',
			data: { user: urlParam('user')},
			success: function(data){
				$('#document-form').text('').append(data);
				$('#sortable').sortable();
				$('#sortable').disableSelection();
			}
		});
})