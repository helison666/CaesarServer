'use strict';

(function (This, app) {
    This.ScoreModalStudentListView = Backbone.View.extend({
        tagName: 'section',

        className: 'backdrop',

        template: templates.scoreModalStudentListTpl,

        events: {
            'click .fa-chevron-left': 'backwardForm',
            'click .exit': 'exit',
            'click .name': 'sortByName',
            'click .incoming': 'sortByIncomingTest',
            'click .entry': 'sortByEntryScore'
        },

        initialize: function () {
 	        this.mediator = app.mediator;

            this.nameOrder = false;
            this.incomingOrder = true;
            this.entryOrder = true;
        },

        backwardForm: function () {
            this.mediator.publish('Students: crud-request', this.model);
        },
        
        exit: function () {
            $(document).off('keydown');
            $(document).off('click');
            this.remove();
        },

        render: function () {
            this.$el.html(this.template());

            this.collection.forEach(function (student) {
                var view = new This.OneScoreModalStudentListView({model: student});
                this.$el.find('.tableBodyStudents').append(view.render().el);
            }, this);

            return this;
        },

        sortByName: function () {
            var attribute = 'lastName';

            if (this.nameOrder) {
                this.collection.sort(myComparator);
            } else {
                this.collection.sort(myComparator).reverse();
            }

            this.render();

            this.nameOrder = !this.nameOrder;
            this.incomingOrder = true;
            this.entryOrder = true;

            function myComparator (a, b) {
                if (a.get(attribute).toLowerCase() < b.get(attribute).toLowerCase()) {
                    return -1;
                } else if (a.get(attribute).toLowerCase() > b.get(attribute).toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                }
            }
        },

        sortByIncomingTest: function () {
            var attribute = 'incomingScore';

            if (this.incomingOrder) {
                this.collection.sort(myComparator);
            } else {
                this.collection.sort(myComparator).reverse();
            }

            this.render();

            this.incomingOrder = !this.incomingOrder;
            this.nameOrder = true;
            this.entryOrder = true;

            function myComparator (a, b) {
                if (parseInt(a.get(attribute)) < parseInt(b.get(attribute))) {
                    return -1;
                } else if (parseInt(a.get(attribute)) > parseInt(b.get(attribute))) {
                    return 1;
                } else {
                    return 0;
                }
            }
        },

        sortByEntryScore: function () {
            var attribute = 'entryScore';

            if (this.entryOrder) {
                this.collection.sort(myComparator);
            } else {
                this.collection.sort(myComparator).reverse();
            }

            this.render();

            this.entryOrder = !this.entryOrder;
            this.nameOrder = true;
            this.incomingOrder = true;

            function myComparator (a, b) {
                if (parseInt(a.get(attribute)) < parseInt(b.get(attribute))) {
                    return -1;
                } else if (parseInt(a.get(attribute)) > parseInt(b.get(attribute))) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    });
})(CS.Students, app);