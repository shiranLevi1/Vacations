const usersDao = require("../dao/users-dao");
const crypto = require("crypto");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const jwt = require('jsonwebtoken');
const config = require('../config.json');
let cacheModule = require('../dao/cache-module');

const saltRight = "ddkjhjfh@e#$@e%j^9dheh";
const saltLeft = "+_$#^kbhgbjg$t5gf@rh";

async function addUser(registrationData) {
    await validateUserNameAndPassword(registrationData.userName, registrationData.password);
    await usersDao.isUserNameInUse(registrationData.userName, registrationData.password);
    registrationData.password = await hash(registrationData.password);
    await usersDao.addUser(registrationData)
}

async function login(userName, password) {
    await validateUserNameAndPassword(userName, password);
    password = await hash(password);
    await  isUserExsist(userName, password);
    let userLogin = await usersDao.login(userName, password);
    let token = jwt.sign({ sub: userName }, config.secret);
    cacheModule.set(token, {userType: userLogin.userType, userId: userLogin.userId});
    console.log(userLogin);
    return { token, userType: userLogin.userType };
}

async function checkPassword(userId, password) {
    await isPasswordField(password);
    password = await hash(password)
    let userLogin = await usersDao.checkPassword(userId, password);
    
    if(userLogin == 1){
        return true;
    }
    else{
        throw new ServerError(ErrorType.INCORRECT_PASSWORD);
    }
}

async function validateUserNameAndPassword(userName, password) {
    await isEmtyUserNameField(userName);
    await isPasswordField(password);
    
}

async function isEmtyUserNameField(userName) {
    if (!userName.trim()) {
        throw new ServerError(ErrorType.EMPTY_FIELD);
    }
    
    return true;
}

async function isPasswordField(password) {
    if (!password.trim()) {
        throw new ServerError(ErrorType.EMPTY_FIELD);
    }
    
    return true;
}

async function validateUserNameInput(userName, userId) {
    await isEmtyUserNameField(userName);
    let isUserNameExsist = await usersDao.isUserNameInUse(userName, userId);
    
    if (isUserNameExsist == 1) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
    
    return true;
}

async function updateUser(userId, updatedUser) {
    // await isUserNameInUse(updatedUser.userName, userId);
    await usersDao.updateUser(userId, updatedUser);
}

async function isUserExsist(userName, password) {
    let isUserExsist = await usersDao.isUserExsist(userName, password);
    
    if (isUserExsist == 1) {
        return true;
    }
    
    throw new ServerError(ErrorType.UNAUTHORIZED);
}

async function exstractUserDetails(userId) {
    let userDetails = await usersDao.exstractUserDetails(userId);
    return userDetails;
}

async function deleteUser(userId) {
    await usersDao.deleteUser(userId);
}

async function updatePassword(userId, newPassword) {
    newPassword = await hash(newPassword);
    await usersDao.updatePassword(userId, newPassword);
}

async function hash(password) {
    password = crypto.createHash("md5").update(saltLeft + password + saltRight).digest("hex");
    return password;
}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    login,
    exstractUserDetails,
    checkPassword,
    updatePassword,
    validateUserNameInput
}