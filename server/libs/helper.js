'use strict';

var _ = require('underscore'),
	fs = require('fs');

function Helpers () {}

_.extend(Helpers.prototype, {
	sendFile: function (response, contentType, filePath, request, callback) {
	    fs.stat(filePath, function (err, stats) {
	        if (stats) {
	            fs.readFile(filePath, function(error, data) {
	                if (error) {
	                    response.writeHead(500);
	                    response.end();
	                } else {
	                    response.writeHead(200, {'Content-Type': contentType});
	                    response.write(data);
	                    response.end();
	                }
	            });
	        } else {
	        	if (callback) {
	        		callback(request, response, 'index')
	        	}
			}
	    });
	},

    saveFile: function (response, contentType, filePath, request, callback) {
        var body = '';

        request.on('data', function (chunk) {
            body += chunk;
        });

        request.on('end', function () {
            var imageBuffer = decodeBase64Image(body);

            fs.writeFile(filePath, imageBuffer.data, function(error, data) {
                if (error) {
                    throw error; 
                }

                response.end('File is saved');
            });
        });

        function decodeBase64Image(dataString) {
            var matches = dataString.match(/^data:([A-Za-z-+\/\.]+);base64,(.+)$/),
                response = {};

            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }

            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');

            return response;
        }
    },

    deleteFile: function (response, contentType, filePath, request, callback) {
        fs.stat(filePath, function(err, fileStat) {
            if (err) {
                if (err.code == 'ENOENT') {
                    console.log(error);
                }
            } else {
                if (fileStat.isFile()) {
                    fs.unlink(filePath, function (err) {
                        if (err) throw err;
                        response.end('Deletion sucessful.');
                    });
                }
            }
        });
    }
});

module.exports = new Helpers();