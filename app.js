const fs = require('fs');
const express = require('express');

const app = express();

const users = fs.readFileSync();

app.get('/api/v1/users', (req, res) => {
    res.status(200).json({
        status: 'sucess',
        results: users.length,
        data: {
            users
        }
    });
});

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});