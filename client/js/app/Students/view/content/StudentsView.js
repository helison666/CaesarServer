'use strict';

(function (This, app) {
    This.StudentsView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupView',
        $groupContainer: null,
        defaultAction: 'list', // list, approved, score
        template: templates.studentsViewTpl,

        events: {
            'click .editBtn': 'renderEditStudent',
            'click .listBtn':  'renderList',
        },

        initialize: function (options) {
            this.mediator = app.mediator;
            this.listener = {
                'list': {view: 'StudentsListView'}, 
                'editStudent': {view: 'EditStudentListView'}
            };

            this.groups = options.groups;
            this.hideEdit = options.hideEdit;
        },

        render: function () {
            this.$el.empty();
            this.$el.append(this.template());

            if (this.hideEdit) {
                this.$el.find('.buttons-wrapper').append(templates.studentsViewEditButtonTpl());
            }

            return this;
        },

        renderList: function () {
            this.showStubView(this.defaultAction);
            this.publishEvent(this.defaultAction);
        },

        renderEditStudent: function () {
            this.mediator.publish('Students: edit-request', this.groups);
        },

        showStubView: function (action) {
            var $editBtn, data, $groupContainer, $buttons, $el, stubView;

            if (action === undefined || typeof action === 'object') {
                action = this.defaultAction;
            } 

            if (action === 'students' || action === 'editStudentBtn') {
                $editBtn = this.$el.find('.editBtn');

                $editBtn.removeClass('editBtn');
                $editBtn.addClass('editStudentBtn');
            } else {
                $editBtn = this.$el.find('.editStudentBtn');

                $editBtn.removeClass('editStudentBtn');
                $editBtn.addClass('editBtn');
            }

            data = this.listener[action],
            $groupContainer = this.$el.find('.groupContainer'),
            $buttons = this.$el.find('.active'),
            $el = $('.'+ action + 'Btn'),

            stubView = new This[data.view]({
                model: this.model,
                collection: this.collection
            });

            $groupContainer.empty();
            $groupContainer.append(stubView.render().$el);
            $buttons.removeClass('active');
            $el.addClass('active');
        },

        publishEvent: function (stubViewName) {
            this.mediator.publish('Students: stubView-changed', {groups: this.groups, stubView: stubViewName});
        }
    });
})(CS.Students, app);
