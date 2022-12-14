const express = require('express')
const bodyParser = require('body-parser')

const UserRoutes = require('./routes/UserRoutes')

const app = express()
const PORT = 3000

//Middlewares
app.use(bodyParser.json());

// Routes
app.use('/user', UserRoutes)
app.get('/', (req, res) => res.json({ response: 'SUCCESS' }))

function start() {
    try {
        app.listen(PORT, () => { console.log(`Service running on port: ${PORT}`) });
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

// Start server
start()