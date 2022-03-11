const Model = require('../../core/model');
const utils = require('../../core/utils');

class User extends Model {
    constructor() {
        super('users');
    }

    createUser(data) {
        return new Promise((resolve, reject) => {
            this.collection.insertOne({
                email: data.email,
                password: data.password
            }).then(result => resolve(result)).catch(error => reject(error));
        });
    }


    async create(data) {

        if (!data.email || !data.password) {
            throw new Error('Invalid data');
        }

        const user = await this.collection.findOne({ email: data.email });

        if (user) {
            throw new Error('User already exists');
        }

        const hash = await utils.hashPassword(data.password);

        const { insertedId } = await this.collection.insertOne({
            email: data.email,
            password: hash
        });

        return this.getOne(insertedId);
    }

    async getByEmail(email) {

        const user = await this.collection.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

}

module.exports = User;