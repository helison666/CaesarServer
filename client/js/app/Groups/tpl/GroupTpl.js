templates.groupTpl = _.template([
    '<header class="group-controls">',
        '<div class="buttons-wrapper">',
            '<% if ((app.user.isRole(\'Teacher\')) && (_.contains(teachers, app.user.getShortName()) && (stage !== \'finished\')) ||',
                '((app.user.isRole(\'Coordinator\')) && (app.user.isLocation(location))) ||',
                '(app.user.isRole(\'Administrator\'))) { %>',
                '<button class="btn editBtn" name="edit"> <i class="fa fa-cog fa-2x"></i></button>',
            '<% } %>',
        '</div>',
        '<div class="btn-group">',
            '<button class="btn infoBtn" name="info"><i class="fa fa-info fa-2x"></i></button>',
            '<button class="btn studentsBtn" name="students"><i class="fa fa-users fa-2x"></i></i></button>',
            '<button class="btn sheduleBtn" name="shedule"><i class="fa fa-calendar fa-2x"></i></button>',
            '<button class="btn messageBtn" name="message"><i class="fa fa-envelope-o fa-2x"></i></button>',
        '</div>',
    '</header>',
    '<div class=groupContainer></div>'
].join(''));