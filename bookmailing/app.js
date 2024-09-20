import express from 'express'

// App Settings
let app = express()
let port = 3000

app.post('/subscribe', (req, res) => {
        // Check if the email exists first of all
        
        // If it doesn't..
            // Then validate the email
                // And add it to the database
                // Otherwise show errors
        // Or a real error if something really goes wrong
})

app.post('/unsubscribe', (req, res) => {
    // Unsubscribe email
        // When we unsubscribe, check for an email
            // If it exists, remove it
            // Otherwise the user wasn't even subscribed to begin with
})

app.listen(port)