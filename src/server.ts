import app from './app/index.js'
import 'dotenv/config'

import Connection from './app/services/orm/connection.js'



const port = process.env.PORT || '3500'

app.listen(process.env.PORT, () => {
    console.log("Server started");

    const con = Connection.instance;
})
