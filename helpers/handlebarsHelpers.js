const moment    = require('moment')

module.exports = {
    genDate: function(date, format) {
        return moment(date).format(format)
    },
    
    offsetIndex: function (index) {
        return parseInt(index + 1)
    },

    select: function(selected, options) {
        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$&selected="selected"')
    }, 
    
    trimString: function(passedString, id, num) {
        if(passedString.length > parseInt(num)) {
            var shortString = passedString.substring(0, parseInt(num))
            // shortString += `... <br><a class="btn btn-primary" href="/posts/${id}" id="${id}">Read more &rarr;</a>`
            
            return shortString
        } 
        
        return passedString
    }
}