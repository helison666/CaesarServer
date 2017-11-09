'use strict';
templates.oneEditStudentItemTpl = _.template([
    '<td name="studName"><%= lastName %> <%= name %></td>',
    '<% if (avatar) { %>',
        '<td><%= avatar %></td>',
    '<% } else { %>',
       '<td><img class="photo img-circle" src="/img/default-photo.png"/></td>',
    '<% } %>',
    '<td class = "english-level"><%= englishLevel %></td>',
    '<td class="iconca"><i class="fa fa-download download-attachments" aria-hidden="true" alt="" title="Download CV and Photo"></i></td>',
    '<td class="iconca"><i class="fa fa-cog fa-2x gear editStudent" src="" alt="" title="Edit"></i></td>',
    '<td class="iconca"><i class="fa fa-trash deleteStudent" aria-hidden="true" src="" alt="" title="Delete"></i></td>'
].join(''));