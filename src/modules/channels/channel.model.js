const Model = require('../../core/model');

const SCHEMA = {
    name: 'channel',
    members: [],
    messages: [],
    owner: '',
    _id: ''
}

class Channel extends Model {
    constructor() {
        super('channels');
    }

    async create(data) {
        if (!data.name || !data.owner) {
            throw new Error('Invalid data');
        }

        const channel = await this.collection.findOne({ name: data.name });

        if (channel) {
            throw new Error('Channel already exists');
        }

        const { insertedId } = await this.collection.insertOne({
            name: data.name,
            owner: data.owner,
            members: [data.owner],
            messages: []
        });

        return this.getOne(insertedId);
    }

    async getOneByOwner(owner) {
        const channel = await this.collection.findOne({ owner });

        if (!channel) {
            throw new Error('Channel not found');
        }

        return channel;
    }

    async update(id, data) {
        const channel = await this.collection.findOne({ _id: id });

        if (!channel) {
            throw new Error('Channel not found');
        }

        if (data.name) {
            channel.name = data.name;
        }

        if (data.owner) {
            channel.owner = data.owner;
        }

        if (data.members) {
            channel.members = data.members;
        }

        if (data.messages) {
            channel.messages = data.messages;
        }

        await this.collection.updateOne({ _id: id }, channel);

        return this.getOne(id);
    }

}

module.exports = Channel;