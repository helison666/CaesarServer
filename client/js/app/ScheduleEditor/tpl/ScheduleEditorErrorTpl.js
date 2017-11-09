templates.ScheduleEditorErrorTpl = _.template([
	'<div class="modal-body">',
		'<div class="message-body">',
		    '<p>Sorry, but you can not create schedule for group without assigned teacher.</p>',
			'<div class="editGroup-buttons">',
				'<button class="save">',
					'<i class="fa fa-check-circle-o fa-3x"></i>',
				'</button>',
			'</div>',
		'</div>',
	'</div>'
].join(''));