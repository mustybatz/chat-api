const User = require("./user.model");
const utils = require("../../core/utils");

const UsersController = {
    getAll: (req, res) => {
        const user = new User();
        user.getAll().then(results => {
            res.send(results);
        });
    },
    getOne: (req, res) => {
        const user = new User();
        user.getOne(req.params.id).then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        });
    },
    create: async(req, res) => {
        try {
            const { email, password } = req.body;


            if (!email || !password) {
                res.status(400).json({ message: "Invalid data" });
            }

            const user = new User();

            const newUser = await user.create({ email, password });

            delete newUser.password;

            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createUser: (req, res) => {
        const user = new User();
        user.createUser(req.body).then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        });
    },
    login: async(req, res) => {
        const user = new User();

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: "Invalid data" });
            }

            const foundUser = await user.getByEmail(email);

            if (!(await utils.comparePassword(password, foundUser.password))) {
                res.status(401).json({ message: "Invalid password" });
            }

            const token = await utils.generateToken(foundUser);

            return res.status(200).json({ token });

        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).json({ message: error.message });
            }

            return res.status(500).json({ message: error.message });
        }

    }
}

module.exports = UsersController;