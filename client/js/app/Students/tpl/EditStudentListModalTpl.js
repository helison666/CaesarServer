'use strict';
templates.editStudentListModalTpl = _.template([
    '<section class="modal-window modal_editStudentlist">',
        '<section class="form-inline form-wrapper container">',
            '<div class="header-modal-editStudentlist">',
                '<span>Student list</span>',
                '<button class = "fa fa-plus-square-o fa-4x createStudent"></button>',
                '<button class="csv-button fa fa-upload hidden"></button>',
                '<input name="uploadCSV" type="file" class="form-control uploadCSV hidden" accept=".csv,text/plain">',
            '</div>',
            '<table class="students_list">',
                '<thead>',
                    '<tr>',
                        '<th class="name">Name</th>',
                        '<th>Photo</th>',
                        '<th class="engLevel">English level</th>',
                        '<td></td>',
                        '<td></td>',
                        '<td></td>',
                    '</tr>',
                    '</thead>',
                '<tbody class="tableBodyStudents">',
                '</tdoby>',
            '</table>',

            '<button class="fa fa-chevron-right right" aria-hidden="true"></button>',
            '<button class = "fa fa-times-circle-o fa-3x btn-icon exit"></button>',
            
            '<% if (showConfirm) { %>',
                '<button class = "fa fa-check-circle-o fa-3x btn-icon save"></button>',
            '<% } %>',
        '</section>',
    '</section>'
].join(''));