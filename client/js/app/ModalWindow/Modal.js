'use strict';
(function (This, app) {
    This.Modal = function (){
        var modalEl = $('#modal-window');

        this.fill =  function(view) {
            modalEl.append(view);
        };
        
        return this;
    }
})(CS, app);