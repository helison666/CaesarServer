'use strict';

(function (This) {
    This.Attachment = Backbone.Model.extend({
        urlRoot: '/attachments',
        defaults: {
            key: '',
            cv: [],
            photo: []
        }
    });
})(CS.Attachments);