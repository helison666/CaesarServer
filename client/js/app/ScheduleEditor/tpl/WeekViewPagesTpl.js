templates.weekViewPagesTpl = _.template([
    '<div class="week-pages">',
        '<i class="fa fa-caret-left prevWeek" aria-hidden="true"></i>',
        '<span class="week"> Week: </span>',
        '<span class="week-number-bottom current"><%= currentWeekNumber %> </span>',
        '<span class="week-number-bottom">of </span>',
        '<span class="week-number-bottom total"> </span>',
        '<span class="week-number-bottom total"><%= totalWeekNumber %> </span>',
        '<i class="fa fa-caret-right nextMonth nextWeek" aria-hidden="true"></i>',
    '</div>',
].join('')); 