'use strict';

(function (This) {
    This.AttachmentsList = Backbone.Collection.extend({
        model: This.Attachment,
        url: '/attachments',

        findAttachmentsByStudent: function (student) {
            var attachments;

            this.forEach(function (attachment) {
                attachments = this.where({'key': student.get('lastName') + ' ' + student.get('name')});
            }, this);

            return attachments;
        },

        isCVExist: function (name) {
            var exist = false;

            this.forEach(function (attachment) {
                attachment.get('cv').forEach(function (item) {
                    if (item.name === name) {
                        exist = true;
                    }
                });
            }, this);

            return exist;
        },

        isPhotoExist: function (name) {
            var exist = false;

            this.forEach(function (attachment) {
                attachment.get('photo').forEach(function (item) {
                    if (item.name === name) {
                        exist = true;
                    }
                });
            }, this);

            return exist;
        }
    });
})(CS.Attachments);