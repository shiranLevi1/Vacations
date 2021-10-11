const vacationsDao = require("../dao/vacations-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const { stackTraceLimit } = require("../errors/server-error");

async function getAllVacations(userId) {
    let allVacations = await vacationsDao.getAllVacations(userId);
    for (let index = 0; index < allVacations.length; index++) {

        if (allVacations[index].isFollowed == 1) {
            allVacations[index].isFollowed = true;
        }
        else {
            allVacations[index].isFollowed = false;
        }
    }

    return allVacations;
}

async function addVacation(vacationData) {
    await validationOfVacation(vacationData.location, vacationData.image ,vacationData.description, vacationData.dateFrom, vacationData.dateTo, vacationData.price);
    await vacationsDao.addVacation(vacationData);
}

async function getFollowedVacations(userId) {
    let followedVacations = await vacationsDao.getFollowedVacations(userId);
    return followedVacations;
}

async function updateVacation(updatedVacationData, vacationId) {
    await validationOfVacation(updatedVacationData.location, updatedVacationData.image, updatedVacationData.description, updatedVacationData.dateFrom, updatedVacationData.dateTo, updatedVacationData.price);
    await vacationsDao.updateVacation(updatedVacationData, vacationId);
}

async function validationOfVacation(location, image, description, dateFrom, dateTo, price) {
    console.log(description.length);
    await validateVacationInputs(description, location, image, dateFrom, dateTo, price);
    await validateDateInput(dateFrom, dateTo);
    await validateDescriptionInput(description);
}

async function deleteVacation(vacationId) {
    await vacationsDao.deleteVacation(vacationId);
}

function getToday(){
        let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today =  yyyy+ '-' + mm + '-' + dd;

    return today;
}

async function validateDateInput(fromDate, toDate) {
    let today = await getToday()

    if (today > fromDate) {
        throw new ServerError(ErrorType.PAST_DATE);
    }
    if (fromDate > toDate) {
        throw new ServerError(ErrorType.INVALID_DATE);
    }
    return true;
}

async function validateDescriptionInput(description) {
    if (description.length > 600) {
        throw new ServerError(ErrorType.DESCRIPTION_TO_LONG);
    }

    return true;
}

async function validateVacationInputs(location, image, description, dateFrom, dateTo, price) {
    if (!location.trim()) {
        throw new ServerError(ErrorType.EMPTY_FIELD);
    }
    if (!image.trim()) {
        throw new ServerError(ErrorType.EMPTY_FIELD);
    }
    if (!description.trim()) {
        throw new ServerError(ErrorType.EMPTY_FIELD);
    }
    if (!dateFrom.trim()) {
        throw new ServerError(ErrorType.EMPTY_FIELD);
    }
    if (!dateTo.trim()) {
        throw new ServerError(ErrorType.EMPTY_FIELD);
    }
    if (!price) {
        throw new ServerError(ErrorType.EMPTY_FIELD);
    }

    return true;
}

module.exports = {
    addVacation,
    getAllVacations,
    updateVacation,
    deleteVacation,
    getFollowedVacations
}