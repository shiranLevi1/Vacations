const vacationsLogic = require("../logic/vacations-logic")
const express = require("express");
const router = express.Router();
const cacheModule = require("../dao/cache-module");


router.get("/", async (request, response, next) => {
    try {
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        const vacations = await vacationsLogic.getAllVacations(userId);
        response.json(vacations);
    }
    catch (e) {
        return next(e);
    }
});

router.get("/followedVacations", async (request, response, next) => {
    try {
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        const followedVacations = await vacationsLogic.getFollowedVacations(userId);
        response.json(followedVacations);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/", async (request, response, next) => {
    try {
        let vacationsData = request.body;
        await vacationsLogic.addVacation(vacationsData);

        response.json();
    }
    catch (e) {
        return next(e);
    }
})

router.put("/:id", async (request, response, next) => {
    try {
        let id = request.params.id;
        let updatedVacationData = request.body;
        await vacationsLogic.updateVacation(updatedVacationData, id);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.delete("/:id", async (request, response, next) => {
    try {
        let vacationId = request.params.id;
        await vacationsLogic.deleteVacation(vacationId);

        response.json();
    }
    catch (e) {
        return next(e);
    }
})

module.exports = router;
