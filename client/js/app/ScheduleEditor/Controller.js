'use strict';
(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'ScheduleEditor: edit-request': 'editShedule'
        },

        initialize: function () {
            this.mediator = app.mediator;
        },

        start: function () {
            var groups = store.groups.getCheckedGroups(),
                groupsSelector;

            if (groups.length ===1) {
                this.editShedule(groups[0]);
            } else {
                groupsSelector = new This.GroupsSelectorView({
                    collection: groups
                });

                app.domProvider.modalWindow.html(groupsSelector.render().el);
            }
        },

        editShedule: function (group) {
            if (group.get('teachers').length < 1) {
                this.errorPageView = new This.ErrorPageView();
                $('#modal-window').html(this.errorPageView.render().$el);
            } else {
                var sheduleEditor = new This.ScheduleEditorView({model: group});

                app.domProvider.modalWindow.html(sheduleEditor.render().el);
            }
        }
    });
})(CS.ScheduleEditor, app);