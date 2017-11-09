'use strict';
templates.scheduleEditorTpl = _.template([
    '<section class="modal-window modal_editSchedule">',
'       <section class="form-inline form-wrapper container">',
            '<div class="header-modal-editSchedule">',
                '<span><%= name %></span>',
            '</div>',
            '<div class="content-modal-editSchedule">',
                '<div class="resourceView"></div>',
                '<div class="eventsView"></div>',
                '<div class="weekView"></div>',
                '<div class="copyPastView"></div>',
            '</div>',
            '<div class="text-center button-group">',
'               <span class="fa fa-check-circle-o fa-3x btn-icon" id="save"  tabindex="19"></span>',
'               <span class="fa fa-times-circle-o fa-3x btn-icon" id="cancel"  tabindex="20"></span></div>',
'           </div>',
'       </section>',
    '</section>'
].join(''));