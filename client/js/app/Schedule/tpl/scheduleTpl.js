templates.scheduleTpl = _.template([
    '<header class="schedule-controls">',
        '<div class="buttons-wrapper">',
            '<button class="btn editBtn" name="edit"> <i class="fa fa-cog fa-2x"></i></button>',
        '</div>',
        '<div class="btn-schedule">',
            '<button class="scBtn monthBtn"></button>',
            '<button class="scBtn weekBtn"></button>',
            '<button class="scBtn keyDatesBtn"></button>',
        '</div>',
    '</header>',
    '<div class="scheduleContainer"></div>'
].join(''));