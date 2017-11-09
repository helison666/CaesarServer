'use strict';
templates.CopyPasteViewTpl = _.template([
    '<ul class="column-copy-paste">',
        '<li class="copy-paste-item">',
            '<input type="button" title="Background Image" class="paste-schedule"/>',   
        '</li>',
        '<li class="copy-paste-item">',
            '<input type="button" title="Background Image" class="copy-this-schedule"/>', 
        '</li>',
        '<li class="copy-paste-item">',
            '<input type="button" title="Background Image" class="copy-next-week"/>', 
        '</li>', 
        '<li class="copy-paste-item">',
            '<input type="button" title="Background Image" class="copy-to-end"/>', 
        '</li>',                           
    '</ul>',
].join(''));