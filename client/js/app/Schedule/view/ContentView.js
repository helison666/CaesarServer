'use strict';

(function (This, app) {
    This.ContentView = Backbone.View.extend({
        template: templates.contentTpl,
        className: 'contentSection',

        initialize: function () {
            app.mediator.subscribe('Locations: selected', this.showLocationInfo.bind(this));
            app.mediator.subscribe('Schedule: groups selected', this.showSelectedGroup.bind(this));
            app.mediator.subscribe('Schedule: select-month', this.changeYear.bind(this));

        },

        render: function (locations) {
            this.$el.html(templates.contentTpl);
			      this.$groupLocation = this.$el.find('.groupLocation');
            this.$groupName = this.$el.find('.groupName'),
            this.$mainSection = this.$el.find('.main-section');

            return this;
        },

        showSelectedGroup: function (groups) {
            var year = new Date().getFullYear();

            if (groups.length > 1) {
                this.$groupName.html(groups.length + ' groups');
            } else if (groups.length === 1){
                this.$groupName.html(groups[0].get('name'));
            }

            this.$el.find('.groupStageTitle').html(year);

            return this;
        },

        changeYear: function (year) {

            this.$el.find('.groupStageTitle').html(year);
        },

        showLocationInfo: function (locations) {
            var numberOflocations = '';

            if (locations.length > 1) {
                numberOflocations = locations.length + ' locations';
                $('.groupLocation').html(numberOflocations);

                this.showHints(locations);
            } else {
                $('.groupLocation').html(locations[0]);
            }
        },

        showHints: function (locations) {
            this.$groupLocation.on('mouseover', showMessage.bind(this));
            this.$groupLocation.on('mouseleave', removeMessage.bind(this));

            function showMessage () {
                var hints = [{
                    name: 'content-header-location',
                    text: locations
                }];

                app.mediator.publish('Message', {
                    type: 'hints',
                    $el: this.$el,
                    hints: hints
                });
            }

            function removeMessage () {
                this.$el.find('.hint').remove();

                this.$groupLocation.off('mouseover', showMessage.bind(this));
                this.$groupLocation.off('mouseleave', showMessage.bind(this));
            }
        },
    });

})(CS.Schedule, app);
