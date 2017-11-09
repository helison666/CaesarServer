var defaultData = {
    stages: [{
        "name": "boarding"
    }, {
        "name": "before-start"
    }, {
        "name": "in-process"
    }, {
        "name": "offering"
    }, {
        "name": "finished"
    }, {
        "name": "planned"
    }],    

    directions: [{
        "name": "WebUI"
    }, {
        "name": "JavaScript(UI)"
    }, {
        "name": "LAMP"
    }, {
        "name": ".Net"
    }, {
        "name": "iOS"
    }, {
        "name": "C/C++"
    }, {
        "name": "Delphi"
    },{
        "name": "Java"
    }, {
        "name": "RDBMS"
    }, {
        "name": "MQC"
    }, {
        "name": "ATQC"
    }, {
        "name": "ISTQB"
    }, {
        "name": "DevOps"
    }, {
        "name": "UX"
    }],


    roles: [{
        "name": "Teacher"
    }, {
        "name": "Coordinator"
    }, {
        "name": "Administrator"
    }],
	
	englishLevels: [{
	   "name": "Elementary"
	}, {
	   "name": "Pre-intermediate low"
	}, {
	   "name": "Pre-intermediate"
	}, {
	   "name": "Pre-intermediate strong"
	}, {
	   "name": "Intermediate low"
	}, {
	   "name": "Intermediate"
	}, {
	   "name": "Intermediate strong"
	}, {
	   "name": "Upper-intermediate low"
	}, {
	   "name": "Upper-intermediate"
	}, { 
	   "name": "Upper-intermediate strong"
	}, {   
	   "name": "Advanced"
	}],
    
    rooms: [{
        "location": "Dnipro",
        "numbers": ["745", "740"],
    },{
        "location": "Kyiv",
        "numbers": ["305", "300"],
    },{
         "location": "Sofia",
         "numbers": ["135", "132"],
    },{
        "location": "Chernivtsy",
        "numbers": ["248", "245"],
    },{
        "location": "Rivne",
        "numbers": ["358", "357"],
    },{
        "location": "Ivano-Frankivsk",
        "numbers": ["105", "108"],
    },{
        "location": "Lviv",
        "numbers": ["369", "368"]            
    }],

    users: [{
        "firstName": "Kirill",
        "lastName": "Kozak",
        "role": "Administrator",
        "location": "Dnipro",
        "photo": "/img/andriy-pereymybida.png",
        "login": "qwerty",
        "password": "1234"
    }, {
        "firstName": "Petr",
        "lastName": "Kucher",
        "role": "Administrator",
        "location": "Dnipro",
        "photo": "/img/peter_kucher.jpg",
        "login": "hello",
        "password": "1234"
    }, {
        "firstName": "Andriy",
        "lastName": "Pereymybida",
        "role": "Administrator",
        "location": "Lviv",
        "photo": "/img/andriy-pereymybida.png",
        "login": "admin",
        "password": "1234"
    }, {
        "firstName": "Dmytro",
        "lastName": "Petin",
        "role": "Coordinator",
        "location": "Dnipro",
        "photo": "/img/dmytro-petin.jpg",
        "login": "dmytro",
        "password": "1234"
    }, {
        "firstName": "Olexandr",
        "lastName": "Reuta",
        "role": "Teacher",
        "location": "Dnipro",
        "photo": "/img/olexander-reuta.png",
        "login": "sasha",
        "password": "1234"
    }, {
        "firstName": "Artur",
        "lastName": "Koval",
        "role": "Administrator",
        "location": "Dnipro",
        "photo": "/img/batman_icon.png",
        "login": "artur",
        "password": "1234"
    }],

    locations: [{
        "acronym": "Dp",
        "name": "Dnipro",
        "lastGroupNumber": 97
    }, {
        "acronym": "Kv",
        "name": "Kyiv",
        "lastGroupNumber": 99
    }, {
        "acronym": "Sf",
        "name": "Sofia",
        "lastGroupNumber": 89
    }, {
        "acronym": "Ch",
        "name": "Chernivtsy",
        "lastGroupNumber": 39
    }, {
        "acronym": "Rv",
        "name": "Rivne",
        "lastGroupNumber": 91
    }, {
        "acronym": "IF",
        "name": "Ivano-Frankivsk",
        "lastGroupNumber": 89
    }, {
        "acronym": "Lv",
        "name": "Lviv",
        "lastGroupNumber": 87
    }],

    groups: [{
        "name": "DP-093-JS",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": 1454284800,
        "finishDate": 1462060800,
        "teachers": ["D. Petin"],
        "experts": ["N. Varenko"],
        "stage": "in-process",
        "groupKey": "DP-093-JS"
    }, {
        "name": "DP-094-MQC",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "MQC",
        "startDate": 1461110400,
        "finishDate": 1466553600,
        "teachers": ["D. Petin"],
        "experts": ["I. Kohut"],
        "stage": "in-process",
        "groupKey": "DP-094-MQC"
    }, {
        "name": "DP-092-NET",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": ".Net",
        "startDate": 1455580800,
        "finishDate": 1462060800,
        "teachers": ["O. Reuta"],
        "experts": ["V. Koldovskyy"],
        "stage": "finished",
        "groupKey": "DP-092-NET"
    }, {
        "name": "Lv-087-RD",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "RDBMS",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["O. Krukchov"],
        "experts": ["A. Pertsov"],
        "stage": "finished",
        "groupKey": "Lv-087-RD"
    }, {
        "name": "Rv-091-LAMP",
        "location": "Rivne",
        "budgetOwner": "SoftServe",
        "direction": "LAMP",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["L. Klakovych"],
        "experts": ["N. Romanenko"],
        "stage": "in-process",
        "groupKey": "Rv-091-LAMP"
    }, {
        "name": "DP-095-JS",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "JavaScript(UI)",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["D. Petin"],
        "experts": ["N. Romanenko"],
        "stage": "boarding",
        "groupKey": "DP-095-JS"
    }, {
        "name": "DP-065-AQC",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "ATQC",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["D. Petin"],
        "experts": ["Testman"],
        "stage": "finished",
        "groupKey": "DP-065-AQC",
    }, {
        "name": "DP-027-JS",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["D. Petin", "I. Tsvietkov"],
        "experts": ["I. Tsvietkov"],
        "stage": "finished",
        "groupKey": "DP-027-JS",
    }, {
        "name": "DP-097-QC",
        "location": "Dnipro",
        "budgetOwner": "SoftServe",
        "direction": "MQC",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["D. Petin"],
        "experts": ["M. Omel`chuk"],
        "stage": "boarding",
        "groupKey": "DP-097-QC"
    }, {
        "name": "Lv-084-QB",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "ISTQB",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["I. Tsvietkov"],
        "experts": ["M. Omel`chuk"],
        "stage": "offering",
        "groupKey": "Lv-084-QB"
    }, {
        "name": "Lv-045-DL",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "Delphi",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["I. Tsvietkov"],
        "experts": ["M. Omel`chuk"],
        "stage": "in-process",
        "groupKey": "Lv-045-DL"
    }, {
        "name": "Lv-077-IOS",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "iOS",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["I. Tsvietkov", "M. Omel`chuk"],
        "experts": ["M. Omel`chuk"],
        "stage": "finished",
        "groupKey": "Lv-077-IOS"
    }, {
        "name": "Lv-023-UX",
        "location": "Lviv",
        "budgetOwner": "SoftServe",
        "direction": "UX",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process",
        "groupKey": "Lv-023-UX",
    }, {
        "name": "Sf-089-UX",
        "location": "Sofia",
        "budgetOwner": "SoftServe",
        "direction": "UX",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "boarding",
        "groupKey": "Sf-089-UX",
    }, {
        "name": "Sf-089-MQC",
        "location": "Sofia",
        "budgetOwner": "SoftServe",
        "direction": "MQC",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process",
        "groupKey": "Sf-089-MQC"
    }, {
        "name": "Sf-089-JS",
        "location": "Sofia",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "finished",
        "groupKey": "Sf-089-JS"
    }, {
        "name": "IF-089-JS",
        "location": "Ivano-Frankivsk",
        "budgetOwner": "SoftServe",
        "direction": "WebUI",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process",
        "groupKey": "IF-089-JS"
    }, {
        "name": "Kv-099-LAMP",
        "location": "Kyiv",
        "budgetOwner": "SoftServe",
        "direction": "LAMP",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process",
        "groupKey": "Kv-099-LAMP"
    }, {
        "name": "Ch-039-IOS",
        "location": "Chernivtsy",
        "budgetOwner": "SoftServe",
        "direction": "iOS",
        "startDate": 1455494400,
        "finishDate": 1462060800,
        "teachers": ["A. Korkuna"],
        "experts": ["I. Tsvietkov"],
        "stage": "in-process",
        "groupKey": "Ch-039-IOS"
    }],

	students: [{
		"groupId": "DP-093-JS",
		"name": "Vladyslava",
		"lastName": "Tyschenko",
        "avatar": "",
		"englishLevel": "Upper-intermediate",
		"CvUrl": "",
		"imageUrl": "",
        "incomingScore": "140",
		"entryScore": "4.5",
		"approvedBy": "N. Varenko"
	}, {
		"groupId": "DP-093-JS",
		"name": "Denys",
		"lastName": "Poznukhov",
        "avatar": "",
		"englishLevel": "Intermediate strong",
		"CvUrl": "",
		"imageUrl": "",
        "incomingScore": "45",
		"entryScore": "40",
		"approvedBy": "N. Varenko"
	}, {
        "groupId": "DP-093-JS",
        "name": "Vasiliy",
        "lastName": "Pupkin",
        "avatar": "",
        "englishLevel": "Elementary",
        "CvUrl": "",
        "imageUrl": "",
        "incomingScore": "95",
        "entryScore": "140",
        "approvedBy": "N. Varenko"
    }, {
        "groupId": "DP-093-JS",
        "name": "Petya",
        "lastName": "Ivanov",
        "avatar": "",
        "englishLevel": "Advanced",
        "CvUrl": "",
        "imageUrl": "",
        "incomingScore": "106",
        "entryScore": "120",
        "approvedBy": "N. Varenko"
    }, {
        "groupId": "DP-094-MQC",
        "name": "John",
        "lastName": "Smith",
        "avatar": "",
        "englishLevel": "Advanced",
        "CvUrl": "",
        "imageUrl": "",
        "incomingScore": "150",
        "entryScore": "125",
        "approvedBy": "N. Varenko"
    }, {
        "groupId": "DP-094-MQC",
        "name": "Carolina",
        "lastName": "Reaper",
        "avatar": "",
        "englishLevel": "Intermediate strong",
        "CvUrl": "",
        "imageUrl": "",
        "incomingScore": "60",
        "entryScore": "85",
        "approvedBy": "N. Varenko"
    }, {
        "groupId": "Lv-084-QB",
        "name": "David",
        "lastName": "Taylor",
        "avatar": "",
        "englishLevel": "Intermediate",
        "CvUrl": "",
        "imageUrl": "",
        "incomingScore": "75",
        "entryScore": "100",
        "approvedBy": "N. Varenko"
    }, {
        "groupId": "Lv-084-QB",
        "name": "Fox",
        "lastName": "Robinson",
        "avatar": "",
        "englishLevel": "Upper-intermediate",
        "CvUrl": "",
        "imageUrl": "",
        "incomingScore": "95",
        "entryScore": "115",
        "approvedBy": "N. Varenko"
    }, {
        "groupId": "Lv-045-DL",
        "name": "Frank",
        "lastName": "Martin",
        "avatar": "",
        "englishLevel": "Elementary",
        "CvUrl": "",
        "imageUrl": "",
        "incomingScore": "60",
        "entryScore": "90",
        "approvedBy": "N. Varenko"
    }, {
        "groupId": "Lv-045-DL",
        "name": "Grey",
        "lastName": "Cooper",
        "avatar": "",
        "englishLevel": "Upper-intermediate strong",
        "CvUrl": "",
        "imageUrl": "",
        "incomingScore": "85",
        "entryScore": "110",
        "approvedBy": "N. Varenko"
    }],
	
    contributors: [{
        "nickname": "Team Doloto",
        "name": "Dp-080-UI",
        "logo": "/img/TeamDoloto/logoTeamDoloto.jpg",
        "direction": "Development & Research",
        "people": {
            "Karina Chegorko": "/img/TeamDoloto/Chegorko.jpg",
            "Alena Borysova": "/img/TeamDoloto/Borysova.jpg",
            "Serhii Andronik": "/img/TeamDoloto/Andronik.jpg",
            "Ivan Shytikov": "/img/TeamDoloto/Shytikov.jpg",
            "Dmytro Selezen": "/img/TeamDoloto/Selezen.jpg",
            "Maksim Belinskiy": "/img/TeamDoloto/Belinskiy.jpg",
            "Aleksei Lebedianskyi": "/img/TeamDoloto/Lebedianskyi.jpg"
        }
    }, {
        "nickname": "The Light side",
        "name": "Dp-082-MQC",
        "logo": "/img/TheLightSide/logoTheLightSide.jpg",
        "direction": "Quality Assurance",
        "people": {
            "Artur Chesnokov": "/img/TheLightSide/Chesnokov.jpg",
            "Sergey Tsova": "/img/TheLightSide/Tsova.jpg",
            "Kateryna Bekesh": "/img/TheLightSide/Bekesh.jpg",
            "Mihail Makarenko": "/img/TheLightSide/Makarenko.jpg",
            "Alona Krutin": "/img/TheLightSide/Krutin.jpg"
        }
    }, {
        "nickname": "Fluffy Dots",
        "name": "Dp-088-MQC",
        "logo": "/img/FluffyDots/logoFluffyDots.png",
        "direction": "Quality Assurance",
        "people": {
            "Liliia Krivsun": "/img/FluffyDots/Krivsun.jpg",
            "Anton Fanygin": "/img/FluffyDots/Fanygin.jpg",
            "Svetlana Shylnenkova": "/img/FluffyDots/Shylnenkova.jpg",
            "Ihor Zhuhan": "/img/FluffyDots/Zhuhan.jpg",
            "Anastasiia Petina": "/img/FluffyDots/Petina.jpg",
            "Oleksandra Pervunina": "/img/FluffyDots/Pervunina.jpg",
            "Mariia Ananchenko": "/img/FluffyDots/Ananchenko.jpg"
        }
    }, {
        "nickname": "Floppy-Drive 8",
        "name": "Dp-09-JS",
        "logo": "/img/Floppy-Drive-8/logo-floppy-drive-8.png",
        "direction": "Development & Research",
        "people": {
            "Vladyslava Tyschenko": "/img/Floppy-Drive-8/Tyschenko.jpg",
            "Anastasyia Serheeva": "/img/Floppy-Drive-8/Serheeva.jpg",
            "Anna Hranovs'ka": "/img/Floppy-Drive-8/Hranovs'ka.jpg",
            "Yuryi Tataryntsev": "/img/Floppy-Drive-8/Tataryntsev.jpg",
            "Artem Zhylko": "/img/Floppy-Drive-8/Zhylko.jpg",
            "Anastasiia Manil'nykova": "/img/Floppy-Drive-8/Manil'nykova.jpg",
            "Denys Poznukhov": "/img/Floppy-Drive-8/Poznukhov.jpg",
            "Yana Sharipbaeva": "/img/Floppy-Drive-8/Sharipbaeva.jpg"
        }
    }, {
        "nickname": "Fix Machine",
        "name": "Dp-099-JS",
        "logo": "/img/Fix-Machine/logo.jpg",
        "direction": "Development & Research",
        "people": {
            "Anastasyia Kolomoiets": "/img/Fix-Machine/Nastya.jpg",
            "Chung Alpha Manfoumbi": "/img/Fix-Machine/Alpha.jpg",
            "Artur Koval": "/img/Fix-Machine/Artur.jpg",
            "Kirill Kozak": "/img/Fix-Machine/Kirill.jpg",
            "Dmitriy Pavlovski": "/img/Fix-Machine/Dima.jpg",
            "Petr Kucher": "/img/Fix-Machine/peter.jpg"
        }
    }, {
        "nickname": "Charming Chaos",
        "name": "Dp-094-MQC",
        "logo": "/img/CharmingChaos/logoCharmingChaos.jpg",
        "direction": "Quality Assurance",
        "people": {
            "Elena Kulynenkova": "/img/CharmingChaos/Kulynenkova.jpg",
            "Lylyia Babenko": "/img/CharmingChaos/Babenko.jpg",
            "Valeryia Rusynko": "/img/CharmingChaos/Rusynko.jpg",
            "Oksana Shyrman": "/img/CharmingChaos/Shyrman.jpg",
            "Kateryna Buzykina": "/img/CharmingChaos/Buzykina.jpg",
            "Olena Petrusha": "/img/CharmingChaos/Petrusha.jpg"
        }
    }],

    groupSchedule: [{
        "groupKey": "DP-093-JS",
        "groupName": "DP-093-JS",
        "keyDates": {
            "start": "09/05/2016",
            "demo1": "09/26/2016",
            "demo2": "10/17/2016",
            "offering": "10/31/2016",
            "finish": "11/28/2016"
        },
       "weeks": {
            "04252016": {
                "monday": [
                {
                    "title": "JS Practice",
                    "teacher": "D. Petin",
                    "startTime": "09:00",
                    "duration": "2",
                    "room": "305"
                }],
                "tuesday": [
                {
                    "title": "Node.js Lecture",
                    "teacher": "D. Petin",
                    "startTime": "09:30",
                    "duration": "2",
                    "room": "305"
                }],
                "wednesday": [
                {
                    "title": "Expert Meeting",
                    "teacher": "N. Varenko",
                    "startTime": "10:00",
                    "duration": "2",
                    "room": "309" 
                }],
                "thursday": [
                {
                    "title": "Weekly Report",
                    "teacher": "D. Petin",
                    "startTime": "10:00",
                    "duration": "1",
                    "room": "309" 
                }],
                "friday": [
                {
                    "title": "Weekly Report",
                    "teacher": "D. Petin",
                    "startTime": "10:30",
                    "duration": "1",
                    "room": "309"
                }] 
            },
             "11212016": {
                "monday": [
                {
                    "title": "JS Practice",
                    "teacher": "D. Petin",
                    "startTime": "09:00",
                    "duration": "2",
                    "room": "305"
                }],
                "tuesday": [
                {
                    "title": "Node.js Lecture",
                    "teacher": "D. Petin",
                    "startTime": "09:30",
                    "duration": "2",
                    "room": "305"
                }],
                "wednesday": [
                {
                    "title": "Expert Meeting",
                    "teacher": "N. Varenko",
                    "startTime": "10:00",
                    "duration": "2",
                    "room": "309" 
                }],
                "thursday": [
                {
                    "title": "Weekly Report",
                    "teacher": "D. Petin",
                    "startTime": "10:00",
                    "duration": "1",
                    "room": "309" 
                }],
                "friday": [
                {
                    "title": "Weekly Report",
                    "teacher": "D. Petin",
                    "startTime": "10:30",
                    "duration": "1",
                    "room": "309"
                }] 
            }
        }
    },
    {
        "groupKey": "DP-094-MQC",
        "groupName": "DP-094-MQC",
        "keyDates": {
            "start": "02/01/2016",
            "demo1": "02/22/2016",
            "demo2": "03/14/2016",
            "offering": "04/04/2016",
            "finish": "04/25/2016"
        },
       "weeks": {
            "04252016": {
                "monday": [
                {
                    "title": "MQC Practice",
                    "teacher": "D. Petin",
                    "startTime": "09:00",
                    "duration": "2",
                    "room": "305"
                }],
                "tuesday": [
                {
                    "title": "MQC Lecture",
                    "teacher": "D. Petin",
                    "startTime": "09:30",
                    "duration": "2",
                    "room": "305"
                }],
                "wednesday": [
                {
                    "title": "Expert Meeting",
                    "teacher": "N. Varenko",
                    "startTime": "10:00",
                    "duration": "2",
                    "room": "309" 
                }],
                "thursday": [
                {
                    "title": "Weekly Report",
                    "teacher": "D. Petin",
                    "startTime": "09:00",
                    "duration": "1",
                    "room": "309" 
                }],
                "friday": [
                {
                    "title": "Weekly Report",
                    "teacher": "D. Petin",
                    "startTime": "09:30",
                    "duration": "1",
                    "room": "309"
                }] 
            },
            "11212016": {
                "monday": [
                {
                    "title": "MQC Practice",
                    "teacher": "D. Petin",
                    "startTime": "09:00",
                    "duration": "2",
                    "room": "305"
                }],
                "tuesday": [
                {
                    "title": "MQC Lecture",
                    "teacher": "D. Petin",
                    "startTime": "09:30",
                    "duration": "2",
                    "room": "305"
                }],
                "wednesday": [
                {
                    "title": "Expert Meeting",
                    "teacher": "N. Varenko",
                    "startTime": "10:00",
                    "duration": "2",
                    "room": "309" 
                }],
                "thursday": [
                {
                    "title": "Weekly Report",
                    "teacher": "D. Petin",
                    "startTime": "09:00",
                    "duration": "1",
                    "room": "309" 
                }],
                "friday": [
                {
                    "title": "Weekly Report",
                    "teacher": "D. Petin",
                    "startTime": "09:30",
                    "duration": "1",
                    "room": "309"
                }] 
            }
        }
    },    
    {
        "groupKey": "Ch-039-IOS",
        "groupName": "Ch-039-IOS",
            "keyDates": {
                "start": "02/01/2016",
                "demo1": "02/22/2016",
                "demo2": "03/14/2016",
                "offering": "04/04/2016",
                "finish": "04/25/2016"
            },
           "weeks": {
                "04252016": {
                    "monday": [
                    {
                        "title": " Practice",
                        "teacher": "D. Petin",
                        "startTime": "11:00",
                        "duration": "2",
                        "room": "305"
                    }],
                    "tuesday": [
                    {
                        "title": "IOS Lecture",
                        "teacher": "D. Petin",
                        "startTime": "11:30",
                        "duration": "2",
                        "room": "305"
                    }],
                    "wednesday": [
                    {
                        "title": "Expert Meeting",
                        "teacher": "N. Varenko",
                        "startTime": "12:00",
                        "duration": "2",
                        "room": "309" 
                    }],
                    "thursday": [
                    {
                        "title": "Weekly Report",
                        "teacher": "D. Petin",
                        "startTime": "13:00",
                        "duration": "1",
                        "room": "309" 
                    }],
                    "friday": [
                    {
                        "title": "Weekly Report",
                        "teacher": "D. Petin",
                        "startTime": "13:30",
                        "duration": "1",
                        "room": "309"
                    }] 
                },
                "11212016": {
                    "monday": [
                    {
                        "title": " Practice",
                        "teacher": "D. Petin",
                        "startTime": "11:00",
                        "duration": "2",
                        "room": "305"
                    }],
                    "tuesday": [
                    {
                        "title": "IOS Lecture",
                        "teacher": "D. Petin",
                        "startTime": "11:30",
                        "duration": "2",
                        "room": "305"
                    }],
                    "wednesday": [
                    {
                        "title": "Expert Meeting",
                        "teacher": "N. Varenko",
                        "startTime": "12:00",
                        "duration": "2",
                        "room": "309" 
                    }],
                    "thursday": [
                    {
                        "title": "Weekly Report",
                        "teacher": "D. Petin",
                        "startTime": "13:00",
                        "duration": "1",
                        "room": "309" 
                    }],
                    "friday": [
                    {
                        "title": "Weekly Report",
                        "teacher": "D. Petin",
                        "startTime": "13:30",
                        "duration": "1",
                        "room": "309"
                    }] 
                }
            }    
    }],

    attachments: [{
        "key": "Tyschenko Vladyslava",
        cv: [{
            "name": "cv1",
            "ext": "docx",
            "url": "/supplements/cv/cv1.docx"
        }],
        photo: [{
            "name": "photo1",
            "ext": "jpg",
            "url": "/supplements/photo/photo1.jpg"
        }]
    }, {
        "key": "Poznukhov Denys",
        cv: [],
        photo: [{
            "name": "photo2",
            "ext": "jpg",
            "url": "/supplements/photo/photo2.jpg"
        }]
    }, {
        "key": "Pupkin Vasiliy",
        cv: [],
        photo: [{
            "name": "photo3",
            "ext": "jpg",
            "url": "/supplements/photo/photo3.jpg"
        }]
    }, {
        "key": "Ivanov Petya",
        cv: [],
        photo: [{
            "name": "photo4",
            "ext": "jpg",
            "url": "/supplements/photo/photo4.jpg"
        }]
    }]
};

module.exports = defaultData;