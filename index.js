const server    = require('./app');
const appPort   = process.env.PORT || 9999
require('./config/database');

const app = server.listen(appPort, () => {
    console.log(`Server is listening on port ${appPort}...`)
})

module.exports = app;