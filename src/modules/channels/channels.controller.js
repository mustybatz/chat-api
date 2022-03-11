const Channel = require("./channel.model");
const User = require("../users/user.model");

const ChannelsController = {
    getAll: (req, res) => {
        const channel = new Channel();
        channel.getAll().then(results => {
            res.send(results);
        });
    },
    getOne: (req, res) => {
        const channel = new Channel();
        channel.getOne(req.params.id).then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        });
    },
    create: (req, res) => {

        const { name, owner } = req.body;

        if (!name || !owner) {
            res.status(400).json({ message: "Invalid data" });
        }

        const channel = new Channel();
        channel.create(req.body).then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        });
    },
    getLink: async(req, res) => {

        try {
            const { owner } = req.params;

            const user = new User();

            const userData = await user.getByEmail(owner);

            const channel = new Channel();

            const { _id } = await channel.getOneByOwner(userData._id);

            return res.status(200).json({ link: `http://localhost:3001/api/channels/join/${_id}/<your_email_here>` });
        } catch (error) {
            if (error.message === 'User not found' || error.message === 'Channel not found') {
                return res.status(404).json({ message: error.message });
            }

            return res.status(500).json({ message: error.message });
        }

    },
    join: async(req, res) => {

        try {
            const { id, email } = req.params;

            const channel = new Channel();

            const channelData = await channel.getOne(id);

            const user = new User();

            const userData = await user.getByEmail(email);

            if (channelData.members.includes(userData._id)) {
                return res.status(400).json({ message: "User already in channel" });
            }

            channelData.members.push(userData._id);

            await channel.update(channelData);

            return res.status(200).json({ message: "User added to channel" });
        } catch (error) {
            if (error.message === 'User not found' || error.message === 'Channel not found') {
                return res.status(404).json({ message: error.message });
            }

            return res.status(500).json({ message: error.message });
        }

    },
}

module.exports = ChannelsController;