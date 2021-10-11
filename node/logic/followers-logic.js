const followersDao = require("../dao/followers-dao");

async function addFollowVacation(userId, vacationId) {
    await followersDao.addFollowVacation(userId, vacationId);
}

async function unfollowVacation(userId, vacationId) {
    await followersDao.unfollowVacation(userId, vacationId);
}

module.exports = {
    addFollowVacation,
    unfollowVacation
}