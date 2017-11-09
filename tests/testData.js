'use strict';

var CS = {},
    app= {},
    i = {},
    store = {},
    students, expectedStudents,
    groups;
    
    app.mediator = new Mediator();
    CS.Students = {};
    CS.Groups = {}; 

students = [{
    "groupId": "DP-093-JS",
    "firstName": "Kirill",
    "lastName": "Kozak",
    "role": "Administrator",
    "location": "Dnipro",
    "photo": "/img/andriy-pereymybida.png",
    "login": "qwerty",
    "password": "1234"
}, {
    "groupId": "DP-093-JS",	
    "firstName": "Petr",
    "lastName": "Kucher",
    "role": "Administrator",
    "location": "Dnipro",
    "photo": "/img/peter_kucher.jpg",
    "login": "hello",
    "password": "1234"
}, {
    "groupId": "DP-094-MQC",
    "firstName": "Andriy",
    "lastName": "Pereymybida",
    "role": "Administrator",
    "location": "Lviv",
    "photo": "/img/andriy-pereymybida.png",
    "login": "admin",
    "password": "1234"
}]; 

expectedStudents = [{
    "groupId": "DP-093-JS",
    "firstName": "Kirill",
    "lastName": "Kozak",
    "role": "Administrator",
    "location": "Dnipro",
    "photo": "/img/andriy-pereymybida.png",
    "login": "qwerty",
    "password": "1234"
}, {
    "groupId": "DP-093-JS",	
    "firstName": "Petr",
    "lastName": "Kucher",
    "role": "Administrator",
    "location": "Dnipro",
    "photo": "/img/peter_kucher.jpg",
    "login": "hello",
    "password": "1234"
}];

groups =  [{
	"groupKey": "DP-093-JS",
    "name": "DP-093-JS",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "WebUI",
    "startDate": 1454284800,
    "finishDate": 1462060800,
    "teachers": ["D. Petin"],
    "experts": ["N. Varenko"],
    "stage": "in-process"
}, {
	"groupKey": "DP-094-MQC",
    "name": "DP-094-MQC",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "MQC",
    "startDate": 1461110400,
    "finishDate": 1466553600,
    "teachers": ["D. Petin"],
    "experts": ["I. Kohut"],
    "stage": "in-process"
}];   