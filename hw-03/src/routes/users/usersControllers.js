const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, "../..", "db/", "users/", "all-users.json");
const allUsers = require('../../db/users/all-users.json');

const postUser = (req, res, next) => {
    const arr = [];
    const {
        username,
        telephone,
        password,
        email
    } = req.body;
    const body = {
        id: Date.now(),
        username,
        telephone,
        password,
        email
    }

    if (!username || !telephone || typeof (parseInt(telephone)) !== "number" ||
        !password || !email || !email.includes('@')) {
        res.status(400, {
            "Content-Type": "text/plain"
        });
        res.send("Bad Request");
    } else {

        fs.readFile(filePath, (err, data) => {
            if (err) {
                throw err;
            }
            if (data.length > 0) {
                JSON.parse(data).forEach(elem => arr.push(elem));
                arr.push(body);

                fs.writeFile(filePath, JSON.stringify(arr), err => {
                    if (err) {
                        throw err;
                    }
                });

            } else {
                const usersArr = [];
                usersArr.push(body);
                fs.writeFile(filePath, JSON.stringify(usersArr), err => {
                    if (err) {
                        throw err;
                    }
                });
            }
        });

        const userBody = {
            status: "success",
            user: body
        };

        res.status(200).json(userBody);
    }
};

const getUserById = (req, res, next) => {
    const usersId = allUsers.find(elem => JSON.stringify(elem.id) === req.params.id);
    if (usersId) {
        const userBody = {
            status: "success",
            user: usersId
        };
        res.status(200).json(userBody);
    } else {
        const userBody = {
            status: "not found"
        };
        res.status(201).json(userBody);
    }
};

const getAllUsers = (req, res, next) => {
    const userBody = {
        status: "success",
        user: allUsers
    };

    res.status(200).json(userBody);
}

module.exports = {
    postUser,
    getUserById,
    getAllUsers
};