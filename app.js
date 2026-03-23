const fs = require('fs');
const express = require('express');
const { get } = require('http');

const app = express();

app.use(express.json());

const users = fs.readFileSync();

const getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'sucess',
        results: users.length,
        data: {
            users
        }
    });
}

const getUser = (req, res) => {
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
};

const createUser = (req, res) => {
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
};

const updateUser = (req, res) => {
    if (req.params.id * 1 > users.length) {
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
};

const deleteUser = (req, res) => {
    if (req.params.id * 1 > users.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
};

app
.route('/api/v1/users')
.get(getAllUsers)
.post(createUser);

app
.route('/api/v1/users/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});