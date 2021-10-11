let ErrorType = {
    
    GENERAL_ERROR : {
        id: 1, 
        httpCode: 600, 
        message : "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'", 
        isShowStackTrace: true
    },
    USER_NAME_ALREADY_EXIST : {
        id: 2, 
        httpCode: 601, 
        message : "User name already exist", 
        isShowStackTrace: false
    },
    UNAUTHORIZED : {
        id: 3, 
        httpCode: 401, 
        message : "Login failed, invalid user name or password", 
        isShowStackTrace: false
    },
    EMPTY_FIELD : {
        id: 4, 
        httpCode: 602, 
        message : "You can not provide an empty field", 
        isShowStackTrace: false
    },
    INVALID_DATE : {
        id: 5, 
        httpCode: 603, 
        message : "Invalid Date", 
        isShowStackTrace: false
    },
    PAST_DATE : {
        id: 6, 
        httpCode: 604, 
        message : " You can not provide date in the past", 
        isShowStackTrace: false
    },
    DESCRIPTION_TO_LONG : {
        id: 7, 
        httpCode: 605, 
        message : "Description is too long", 
        isShowStackTrace: false
    },
    INCORRECT_PASSWORD : {
        id: 8, 
        httpCode: 606, 
        message : "Incorrect password", 
        isShowStackTrace: false
    }
}

module.exports = ErrorType;