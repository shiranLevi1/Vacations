const followersLogic = require("../logic/followers-logic");
const express = require("express");
const router = express.Router();
const cacheModule = require("../dao/cache-module");

router.post("/", async (request, response, next) => {
    try {
        let vacationId = request.body.id;
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
      
        await followersLogic.addFollowVacation(userId, vacationId);

        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.delete("/:id", async (request, response, next) => {
    try {
        let vacationId = request.params.id;
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
      
        await followersLogic.unfollowVacation(userId, vacationId);

        response.json();
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;