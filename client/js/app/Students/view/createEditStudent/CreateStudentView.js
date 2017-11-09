'use strict';

(function (This, app) {
    This.CreateStudentView = Backbone.View.extend({
        tag: 'section',

        className: 'backdrop',

        template: templates.createStudentViewTpl,

        events: {
            'drop .dropZone': 'handleDroppedFiles',
            'dragover .dropZone': 'handleDragOver',
            'click .close-modal-window': 'exit',
            'click .save-changes': 'createNewStudent',
            'click .BrowsePhoto': 'openPhotoSelector',
            'click .BrowseCV': 'openCVSelector',
            'click .remove-photo': 'removePhoto',
            'click .remove-cv': 'removeCV',
            'change .approvedBy': 'showCustom',
            'change [name="uploadPhoto"]': 'handleSelectedPhotos',
            'change [name="uploadCV"]': 'handleSelectedCVs'
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.listener = {
                'students': {view: 'StudentsListView'},
                'editStudent': {view: 'EditStudentListView'}
            };

            this.subAttachment = new This.SubAttachment();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        createNewStudent: function () { 
            var incomingScore = this.$el.find('[name=incomingTest]').val(),
                studentSurname = this.$el.find('[name=LastName]').val(),
                studentName = this.$el.find('[name=FirstName]').val(),
                englishLevel = this.$el.find('.englishLevel').val(),
                entryScore = this.$el.find('[name=entryScore]').val(),
                groupId = this.$el.find('[name=groupId]').val(),
                showHints = this.showHints.bind(this),
                context = this,
                approvedBy,
                validationDependencies,
                isPassedValid = true,
                newStudent, newAttachment;

                if( this.$el.find('.custom-approval-input').prop('disabled')) {
                    approvedBy = this.$el.find('.approvedBy').val();
                } else {
                    approvedBy = this.$el.find('.custom-approval-input').val();
                }

            validationDependencies = {
                studentName: [this.isName, studentName, 'You can use only letters, space and "-" ', 'FirstName'],
                studentSurname: [this.isName, studentSurname, 'You can use only letters, space and "-" ', 'LastName'],
                incomingScore: [this.isIncoming, incomingScore, 'You can use only numbers 0 - 1000', 'IncomingTest'],
                entryScore: [this.isScore.bind(this), entryScore, 'You can use only real numbers 2 - 5', 'EntryScore'],
                approvedBy: [this.isName, approvedBy,  'You can use only letters, space and "-" ', 'CustomApproval'],
                photo: [this.isName, studentName, 'You can use only letters, space and "-" ', 'FirstName'],
            };

            $.each(validationDependencies, function (key, value) {
                if(!value[0](value[1])){
                    showHints(context, value[2], value[3]);
                    isPassedValid = false;
                }
            });

            entryScore = this.$el.find('[name=entryScore]').val();

            if (isPassedValid) {
                newStudent = {
                    groupId: groupId,
                    name: studentName,
                    lastName: studentSurname,
                    englishLevel: englishLevel,
                    CvUrl: '',
                    avatar: '',
                    entryScore: entryScore,
                    incomingScore: incomingScore,
                    approvedBy: approvedBy
                };

                this.subAttachment.sendToServer();
                this.subAttachment.saveToDataBase(studentSurname, studentName);

                store.students.create(newStudent);

                $(document).off('keydown');
                $(document).off('click');

                this.remove();

                this.mediator.publish('Students: crud-request');
            }
        },

        isName: function (value) {
            var validator = /[A-Za-z]{1}[a-z]{1,9}[ -]{0,1}[A-Za-z]{1}[a-z]{1,9}/;
            return validator.test(value);
        },

        isIncoming: function (value) {
            value = parseInt(value);
            return (value >= 0 && value <= 1000);
        },

        isScore: function (score) {
            var entry = this.$el.find('[name=entryScore]'),
                result = true,
                firstDigit, decimal;

            if (isNaN(parseFloat(score))) {
                result = false;
            }
            
            score = score.replace(',', '.');

            if (score.indexOf(".") > -1){
                firstDigit = score.slice(0, score.indexOf("."));
                decimal =  score.slice(score.indexOf(".") + 1);
            } else {
                firstDigit= parseInt(score.charAt(0));
                decimal = score.slice(1);
            }
            if (firstDigit < 2){
                score = 2.0
            } else if (firstDigit >= 5){
                score = 5.0
            } else {
                score = firstDigit + '.' + decimal;
                score = Math.round(parseFloat(score)*10)/10;
            }

            entry.val(score);

            return result;
        },

        exit: function () {
            $(document).off('keydown');
            $(document).off('click');
            this.remove();

            this.mediator.publish('Students: crud-request');
        },

        showCustom () {
            var selected = this.$el.find(".approvedBy option:selected"),
                approvalInput = this.$el.find('.custom-approval-input');

            if (selected.val() === 'Custom') {
                approvalInput.removeClass('hidden');
                approvalInput.prop('disabled', false);
            } else {
                approvalInput.addClass('hidden');
                approvalInput.prop('disabled', true);
            }
        },

        showHints: function (self, message, input) {
            var hints = [{
                    name: input,
                    text: message
                }];

            app.mediator.publish('Message', {
                type: 'hints',
                $el: self.$el,
                hints: hints
            });
        },

        openPhotoSelector: function () {
            var uploadPhoto = this.$el.find('[name="uploadPhoto"]');

            uploadPhoto.click();
        },

        openCVSelector: function () {
            var uploadCV = this.$el.find('[name="uploadCV"]');

            uploadCV.click();
        },

        handleSelectedPhotos: function (e) {
            var downloadedPhoto = this.$el.find('.downloadedPhoto'),
                file = e.target.files[0],
                valid;

            if(file) {
                valid = this.subAttachment.savePhotoFile(file);

                if (valid) {
                    downloadedPhoto.append(templates.studentDownloadedPhotoTpl(file));
                } else {
                    alert(
                        `Sorry, you should use only allowed file types:
                        doc, docx, pdf or rtf for CV 
                        and jpg, jpeg, tiff or png for photo.`
                    );
                    //app.mediator.publish('Students: errorFormat request');
                }
            }
        },

        handleSelectedCVs: function (e) {
            var downloadedCV = this.$el.find('.downloadedCV'),
                file = e.target.files[0],
                valid;

            if(file) {
                valid = this.subAttachment.saveCVFile(file);

                if (valid) {
                    downloadedCV.append(templates.studentDownloadedCVTpl(file));
                } else {
                    alert(
                        `Sorry, you should use only allowed file types:
                        doc, docx, pdf or rtf for CV 
                        and jpg, jpeg, tiff or png for photo.`
                    );
                    //app.mediator.publish('Students: errorFormat request');
                }
            }
        },

        handleDragOver: function (e) {
            e.preventDefault();
        },

        handleDroppedFiles: function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (e.type === 'drop') {
                var files = e.originalEvent.dataTransfer.files,
                    downloadedPhoto = this.$el.find('.downloadedPhoto'),
                    downloadedCV = this.$el.find('.downloadedCV');

                _.each(files, function (file) {
                    var ext = file.name.slice(file.name.lastIndexOf('.') + 1);

                    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg' || ext === 'tiff') {
                        downloadedPhoto.append(templates.studentDownloadedPhotoTpl(file));
                        this.subAttachment.savePhotoFile(file);
                    } else if (ext === 'doc' || ext === 'docx' || ext === 'pdf' || ext === 'rtf') {
                        downloadedCV.append(templates.studentDownloadedCVTpl(file));
                        this.subAttachment.saveCVFile(file);
                    } else {
                        error = true;
                    }

                    if (error) {
                        alert(
                            `Sorry, you should use only allowed file types:
                            doc, docx, pdf or rtf for CV 
                            and jpg, jpeg, tiff or png for photo.`
                        );
                        //app.mediator.publish('Students: errorFormat request');
                    }
                }, this);
            } 
        },

        removePhoto: function (e) {
            var li = e.currentTarget.parentNode,
                delName = e.currentTarget.dataset.photo;

            li.remove();

            this.subAttachment.deletePhoto(delName);
        },

        removeCV: function (e) {
            var li = e.currentTarget.parentNode,
                delName = e.currentTarget.dataset.cv;

            li.remove();

            this.subAttachment.deleteCV(delName);
        }
    });
})(CS.Students, app);
