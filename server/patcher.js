'use strict';
var fs = require('fs'),
    filePath = '../node_modules/rotor-backbone/Controller.js';
	
function execute (callback) {
	console.log('Patching:');
	fixStatus200(fixStatus400, callback);		
}
	
function fixStatus200 (nextPacth, callback) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        var target = /statusOK: ''/, 	
	        replacement = 'statusOK: \'200\'',
            result;
		
        if (!err) {
	        result = data.replace(target, replacement);	        
		
            fs.writeFile(filePath, result, 'utf8', function (err) {
                if (err) {
     	            console.log(err);
	            } else {
					console.log('Updates inserted: 1/2');
					nextPacth(callback);	
				}
            });					
        } else {
	        console.log(err);
	    }   
    });
}

function fixStatus400 (callback) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        var target = /statusErr: ''/, 	
	        replacement = 'statusErr: \'400\'',
            result;
		
        if (!err) {
	        result = data.replace(target, replacement);	        
		
            fs.writeFile(filePath, result, 'utf8', function (err) {
                if (err) {
     	            console.log(err);
	            } else {
					console.log('Updates inserted: 2/2');
					callback();
				}
            });
			
			
        } else {
	        console.log(err);
	    }   
    });
}	

module.exports = {
	execute: execute
};
