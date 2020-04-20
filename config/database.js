// Modules
const mongoose      = require('mongoose')
// const vars
var mongoDbUrl
const mongoDbPort   = process.env.MONGOD_DB_PORT || 27017;

if(process.env.NODE_ENV === 'production'){
    mongoDbUrl = require('./prodDatabase');
} else if (process.env.NODE_ENV === 'development'){
    mongoDbUrl = require('./devDatabase');
} else {
    mongoDbUrl = require('./localDatabase');
}

// DB connection
mongoose.Promise = global.Promise

mongoose.connect(mongoDbUrl.url, { 
    'useNewUrlParser': true,
    'useFindAndModify': false,
    'useCreateIndex': true,
    'useUnifiedTopology': true
})

mongoose.connection.on('connected', () => {
    console.log(`DB Connected at: ${mongoDbUrl.url}`);
})

mongoose.connection.on('error', err => {
    console.log(`DB Connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('DB diconnected');
});
