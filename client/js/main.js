'use strict';

var CS = {},
    app = {},
    templates = {},
    store = {},
    i = {};

System.register(CS, ['ErrorPage', 'Menu', 'GroupList', 'Groups', 'Students', 'Attachments', 'Schedule', 'ScheduleEditor', 'User', 'Locations', 'Messenger', 'About', 'Storage']);
System.register(app, ['domProvider' ,'mediator', 'filter', 'router', 'subRouters', 'notFound', 'user', 'userController', 'menuController', 'infoblock', 'preload', 'modal']);

$(function () {
    System.preload().then(main);

    function main () {
        app.domProvider = new DomProvider(jQuery);
        app.mediator = new Mediator();
        app.filter = new CS.Filter();
        app.modal = new CS.Modal();
        app.router = new CS.Router();

        app.preload = new CS.Storage.Controller().load();
        app.userController = new CS.User.Controller();
        app.notFoundController = new CS.ErrorPage.Controller();
        app.messengerController = new CS.Messenger.Controller();
        app.locationsController = new CS.Locations.Controller();
        app.menuController  = new CS.Menu.Controller();
        app.grouplistController  = new CS.GroupList.Controller();
        app.scheduleEditorController  = new CS.ScheduleEditor.Controller();


        Backbone.history.start({pushState: true});
    }
});
