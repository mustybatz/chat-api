const Model = require('../../core/model');

class Message extends Model {
    constructor() {
        super('messages');
    }
}

module.exports = Message;