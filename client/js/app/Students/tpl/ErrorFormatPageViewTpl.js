templates.errorFormatPageViewTpl = _.template([
    '<div class="modal-body">',
        '<div class="message-body">',
            '<p>Sorry, you should use only allowed file types:  doc, docx, pdf or rtf for CV and jpg, jpeg, tiff or png for photo.</p>',
            '<div class="editGroup-buttons">',
                '<button class="save">',
                    '<i class="fa fa-check-circle-o fa-3x"></i>',
                '</button>',
            '</div>',
        '</div>',
    '</div>'
].join(''));