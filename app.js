const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

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

app.get('/api/v1/users/:id', (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const user = users.find(el => el.id === id);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})

app.post('/api/v1/users', (req, res) => {
    const newId = users[users.length - 1].id + 1;
    const newUser = Object.assign({ id: newId }, req.body);

    users.push(newUser);

    fs.writeFile(
        `${__dirname}/dev-data/data/users-simple.json`,
        JSON.stringify(users),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    user: newUser
                }
            });
        }
    );
});

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});