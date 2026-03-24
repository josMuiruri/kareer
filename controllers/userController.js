const fs = require('fs')
const users = fs.readFileSync();

exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'sucess',
        results: users.length,
        data: {
            users
        }
    });
}

exports.getUser = (req, res) => {
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

exports.createUser = (req, res) => {
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

exports.updateUser = (req, res) => {
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

exports.deleteUser = (req, res) => {
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