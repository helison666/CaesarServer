'use strict';
(function (This, app) {
    This.LocationListView = Backbone.View.extend({
        tagName: 'div',
        className: 'locationsWindow',
        $documentEl: $(document),

        template: templates.locationListViewTpl,

        events: {
            'click .save': 'select',
            'click .cancel': 'close',
        },

        initialize: function () {
            app.mediator.subscribe('Locations: one-selected', this.selectOne, {}, this);

            this.nestedViews = [];

            _.bindAll(this, 'onKeyPress');
            this.$documentEl.bind('keydown', this.onKeyPress);
            this.listenTo(this.collection, 'change:isChecked', this.toggleSaveBtnEl, this);
        },

        render: function () {
            this.$el.html(this.template);
            this.$saveBtnEl = this.$el.find('.save');
            this.$ul = this.$el.find('ul');

            this.collection.sort();

            this.collection.forEach(function (location) {
                var locationView = new This.LocationView({
                    model: location
                });

                this.$ul.append(locationView.render().el);
                this.nestedViews.push(locationView);
            }, this);

            if (this.collection.checkedLocations.length > 0) {
                this.highLightCheckedLocs();
            }

            return this;
        },

        onKeyPress: function (e) {
            var keyCode = e.keyCode;

            if (keyCode === System.constants.ENTER) {
                if (this.collection.hasCheckedLocations()) {
                    this.select();
                }
            }

            if (keyCode === System.constants.ESC) {
                this.remove();
            }
        },

        toggleSaveBtnEl: function () {
            if (this.collection.hasCheckedLocations()) {
                this.$saveBtnEl.prop('disabled', false)
                    .removeClass('disabled');
            } else {
                this.$saveBtnEl.prop('disabled', true)
                    .addClass('disabled');
            }
        },

        select: function () {
            if (window.location.pathname.indexOf('Locations') !== -1) {
                app.mediator.publish('Locations: forRouter', this.collection.getCheckedLocationsNames());
                new CS.Groups.Controller().start(this.collection.getCheckedLocationsNames());
            } else {
                app.mediator.publish('Locations: forRouter', this.collection.getCheckedLocationsNames());
                app.mediator.publish('Locations: selected', this.collection.getCheckedLocationsNames()); 
            }

            this.onClose();
        },

        selectOne: function (selectedLocation) {
            this.collection.checkOnlyOneLocation(selectedLocation);
            this.select();
        },

        removeNestedViews: function () {
            this.nestedViews.forEach(function(nestedView) {
                nestedView.remove();
            });

            this.nestedViews = [];
        },

        onClose: function () {
            app.mediator.remove('Locations: one-selected', this.selectOne, {}, this);

            this.$documentEl.unbind('keydown', this.onKeyPress);

            if (this.collection.hasCheckedLocations()) {
                this.collection.checkedLocations = this.collection.getCheckedLocations();
                this.collection.uncheckLocations();
            }

            this.removeNestedViews();
            this.remove();
        },

        close: function () {
            app.mediator.publish('Locations: dialog-closed');
            this.onClose();
        },

        highLightCheckedLocs: function() { 
            for (var i = 0; i < this.nestedViews.length; i++) {
                for (var j=0; j < this.collection.checkedLocations.length; j++) {
                    if (this.collection.checkedLocations[j].attributes.name === this.nestedViews[i].model.attributes.name) {
                        this.collection.checkedLocations[j].check();
                        this.nestedViews[i].$el.addClass('active-location');
                    }
                }
            }
        }
    });
})(CS.Locations, app);