if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prodDatabase');
} else if (process.env.NODE_ENV === 'development'){
    module.exports = require('./devDatabase');
} else {
    module.exports = require('./localDatabase');
}