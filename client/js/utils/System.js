'use strict';
var System = (function () {
    var ajax = new XMLHttpRequest(),
        _constants = {
            ESC: 27,
            ENTER: 13
        };

    function _register (parent, modules) {
        modules.forEach(function (module) {
            parent[module] = {};
        });
    }

    function _registerArray (parent, properties) {
        properties.forEach(function (propertiesSet) {
            parent[propertiesSet] = [];
        });
    }

    function _preload () {
        ajax.open("GET", '/preload', true);
        ajax.send();

        return this;
    }

    function _then (callback) {
        var response;

        ajax.addEventListener('readystatechange', function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
                response = JSON.parse(ajax.responseText);

                store.groups = new CS.Groups.GroupList(response.groups);
                store.locations = new CS.Locations.LocationList(response.locations);
                store.students = new CS.Students.StudentsList(response.students);
                store.groupSchedule = new CS.Schedule.GroupScheduleList(response.groupSchedule);
                store.attachments = new CS.Attachments.AttachmentsList(response.attachments);
                
                app.user = new CS.User.User(response.users);

                setInfoBlocks(response);

                if (typeof callback === 'function') {
                    callback();
                }
            }
        }.bind(this), false);
    }

    function setInfoBlocks (response) {
        var key;
        
        _registerArray(i, ['englishLevels', 'teachers', 'directions', 'roles', 'stages', 'rooms']);

        response.englishLevels.forEach(function (record) {
             i.englishLevels.push(record.name);
        });

        response.directions.forEach(function (record) {
            i.directions.push(record.name);
        });

        response.roles.forEach(function (record) {
            i.roles.push(record.name);
        });

        response.stages.forEach(function (record) {
            i.stages.push(record.name);
        });

        response.rooms.forEach(function (record) {
            // i.rooms = {};
            // for (key in record) {
            //     if (key !== 'id' && key !== '_id') {
            //         i.rooms[key] = record[key];
            //     } 
            // }
            i.rooms.push(record);
        });
    }

    function _setInfoBlock (name, where) {
        i[where].push(name);
    }

    /*function _startWebSocket () {
        var socket = new WebSocket("ws://localhost:8080");

        socket.onmessage = function(event) {
            var data = event.data,
                collection = data.collection;
                console.log(event.data);
        };
    }*/

    return {
        constants: _constants,
        register: _register,
        preload: _preload,
        then: _then,
        setInfoBlock: _setInfoBlock
        //startWebSocket: _startWebSocket
    };
})();