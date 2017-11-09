'use strict';

(function (This, app) {
	This.EditStudentListView = Backbone.View.extend({
		tagName: 'section',

		className: 'backdrop',

		template: templates.editStudentListModalTpl,

		events: {
            'click .createStudent': 'createStudent',
            'click .csv-button': 'uploadTrigger',
			'change .uploadCSV': 'parseCSV',
            'drop .modal_editStudentlist': 'parseCSV',
            'dragover .modal_editStudentlist': 'handleDragOver',
			'click .downloadCV': 'downloadCV',
			'click .modal_editStudentlist': 'editStudent',
			'click .right': 'scoreStudentList',
			'click .exit': 'exit',
            'click .save': 'saveCSV',
			'click .name': 'sortByName',
			'click .engLevel': 'sortByEngLevel'
		},
		
		initialize: function (options) {
			this.mediator = app.mediator;
            this.csv = options.csv || {showConfirm: false};

			this.nameOrder = false;
			this.engOrder = true;
		},

		render: function () {
			this.$el.html(this.template(this.csv));

            if (this.collection.length === 0) {
                this.$el.find('.csv-button').removeClass('hidden');
            }

			this.collection.forEach(function (student) {
				var view = new This.OneEditStudentItemView({model: student});
				this.$el.find('.tableBodyStudents').append(view.render().el);
			}, this);

			$(document).on('keydown', keyEvent.bind(this));

			function keyEvent (event) {
				if (event.which === System.constants.ESC) {
					this.exit();
				}
			}

			return this;
		},

		createStudent: function () {
			this.mediator.publish('Students: create-request');
		},

        uploadTrigger: function () {
            var uploadInput = $('.uploadCSV');

            uploadInput.click();
        },

        parseCSV: function (e) {
            var file = {},
                reader = new FileReader();

                if (e.target.files) {
                    file = e.target.files;
                } else if (e.originalEvent.dataTransfer.files){
                    file = e.originalEvent.dataTransfer.files;
                }

                reader.addEventListener('load', readFile.bind(this), true);

                function readFile(evt) {
                    this.separator(evt.target.result);
                }

                reader.readAsText(file[0]);

            e.stopPropagation();
            e.preventDefault();        
        },

        handleDragOver: function (e) {
            e.preventDefault();
        },

        separator: function (csv) {
            var rows = csv.split('\n'),
                headers = rows[0].split(','),
                data = rows.join(',').split(','),
                newStudent = {},
                students = [];

            for (let i = headers.length; headers.length < data.length; headers.length += 3) {
                newStudent = {
                    groupId: this.model.get('name'),
                    name: data[headers.length],
                    lastName: data[headers.length+1],
                    englishLevel: data[headers.length+2],
                    CvUrl: '',
                    avatar: '',
                    entryScore: '0',
                    incomingScore: '0',
                    approvedBy: '',
                };

                students.push(new This.Student(newStudent));
            }

            this.mediator.publish('Students: csv-request', students);
        },

		scoreStudentList: function () {
			this.mediator.publish('Students: score-request');
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
            this.engOrder = !this.engOrder;
            this.nameOrder = true;

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

        saveCSV: function () {
            var i = 0;

            this.collection.forEach(function (student) {
                store.students.add(student);
            }, this);

            this.collection[i].save().then(nextSave.bind(this));

            app.mediator.publish('Students: crud-request');
            
            function nextSave () {
                i++;
                if (i < this.collection.length - 1) {
                    this.collection[i].save().then(nextSave.bind(this));
                } else {
                    this.collection[i].save();
                }
                
            }
        },

		exit: function () {
            app.mediator.publish('Students: groups selected', [this.model]);
            $(document).off('keydown');
            $(document).off('click');
            this.remove();
		}
	});
})(CS.Students, app);
