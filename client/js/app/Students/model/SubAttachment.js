'use strict';

(function (This) {
    This.SubAttachment = Backbone.Model.extend({
        defaults: function () {
            return {
                key: '',
                cv: [],
                photo: [],

                files: {
                    cv: [],
                    photo: []
                }
            };
        },

        initialize: function () {
            this.exist = false;
        },

        initExistant: function (obj) {
            this.set({
                key: obj.key,
                cv: obj.cv,
                photo: obj.photo
            });

            this.set({
                delayDeleteCV: [],
                delayDeletePhoto: []
            });

            this.exist = true;
        },

        saveCVFile: function (file) {
            var ext = file.name.slice(file.name.lastIndexOf('.') + 1),
                allowed = 'doc,docx,pdf,rtf';

            if (file.size <= 5e6 && allowed.indexOf(ext) > -1) {
                var name = this.setCVName(file),
                    URL = '/supplements/cv/' + name + '.' + ext;

                this.get('files').cv.push({'file': file, url: URL});
                this.saveCVModel(name, ext, URL);

                return true;
            } else {
                return false;
            }
        },

        savePhotoFile: function (file) {
            var ext = file.name.slice(file.name.lastIndexOf('.') + 1),
                allowed = 'jpeg,jpg,png,tiff';

            if (file.size <= 5e6 && allowed.indexOf(ext) > -1) {
                var name = this.setPhotoName(file),
                    URL = '/supplements/photo/' + name + '.' + ext;

                this.get('files').photo.push({'file': file, url: URL});
                this.savePhotoModel(name, ext, URL);

                return true;
            } else {
                return false;
            }
        },

        setCVName: function (file) {
            var name = file.name.slice(0, file.name.lastIndexOf('.')),
                pattern = /\((.)\)/,
                number, result;

            if (store.attachments.isCVExist(name)) {
                name = name + '(1)';
            }

            while (store.attachments.isCVExist(name)) {
                result = name.match(pattern);
                number = result[1];
                number++;

                name = name.slice(0, name.indexOf('(')) + '(' + number + ')';
            }

            return name;
        },

        setPhotoName: function (file) {
            var name = file.name.slice(0, file.name.lastIndexOf('.')),
                pattern = /\((.)\)/,
                number, result;

            if (store.attachments.isPhotoExist(name)) {
                name = name + '(1)';
            }

            while (store.attachments.isPhotoExist(name)) {
                result = name.match(pattern);
                number = result[1];
                number++;

                name = name.slice(0, name.indexOf('(')) + '(' + number + ')';
            }

            return name;
        },

        saveCVModel: function (_name, _ext, _url) {
            this.get('cv').push({
                name: _name,
                url: _url,
                ext: _ext
            });
        },

        savePhotoModel: function (_name, _ext, _url) {
            this.get('photo').push({
                name: _name,
                url: _url,
                ext: _ext
            });
        },

        delayDeleteCV: function (name) {
            this.get('delayDeleteCV').push(name);
        },

        delayDeletePhoto: function (name) {
            this.get('delayDeletePhoto').push(name);
        },

        deleteCV: function (name) {
            var fileNotFound = true,
                url;

            this.get('cv').forEach(function (cv, i) {
                if (cv.name + '.' + cv.ext === name) {
                    this.get('cv').splice(i, 1);
                    url = cv.url;
                }
            }, this);
            this.get('files').cv.forEach(function (cv, i) {
                if(cv.file.name === name) {
                    this.get('files').cv.splice(i, 1);
                    fileNotFound = false;
                }
            }, this);

            if (fileNotFound && url) {
                this.deleteFromServer(url);
            }
        },

        deletePhoto: function (name) {
            var fileNotFound = true,
                url;

            this.get('photo').forEach(function (photo, i) {
                if (photo.name + '.' + photo.ext === name) {
                    this.get('photo').splice(i, 1);
                    url = photo.url;
                }
            }, this);
            this.get('files').photo.forEach(function (photo, i) {
                if(photo.name === name) {
                    this.get('files').photo.splice(i, 1);
                    fileNotFound = false;
                }
            }, this);

            if (fileNotFound && url) {
                this.deleteFromServer(url);
            }
        },

        sendToServer: function () {
            this.get('files').cv.forEach(function (cv) {
                send(cv.file, cv.url);
            }, this);

            this.get('files').photo.forEach(function (photo) {
                send(photo.file, photo.url);
            }, this);

            function send (file, _url) {
                var reader = new FileReader();

                reader.readAsDataURL(file);

                reader.addEventListener('loadend', sendFile, false);

                function sendFile (e) {
                    $.ajax({
                        url: _url,
                        data: e.target.result,
                        type: "PUT",
                        success: function (data) {
                            //console.log('saved');
                        },
                        error: function (xhr, status, error) {
                            console.log(error + status);
                        }
                    });
                }
            }
        },

        deleteFromServer: function (_url) {
            $.ajax({
                url: _url,
                type: "DELETE",
                success: function (data) {
                    //console.log(data);
                },
                error: function (xhr, status, error) {
                    console.log(error + status);
                }
            });
        },

        saveToDataBase: function(lastName, name) {
            this.set({key: lastName + ' ' + name});

            store.attachments.create({
                key: this.get('key'),
                cv: this.get('cv'),
                photo: this.get('photo')
            });
        },

        deleteTrigger: function () {
            if (this.exist) {
                this.get('delayDeleteCV').forEach(function (delName) {
                    this.deleteCV(delName);
                }, this);

                this.get('delayDeletePhoto').forEach(function (delName) {
                    this.deletePhoto(delName);
                }, this);
            }
        }
    });
})(CS.Students);