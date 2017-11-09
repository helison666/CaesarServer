'use strict';
var ActivePage = (function () {
    var description = '';

    function _setDescription (_description) {
         description = _description; 
    }

    function _getDescription () {
        return description; 
    }

    return {
    	setDescription: _setDescription,
        getDescription: _getDescription
    };
})();
 