const bcrypt = require('bcryptjs');
const { findOneAndUpdate } = require('./database/models/user');
const UserModel = require('./database/models/user');
const { AuthError } = require('./errorMiddleware')

async function register(email, password) {

    email = email.trim();
    password = password.trim();

    const oldUser = await UserModel.findOne({ email });

    // If there is an old user with that email, abort
    if (oldUser) {
        console.log("User with given email already exists!");
        throw new AuthError();
    }

    // If there is no old user
    const passwordHash = await bcrypt.hash(password, 10);

    // add the user to the collection
    await new UserModel({ email, password: passwordHash }).save();

    console.log(email + ' has registered!');
}

async function login(email, password) {

    const oldUser = await UserModel.findOne({ email });

    if (!oldUser) {
        throw new AuthError();
    }

    const passwordMatch = await bcrypt.compare(password, oldUser.password);

    if (!passwordMatch) {
        throw new AuthError();
    }

    return oldUser.email;

}

async function addScore(email, score) {
    const user = await UserModel.findOne({ email });
    user.scores.push(score);
    user.save();
}

async function getUsers() {
    const users = await UserModel.find({});
    return users;
}


module.exports = { register, login, addScore, getUsers }