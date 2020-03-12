module.exports = {
    select: function(selected, options) {
        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$&selected="selected"')
    }, 
    
    trimString: function(passedString, id) {
        if(passedString.length > 110) {
            var shortString = passedString.substring(0, 110)
            shortString += `... <a href="/admin/posts/edit/${id}">[Read more]</a>`
            
            return shortString
        } 
        
        return passedString
    }, 
    
    offsetIndex: function(index) {
        return parseInt(index + 1)
    }
}