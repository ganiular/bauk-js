const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./handler.js');
const path = require('path')

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'build')))


app.use('/auth', require('./routes/auth_routes.js'))
app.use('/users', require('./routes/user_routes.js'))

app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'build', 'index.html')
    console.log('Get:', req.url);
    res.sendFile(indexPath);
})

app.use(errorHandler)

app.listen(8000, () => {
    console.log("Server running on port 8000");
})
