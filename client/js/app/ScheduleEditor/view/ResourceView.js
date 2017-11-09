'use strict';
(function (This, app) {
    This.ResourceView = Backbone.View.extend({
        template: templates.resourceViewTpl,

        events: {

        },

        initialize: function (teachers, rooms) {
            this.teachers = teachers;
            this.rooms = rooms;
            this.defaultTeacher = app.user.getShortName();
            this.defaultRoom = 710;

        },

        render: function () {
            this.$el.html(this.template({
                teachers: this.teachers, 
                rooms: this.rooms,
                defaultTeacher: this.defaultTeacher,
                defaultRoom: this.defaultRoom
                }));

            this.$teacherSelector = this.$el.find('[name="resourceteacher"]');
            this.$roomSelector = this.$el.find('[name="room"]');
            this.$eventSelector = this.$el.find('[name="event"]');

            this.$teacherSelector.on('change', this.changeState.bind(this));
            this.$roomSelector.on('change', this.changeState.bind(this));
            this.$eventSelector.on('change', this.changeState.bind(this));
            return this;
        },

        changeState: function (event) {
            var resourceState = {
                name: event.target.name,
                value: event.target.value
            };

            app.mediator.publish('ScheduleEditor: state changed', resourceState);
        }
    });
})(CS.ScheduleEditor, app);