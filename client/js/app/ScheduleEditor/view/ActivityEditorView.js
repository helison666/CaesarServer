'use strict';

(function (This) {
    This.ActivityEditorView = Backbone.View.extend({
        template: templates.activityEditorTpl,
        tag: 'div',
        className: 'activity', 

        events: {
        	'click': 'cellHendler'
        },

        duration: 0,

        render: function(_duration) {
            this.duration = _duration;

            this.$el.append(this.template(this.model));
        
            return this;
        },

        cellHendler: function (evt) {
        	evt.preventDefault();
            evt.stopPropagation();
            
        	app.mediator.publish('Event: checked', evt.target.parentElement.parentElement, this.model);

        }
    });
})(CS.ScheduleEditor);


