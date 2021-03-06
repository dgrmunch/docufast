
function HomeController()
{

// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });
	
	$('#btn-compile').click(function(){ that.compileDocument(); });
		
// handle user logout //
	$('#btn-list').click(function(){ that.listDocuments(); });
	
// confirm account deletion //
	$('#account-form-btn1').click(function(){$('.modal-confirm').modal('show')});

// handle account deletion //
	$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });

	this.listDocuments = function()
	{
		$.ajax({
			url: '/list',
			type: 'POST',
			data: { user: $('#userId').val()},
			success: function(data){
	 			$('#document-form').text('').append(data);
				$('#sortable').sortable();
				$('#btn-compile').show();
			}
		});
	}

	this.deleteAccount = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/delete',
			type: 'POST',
			success: function(data){
	 			that.showLockedAlert('Your account has been deleted.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: "/home",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('You are now logged out.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}
	
	this.compileDocument = function()
	{
		var that = this;
		var documents = {}
	    $('#sortable li').each(function(document_index, document_value) {
			var element = {}
			$(this).find('input').each(function(element_index, element_value){
				element[element_index] = $(this).val();
			});
			documents[document_index] = element;
	    });
		$.ajax({
			url: '/compile',
			type: 'POST',
			data: {documents: documents},
			success: function(data){
	 			that.showLockedAlert('You can download your file <a href="/'+$('#userName').val()+'.pdf">here.<a>');
			},
			error: function(jqXHR){
				that.showLockedAlert('There was an error. Check your filenames.');
			}
		});
	}

	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h3').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';})
		setTimeout(function(){window.location.href = '/';}, 3000);
	}
}

HomeController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been updated.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
