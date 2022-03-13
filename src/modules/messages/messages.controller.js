const Message = require("./message.model");
const Channel = require("../channels/channel.model");

const MessagesController = {
    getAll: (req, res) => {
        const message = new Message();
        message.getAll().then(results => {
            res.send(results);
        });
    },
    getOne: (req, res) => {
        const message = new Message();
        message.getOne(req.params.id).then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        });
    },
    create: async(req, res) => {
        const { channelId, userId, text } = req.body;

        if (!channelId || !userId || !text) {
            res.status(400).json({ message: "Invalid data" });
        }

        const message = new Message();
        const channel = new Channel();

        const { _id } = await message.create({ channelId, userId, text });

        const channelData = await channel.getOne(_id);

        channelData.messages.push(_id);

        await channel.update(_id.toString(), channelData);

        return res.status(201).json({ message: "Message created" });
    }
}

module.exports = MessagesController;