const express = require('express');
const { errorHandler } = require('./handler.js');

const app = express();

app.use(express.json());
app.use('/auth', require('./routes/auth_routes.js'))
app.use('/users', require('./routes/user_routes.js'))

app.use(errorHandler)

app.listen(8000, () => {
    console.log("Server running on port 8000");
})
