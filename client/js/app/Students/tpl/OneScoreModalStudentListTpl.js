templates.oneScoreModalStudentListTpl = _.template([
    '<td name="studName"><%= lastName %> <%= name %></td>',
    '<% if (avatar) { %>',
        '<td><%= avatar %></td>',
    '<% } else { %>',
        '<td><img class="photo img-circle" src="/img/default-photo.png"/></td>',
    '<% } %>',
    '<td><%= incomingScore %></td>',
    '<td><%= entryScore %></td>',
    '<td><%= approvedBy %></td>'
].join(''));