const connection = require("./connection-wrapper");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getAllVacations(userId) {

  let sql = `SELECT 
  v.vacation_id AS id,
  v.location,
  v.description,
  v.image,
  DATE_FORMAT(v.start_date, "%Y-%m-%d") AS dateFrom,
  DATE_FORMAT(v.end_date, "%Y-%m-%d") AS dateTo,
  v.price,
  CASE
      WHEN followed.vacation_id IS NOT NULL THEN 1
      ELSE 0
  END AS 'isFollowed',
  CASE
      WHEN fv.followers IS NOT NULL THEN fv.followers
      ELSE 0
  END AS 'amountOfFollowers'
FROM
  vacation v
      LEFT JOIN
  (SELECT 
      vacation_id
  FROM
      followers
  WHERE
      user_id = ?) followed ON v.vacation_id = followed.vacation_id
      LEFT JOIN
  (SELECT 
      vacation_id, COUNT(vacation_id) AS 'followers'
  FROM
      followers
  GROUP BY vacation_id) fv ON v.vacation_id = fv.vacation_id
ORDER BY isFollowed DESC`;

  let parameters = [
    userId
  ]

  try {
    let allVacations = await connection.executeWithParameters(sql, parameters);
    return allVacations;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
  }

}

async function addVacation(vacationsData) {
  let sql = `INSERT INTO vacation (description, location, image, start_date, end_date, price)
    VALUES (?,?,?,?,?,?)`;

  let parameters = [
    vacationsData.description,
    vacationsData.location,
    vacationsData.image,
    vacationsData.dateFrom,
    vacationsData.dateTo,
    vacationsData.price
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(vacationsData), e);
  }
}

async function updateVacation(updatedVacationData, vacationId) {
  let sql = `UPDATE vacation SET description = ?, location = ?, image = ?, start_date = ?, end_date = ?, price = ? WHERE vacation_id = ?`;

  let parameters = [
    updatedVacationData.description,
    updatedVacationData.location,
    updatedVacationData.image,
    updatedVacationData.dateFrom,
    updatedVacationData.dateTo,
    updatedVacationData.price,
    vacationId
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(updatedVacationData) + JSON.stringify(vacationId), e);
  }
}

async function deleteVacation(vacationId) {
  let sql = `DELETE FROM vacation WHERE vacation_id = ?`;

  let parameters = [
    vacationId
  ]

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(vacationId), e);
  }
}

async function getFollowedVacations(userId) {
  let sql = `SELECT
  v.location,
  CASE
      WHEN fv.followers IS NOT NULL THEN fv.followers
     
  END AS 'amountOfFollowers'
FROM
  vacation v
       JOIN
  (SELECT 
      vacation_id, COUNT(vacation_id) AS 'followers'
  FROM
      followers
  GROUP BY vacation_id) fv ON v.vacation_id = fv.vacation_id`;

  let parameters = [
    userId
  ]

  try {
    let followedVacations = await connection.executeWithParameters(sql, parameters);
    return followedVacations;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
  }
}

module.exports = {
  addVacation,
  getFollowedVacations,
  getAllVacations,
  updateVacation,
  deleteVacation
}