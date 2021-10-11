let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function addFollowVacation(userId, vacationId) {
    let sql = `INSERT INTO followers SET user_id = ?, vacation_id = ?`;
    
    let parameters = [
      userId,
      vacationId
    ];
  
    try {
      await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
      throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId) + JSON.stringify(vacationId), e);
    }
  }
  
  async function unfollowVacation(userId, vacationId) {
    let sql = `DELETE FROM followers WHERE user_id = ? and vacation_id = ?`;
    
    let parameters = [
      userId,
      vacationId
    ];
  
    try {
      await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
      throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId) + JSON.stringify(vacationId), e);
    }
  }

  module.exports = {
    addFollowVacation,
    unfollowVacation
  }