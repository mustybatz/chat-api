const Model = require('../../core/model');

class Message extends Model {
    constructor() {
        super('messages');
    }

    async create(data) {

        if (!data.channelId || !data.userId || !data.text) {
            throw new Error('Invalid data');
        }

        const message = await this.collection.findOne({
            channelId: data.channelId,
            userId: data.userId,
            text: data.text
        });

        if (message) {
            throw new Error('Message already exists');
        }

        const { insertedId } = await this.collection.insertOne({
            channelId: data.channelId,
            userId: data.userId,
            text: data.text
        });

        return this.getOne(insertedId);
    }

}

module.exports = Message;