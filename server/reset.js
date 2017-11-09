var defaultData = require('./defaults'),
    lock = require('./libs/lock'),
	patcher = require('./patcher'),
    mongodb = require('mongodb');

patcher.execute(function () {	
    console.log('\nDB reset:');
	reset(defaultData);
});

function reset (defaultInfo) {
    var data = defaultInfo;
    
    lock.reset(12).then(function () {
           process.exit();
    });
    
    resetTable('users', data.users);
    resetTable('groups', data.groups);
    resetTable('students', data.students);
    resetTable('groupSchedule', data.groupSchedule);
    resetTable('attachments', data.attachments);
    resetTable('locations', data.locations);
    resetTable('roles', data.roles);
    resetTable('directions', data.directions);
    resetTable('englishLevels', data.englishLevels);
    resetTable('rooms', data.rooms);
    resetTable('stages', data.stages);
    resetTable('contributors', data.contributors);

    getConnection('sessions', function (collection, db) {
        collection.remove({}, function (err, result) {
            db.close();
            lock.check();			
        });
    });			
	
	console.log('Done ♥');
}

function getConnection (name, callback) {
    var MongoClient = mongodb.MongoClient,
        url = 'mongodb://localhost:27017/caesar',
        collection;

    MongoClient.connect(url, function (err, db) {
        if (err !== null) {
            new Error('Connection problems !');
        } else {
            collection = db.collection(name);

            callback(collection, db);
        }
    });
}

function resetTable (nameCollection, defaultData) {
    getConnection(nameCollection, function (collection, db) {
        collection.remove({}, function (err, result) {
            collection.insert(defaultData, function (err, result) {
                    db.close();
                    lock.check();
                }
            );
        });
    });
}