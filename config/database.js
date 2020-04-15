// Modules
const mongoose      = require('mongoose')
// const vars
const mongoDbUrl
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
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

mongoose.connection.on('connected', () => {
    console.log('DB Connected');
})

mongoose.connection.on('error', err => {
    console.log(`DB Connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('DB diconnected');
});
