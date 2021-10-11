const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
const cacheModule = require("../dao/cache-module");

router.post('/login', async (request, response, next) => {

    try {
        let userName = request.body.userName;
        let userPassword = request.body.password;
        console.log(userPassword);
        let loginData = await usersLogic.login(userName, userPassword);
        response.json(loginData);
    }
    catch (e) {
        return next(e);
    }
});

router.post('/checkPassword', async (request, response, next) => {

    try {
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        let password = request.body.password;

        await usersLogic.checkPassword(userId, password);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.post("/", async (request, response, next) => {
    try {
        let userData = request.body;
        await usersLogic.addUser(userData);
        
        response.json();
    }
    catch (e) {
        return next(e);
    }
});


router.put("/", async (request, response, next) => {
    try {
        let updatedUser = request.body;
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        await usersLogic.updateUser(userId, updatedUser);

        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.put("/changePassword", async (request, response, next) => {
    try {
        // let oldPassword = request.body.oldPassword;
        let newPassword = request.body.newPassword;
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        await usersLogic.updatePassword(userId, newPassword);

        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.post("/validateUserNameInput", async (request, response, next) => {
    try {
        let userName = request.body.userName;
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        await usersLogic.validateUserNameInput(userName, userId);

        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.get("/", async (request, response, next) => {
    try {
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        let userDetails = await usersLogic.exstractUserDetails(userId);
        response.json(userDetails);
    }
    catch (e) {
        return next(e);
    }
});

router.delete("/", async (request, response, next) => {
    try {
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        await usersLogic.deleteUser(userId);

        response.json();
    }
    catch (e) {
        return next(e);
    }
})

module.exports = router;