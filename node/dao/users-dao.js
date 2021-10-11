let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function addUser(registrationData) {
  let sql = `INSERT INTO users SET user_name = ?, password = ?, address = ?, first_name = ?, last_name= ?`;

  let parameters = [
    registrationData.userName,
    registrationData.password,
    registrationData.address,
    registrationData.firstName,
    registrationData.lastName
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(registrationData), e);
  }
}

async function checkPassword(userId, password) {
  console.log(password);
  let sql = `SELECT * FROM users WHERE user_id = ? AND password = ?`;

  let parameters = [
    userId,
    password
  ];

  try {
    let userLogin = await connection.executeWithParameters(sql, parameters);
    console.log(userLogin);
    return userLogin.length;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userName) + JSON.stringify(password), e);
  }
}

async function login(userName, userPassword) {
  let sql = `SELECT user_id as userId, user_type as userType FROM users WHERE user_name = ? AND password = ?`;

  let parameters = [
    userName,
    userPassword
  ];

  try {
    let userLogin = await connection.executeWithParameters(sql, parameters);

    return userLogin[0];
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userName) + JSON.stringify(userPassword), e);
  }
}

async function exstractUserDetails(userId) {
  let sql = `select user_name as userName, password, address, first_name as firstName, last_name as lastName FROM users
      WHERE user_id = ?`;

  let parameters = [
    userId
  ];

  try {
    let userDetails = await connection.executeWithParameters(sql, parameters);

    return userDetails[0];
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
  }
}

async function updateUser(userId, updatedUser) {
  let sql = `UPDATE users SET user_name = ?, address = ?, first_name = ?, last_name = ?
      WHERE user_id = ?`;

  let parameters = [
    updatedUser.userName,
    updatedUser.address,
    updatedUser.firstName,
    updatedUser.lastName,
    userId
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(updatedUser) + JSON.stringify(userId), e);
  }
}

async function updatePassword(userId, newPassword) {
  let sql = `UPDATE users SET password = ? WHERE user_id = ? `;

  let parameters = [
    newPassword,
    userId
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(updatedUser) + JSON.stringify(userId), e);
  }
}

async function deleteUser(userId) {
  let sql = `DELETE FROM users WHERE user_id = ?`;

  let parameters = [
    userId
  ];
  
  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
  }
}

async function isUserNameInUse(userName, userId) {
  let sql = `select user_id FROM users WHERE user_name = ? AND NOT user_id = ?`;

  let parameters = [
    userName,
    userId
  ]

  try {
    let isUserNameExsist = await connection.executeWithParameters(sql, parameters);

    return isUserNameExsist.length;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userName) + JSON.stringify(password), e);
  }
}

async function isUserExsist(userName, password) {
  let sql = `select user_id FROM users WHERE user_name = ? AND password = ?`;

  let parameters = [
    userName,
    password
  ]

  try {
    let isUserExsist = await connection.executeWithParameters(sql, parameters);

    return isUserExsist.length;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userName), e);
  }
}


module.exports = {
  addUser,
  updateUser,
  deleteUser,
  isUserNameInUse,
  login,
  exstractUserDetails,
  checkPassword,
  isUserExsist,
  updatePassword
};