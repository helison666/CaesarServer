templates.weekViewTpl = _.template([
    '<div class="Table schedule-editor">',
        '<div class="Title"></div>',
        '<div class="Heading">',
            '<div class="Cell null"></div>',
            '<div class="Cell monday">Monday',
                '<div class="number-week-wrapper">',
                    '<span class="number-week month"></span>',
                    '<span class="number-week">/</span>',
                    '<span class="number-week day"></span>',
                '</div>',
            '</div>',
            '<div class="Cell tuesday">Tuesday',
                '<div class="number-week-wrapper">',
                    '<span class="number-week month"></span>',
                    '<span class="number-week">/</span>',
                    '<span class="number-week day"></span>',
                '</div>',
            '</div>',
            '<div class="Cell wednesday">Wednesday',
                '<div class="number-week-wrapper">',
                    '<span class="number-week month"></span>',
                    '<span class="number-week">/</span>',
                    '<span class="number-week day"></span>',
                '</div>',
            '</div>',
            '<div class="Cell thursday">Thursday',
                '<div class="number-week-wrapper">',
                    '<span class="number-week month"></span>',
                    '<span class="number-week">/</span>',
                    '<span class="number-week day"></span>',
                '</div>',
            '</div>',
            '<div class="Cell friday">Friday',
                '<div class="number-week-wrapper">',
                    '<span class="number-week month"></span>',
                    '<span class="number-week">/</span>',
                    '<span class="number-week day"></span>',
                '</div>',
            '</div>',
        '</div>',
        '<div class="Row nine">',
            '<div class="HeadingCell">9:00</div>',
            '<div class="Cell" data-time="09:00" data-day="monday"></div>',
            '<div class="Cell" data-time="09:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="09:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="09:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="09:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row nine-half">',
            '<div class="HeadingCell">9:30</div>',
            '<div class="Cell" data-time="09:30" data-day="monday"></div>',
            '<div class="Cell" data-time="09:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="09:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="09:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="09:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row ten">',
            '<div class="HeadingCell">10:00</div>',
            '<div class="Cell" data-time="10:00" data-day="monday"></div>',
            '<div class="Cell" data-time="10:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="10:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="10:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="10:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row ten-half">',
            '<div class="HeadingCell">10:30</div>',
            '<div class="Cell" data-time="10:30" data-day="monday"></div>',
            '<div class="Cell" data-time="10:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="10:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="10:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="10:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row eleven">',
            '<div class="HeadingCell">11:00</div>',
            '<div class="Cell" data-time="11:00" data-day="monday"></div>',
            '<div class="Cell" data-time="11:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="11:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="11:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="11:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row eleven-half">',
            '<div class="HeadingCell">11:30</div>',
            '<div class="Cell" data-time="11:30" data-day="monday"></div>',
            '<div class="Cell" data-time="11:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="11:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="11:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="11:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row twelve">',
            '<div class="HeadingCell">12:00</div>',
            '<div class="Cell" data-time="12:00" data-day="monday"></div>',
            '<div class="Cell" data-time="12:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="12:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="12:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="12:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row twelve-half">',
            '<div class="HeadingCell">12:30</div>',
            '<div class="Cell" data-time="12:30" data-day="monday"></div>',
            '<div class="Cell" data-time="12:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="12:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="12:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="12:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row thirteen">',
            '<div class="HeadingCell">13:00</div>',
            '<div class="Cell" data-time="13:00" data-day="monday"></div>',
            '<div class="Cell" data-time="13:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="13:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="13:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="13:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row thirteen-half">',
            '<div class="HeadingCell">13:30</div>',
            '<div class="Cell" data-time="13:30" data-day="monday"></div>',
            '<div class="Cell" data-time="13:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="13:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="13:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="13:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row fourteen">',
            '<div class="HeadingCell">14:00</div>',
            '<div class="Cell" data-time="14:00" data-day="monday"></div>',
            '<div class="Cell" data-time="14:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="14:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="14:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="14:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row fourteen-half">',
            '<div class="HeadingCell">14:30</div>',
            '<div class="Cell" data-time="14:30" data-day="monday"></div>',
            '<div class="Cell" data-time="14:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="14:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="14:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="14:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row fifteen">',
            '<div class="HeadingCell">15:00</div>',
            '<div class="Cell" data-time="15:00" data-day="monday"></div>',
            '<div class="Cell" data-time="15:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="15:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="15:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="15:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row fifteen-half">',
            '<div class="HeadingCell">15:30</div>',
            '<div class="Cell" data-time="15:30" data-day="monday"></div>',
            '<div class="Cell" data-time="15:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="15:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="15:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="15:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row sixteen">',
            '<div class="HeadingCell">16:00</div>',
            '<div class="Cell" data-time="16:00" data-day="monday"></div>',
            '<div class="Cell" data-time="16:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="16:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="16:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="16:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row sixteen-half">',
            '<div class="HeadingCell">16:30</div>',
            '<div class="Cell" data-time="16:30" data-day="monday"></div>',
            '<div class="Cell" data-time="16:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="16:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="16:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="16:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row seventeen">',
            '<div class="HeadingCell">17:00</div>',
            '<div class="Cell" data-time="17:00" data-day="monday"></div>',
            '<div class="Cell" data-time="17:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="17:00 data-day="wednesday"></div>',
            '<div class="Cell" data-time="17:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="17:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row seventeen-half">',
            '<div class="HeadingCell">17:30</div>',
            '<div class="Cell" data-time="17:30" data-day="monday"></div>',
            '<div class="Cell" data-time="17:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="17:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="17:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="17:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row eighteen">',
            '<div class="HeadingCell">18:00</div>',
            '<div class="Cell" data-time="18:00" data-day="monday"></div>',
            '<div class="Cell" data-time="18:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="18:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="18:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="18:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row eighteen-half">',
            '<div class="HeadingCell">18:30</div>',
            '<div class="Cell" data-time="18:30" data-day="monday"></div>',
            '<div class="Cell" data-time="18:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="18:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="18:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="18:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row nineteen">',
            '<div class="HeadingCell">19:00</div>',
            '<div class="Cell" data-time="19:00" data-day="monday"></div>',
            '<div class="Cell" data-time="19:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="19:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="19:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="19:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row nineteen-half">',
            '<div class="HeadingCell">19:30</div>',
            '<div class="Cell" data-time="19:30" data-day="monday"></div>',
            '<div class="Cell" data-time="19:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="19:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="19:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="19:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row twenty">',
            '<div class="HeadingCell">20:00</div>',
            '<div class="Cell" data-time="20:00" data-day="monday"></div>',
            '<div class="Cell" data-time="20:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="20:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="20:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="20:00" data-day="friday"></div>',
        '</div>',
        '<div class="Row twenty-half">',
            '<div class="HeadingCell">20:30</div>',
            '<div class="Cell" data-time="20:30" data-day="monday"></div>',
            '<div class="Cell" data-time="20:30" data-day="tuesday"></div>',
            '<div class="Cell" data-time="20:30" data-day="wednesday"></div>',
            '<div class="Cell" data-time="20:30" data-day="thursday"></div>',
            '<div class="Cell" data-time="20:30" data-day="friday"></div>',
        '</div>',
        '<div class="Row twenty-one">',
            '<div class="HeadingCell">21:00</div>',
            '<div class="Cell" data-time="21:00" data-day="monday"></div>',
            '<div class="Cell" data-time="21:00" data-day="tuesday"></div>',
            '<div class="Cell" data-time="21:00" data-day="wednesday"></div>',
            '<div class="Cell" data-time="21:00" data-day="thursday"></div>',
            '<div class="Cell" data-time="21:00" data-day="friday"></div>',
        '</div>',
    '</div>'
].join(''));