import app from './app/index.js'
import 'dotenv/config'

import AppDataSource from './app/data-source.js'

const port = process.env.SERVER_PORT || '3500'

AppDataSource.initialize()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => console.log(error))

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
