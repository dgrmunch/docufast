
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

})