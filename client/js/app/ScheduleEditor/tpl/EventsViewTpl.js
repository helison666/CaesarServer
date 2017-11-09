'use strict';
templates.eventsViewTpl = _.template([
    '<ul class="btn-group eventsView">',
        '<% for (let i = 0; i < events.length; i++) { %>',
		'<%     let eventState = events[i]; %>',    
		'<li class="lectures-wrapper-button">',
			'<input type="radio" name="event" class="check-with-label" id="radio-<%= eventState.name%>"/>',
            '<label for="radio-<%= eventState.name%>" class="btn btn-large btn-info label-for-check">',
			    '<%= eventState.name %>',
                '<div class="event-score">',
                    '<span class="event-counter"><%= eventState.used %></span>',
                    '<span class="event-counter">/</span>',
                    '<span class="event-counter"><%= eventState.load %></span>',
                '</div>',
            '</label>',
        '</li>',
		'<% } %>',
    '</ul>',
].join(''));
