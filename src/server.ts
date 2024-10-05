import app from './app/index.js'
import 'dotenv/config'

import Connection from './app/services/orm/connection.js'



const port = process.env.SERVER_PORT || '3500'

app.listen(port, () => {
    console.log(`Server started on port ${port}`);

    const con = Connection.instance;
})
