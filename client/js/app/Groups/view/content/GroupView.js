'use strict';

(function (This, app) {
    This.GroupView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupView',
        $groupContainer: null,

        events: {
            'click .editBtn': 'renderEdit',
            'click .infoBtn':  'renderInfo',
            'click .studentsBtn': 'renderStudents',
            'click .sheduleBtn': 'renderSchedule',
            'click .messageBtn': 'renderMessage',
            'click .editStudentBtn': 'renderEditStudent',
            'click .editScheduleBtn': 'renderEditSchedule',
        },

        initialize: function () {

            this.mediator = app.mediator;
            this.listener = {
                'info': {view: 'GroupInfoView'},
                'edit': {view: 'GroupCreateEditView'},
                'shedule': {view: 'GroupScheduleView'},
                'students': {view: 'StudentListView'},
                'message': {view: 'MessageView'},
                'editStudent': {view: 'EditStudentListView'},
                'editSchedule': {view: 'ScheduleEditorView'},
            };
            
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        render: function () {
            this.$el.empty();
            this.$el.append(templates.groupTpl(this.model.toJSON()));
            
            return this;
        },

        renderInfo: function () {
            this.showStubView('info');
            this.publishEvent('info');
        },

        renderStudents: function () {
            this.showStubView('students');
            this.publishEvent('students');
        },

        renderSchedule: function () {
            this.showStubView('shedule');
            this.publishEvent('shedule');
            // this.$el.find('.editBtn').addClass('editScheduleBtn').removeClass('editBtn');
            // this.$el.find('.editBtn').removeClass().addClass('btn editScheduleBtn');
        },

        renderMessage: function () {
            this.showStubView('message');
            this.publishEvent('message');
        },

        renderEdit: function () {
            this.mediator.publish('Groups: edit-request', this.model);
            this.mediator.publish('Groups: crud-request', 'edit');
        },

        renderEditStudent: function () {
            this.mediator.publish('Students: crud-request', this.model);
        },
        
        renderEditSchedule: function () {
            this.mediator.publish('ScheduleEditor: edit-request', this.model);
        },

        showStubView: function (action) {
            var $editBtn;

            if (action === undefined || typeof action === 'object') {
                action = 'info';
            } 

            if (action === 'students' || action === 'editStudentBtn') {
            // if (action === 'students' || action === 'editStudent') {
                $editBtn = this.$el.find('.editBtn');

                $editBtn.removeClass('editBtn');
                $editBtn.addClass('editStudentBtn');
            } else {
                $editBtn = this.$el.find('.editStudentBtn');

                $editBtn.removeClass('editStudentBtn');
                $editBtn.addClass('editBtn');
            }

            if (action === 'shedule' || action === 'editSchedule') {
                $editBtn = this.$el.find('.editBtn');

                $editBtn.removeClass('editBtn');
                $editBtn.addClass('editScheduleBtn');
            } else {
                $editBtn = this.$el.find('.editScheduleBtn');

                $editBtn.removeClass('editScheduleBtn');
                $editBtn.addClass('editBtn');
            }

            var data = this.listener[action],
                $groupContainer = this.$el.find('.groupContainer'),
                $buttons = this.$el.find('.active'),
                $el = $('.'+ action + 'Btn'),
                stubView;

            if (action === 'students') {
                stubView = new CS.Students.StudentsListView({collection: app.filter.split('students', this.model)});
            } else { 
                stubView = new This[data.view]({model: this.model});
            }

            $groupContainer.empty();
            $groupContainer.append(stubView.render().$el);
            $buttons.removeClass('active');
            $el.addClass('active');
        },

        publishEvent: function (stubViewName) {
            this.mediator.publish('Groups: stubView-changed', {group: this.model, stubView: stubViewName});
        }
    });
})(CS.Groups, app);
