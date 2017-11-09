templates.studentsViewTpl = _.template([
    '<header class="group-controls">',
        '<div class="buttons-wrapper">',
            
        '</div>',
        '<div class="btn-group">',
            '<button class="btn listBtn" name="students"><i class="fa fa-graduation-cap fa-2x"></i></i></button>',
            '<button class="btn" name="shedule"><i class="fa fa-check-circle-o fa-2x"></i></button>',
            '<button class="btn" name="message"><i class="fa fa-envelope-o fa-2x"></i></button>',
        '</div>',
    '</header>',
	'<div class=groupContainer></div>'
].join(''));

templates.studentsViewEditButtonTpl = _.template([
    '<button class="btn editBtn" name="edit"> <i class="fa fa-cog fa-2x"></i></button>'
].join(''));