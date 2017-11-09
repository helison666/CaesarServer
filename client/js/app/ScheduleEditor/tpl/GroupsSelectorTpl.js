templates.groupsSelector = _.template([
    '<div class="editGroup-wrapper">',
        '<div>',
            '<ul>',
            '</ul>',
            '<div class="editGroup-buttons">',
                '<button class="save disabled" disabled>',
                    '<i class="fa fa-check-circle-o fa-3x"></i>',
                '</button>',
                '<button class="cancel">',
                    '<i class="fa fa-times-circle-o fa-3x"></i>',
                '</button>',
            '</div>',
        '</div>',
    '</div>'
].join(''));