templates.studentsListViewTpl = _.template([
    '<thead>',
        '<tr>',
            '<th class="fullName">Name</th>',
            '<th class="photo">Photo</th>',
            '<th class="englishLevel">English level</th>',
            '<th class="incomingTest">Incoming Test</th>',
            '<th class="entryScore">Entry score</th>',
            '<th class="approvedBy">Approved by</th>',
        '</tr>',
    '</thead>'
].join(''));