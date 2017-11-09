templates.attachmentsItemTpl = _.template([
    '<p>',
        '<% if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "jpg" || ext === "tiff") { %>',
            '<a href="<%= url %>" download><img src="<%= url %>"/></a>',
        '<% } else { %>',
            '<a href="<%= url %>" download></a>',
        '<% } %>',

        '<span class="nameInfo hidden"><%= name %>.<%= ext %></span>',
    '</p>'
].join(''));