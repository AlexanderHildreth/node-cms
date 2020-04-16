const app       = require('./app');
const dotenv    = require('dotenv');
const appPort   = process.env.PORT || 9999
require('./config/database');

dotenv.config({ path: './secrets.env' });

app.listen(appPort, () => {
    console.log(`Server is listening on port ${appPort}...`)
})
