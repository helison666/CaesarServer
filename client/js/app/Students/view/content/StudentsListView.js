'use strict';

(function (This, app) {
    This.StudentsListView = Backbone.View.extend({
        tagName: 'table',

        className: 'students_list',

        template: templates.studentsListViewTpl,

        events: {
            'click .fullName': 'sortByName',
            'click .englishLevel': 'sortByEngLevel',
            'click .incomingTest': 'sortByIncomingTest',
            'click .entryScore': 'sortByEntryScore'
        },

        initialize: function () {
            this.nameOrder = true;
            this.engOrder = true;
            this.incomingOrder = true;
            this.entryOrder = true;

            this.emptyObj = {
                _name: 'empty',
                _avatar: 'empty',
                _englishLevel: 'empty',
                _incomingScore: 'empty',
                _entryScore: 'empty',
                _approvedBy: 'empty',
                toJSON: function () {
                    return {
                        name: this._name,
                        avatar: this._avatar,
                        englishLevel :this._englishLevel,
                        incomingScore: this._incomingScore,
                        entryScore: this._entryScore,
                        approvedBy: this._approvedBy
                    };
                }
            };
        },

        render: function () {
            var minRows = 6,
                difference = minRows - this.collection.length;

            this.$el.empty();
            this.$el.html(this.template());
            
            this.collection.forEach(function (student) {
                var view = new This.OneStudentView({
                    model: student
                });
                this.$el.append(view.render().el);
            }, this);

            if (difference > 0) {
                let view, i;
                for (i = 0; i < difference; i++) {
                    view = new This.OneStudentView({
                        model: this.emptyObj
                    });
                    this.$el.append(view.render().el);
                }
            }

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
            this.engOrder = true;
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

        sortByEngLevel: function () {
            var attribute = 'englishLevel';

            if (!this.engLevels) {
                this.engLevels = {};

                i.englishLevels.forEach(function (item, index) {
                    this.engLevels[item] = index;
                }, this);
            }

            if (this.engOrder) {
                this.collection.sort(myComparator.bind(this));
            } else {
                this.collection.sort(myComparator.bind(this)).reverse();
            }

            this.render();
            this.nameOrder = true;
            this.engOrder = !this.engOrder;
            this.incomingOrder = true;
            this.entryOrder = true;

            function myComparator (a, b) {
                if (this.engLevels[a.get(attribute)] < this.engLevels[b.get(attribute)]) {
                    return -1;
                } else if (this.engLevels[a.get(attribute)] > this.engLevels[b.get(attribute)]) {
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

            this.nameOrder = true;
            this.engOrder = true;
            this.entryOrder = true;
            this.incomingOrder = !this.incomingOrder;

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

            this.engOrder = true;
            this.nameOrder = true;
            this.entryOrder = !this.entryOrder;
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